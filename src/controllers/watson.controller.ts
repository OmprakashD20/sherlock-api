import { Request, Response } from "express";

//data
import { watsonData } from "@/data";

//utils
import { calculateTimeTaken, compareAnswer } from "@/utils";
import {
  AnswerSchemaBodyType,
  AnswerSchemaParamsType,
  QnSchemaType,
} from "@/validators/team.validator";
import {
  endWatsonTimer,
  getLastClueUsedByWatson,
  getWatsonCurrentQuestion,
  getWatsonRemainingAttempts,
  getWatsonTiming,
  setLastClueUsedByWatson,
  setWatsonCurrentQuestion,
  setWatsonRemainingAttempts,
  setWatsonStatus,
  startWatsonTimer,
  updateRound1ScoreByWatson,
  updateWatsonScore,
} from "@/services";

//watson round 1 controllers
export const getWatsonRound1Question = async (
  req: Request<QnSchemaType, {}, {}>,
  res: Response
) => {
  try {
    const { qn } = req.params;

    //check if the game is over
    if (parseInt(qn) > watsonData.length)
      return res.status(409).json({
        error: "No more questions, Game Over!!",
      });

    //check if he/she is requesting the question in correct sequence
    const currentQn = (await getWatsonCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        error:
          currentQn > parseInt(qn)
            ? "You have already attempted this question!!"
            : "You can only attempt questions in sequence!!",
      });

    //check if the question number is valid
    if (watsonData[parseInt(qn) - 1]) {
      //start the timer if it is the first question
      if (parseInt(qn) === 1) await startWatsonTimer(res.locals.teamId);

      const question = watsonData[parseInt(qn) - 1].question;

      const attemptsRemaining = await getWatsonRemainingAttempts(
        res.locals.teamId,
        parseInt(qn)
      );

      return res.status(200).json({
        question,
        attemptsRemaining,
        //todo: send the question type -> text, images, audio
        //todo: send the answer type -> text, images
      });
    }

    return res.status(404).json({
      error: "Question not found!!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const getWatsonRound1Clue = async (
  req: Request<QnSchemaType, {}, {}>,
  res: Response
) => {
  try {
    const { qn } = req.params;

    //check if he/she has exceeded the attempts
    const attemptsRemaining = await getWatsonRemainingAttempts(
      res.locals.teamId,
      parseInt(qn)
    );

    if (attemptsRemaining === 0)
      return res.status(403).json({
        error:
          "You have exceeded the maximum number of attempts for this question!!",
      });

    //check if the game is over
    if (parseInt(qn) > watsonData.length)
      return res.status(409).json({
        error: "No more questions, Game Over!!",
      });

    //check if the question number is valid
    if (!watsonData[parseInt(qn) - 1])
      return res.status(404).json({ error: "Question not found!!" });

    //check if he/she is requesting the clue for the current question
    const currentQn = (await getWatsonCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        error: "You can only request clue for the current question!!",
      });

    //get the last clue used by watson
    const lastClueUsedByWatson = await getLastClueUsedByWatson(
      res.locals.teamId
    );

    //check if the clue has already been used
    if (parseInt(qn) === lastClueUsedByWatson)
      return res.status(410).json({
        error: "Clue has already been used for this question!!",
      });

    //get the clue
    const data = watsonData[parseInt(qn) - 1];

    //set the last clue used by watson as the current question
    await setLastClueUsedByWatson(res.locals.teamId, parseInt(qn));

    //deduct 5 points from his/her score
    await updateWatsonScore(res.locals.teamId, -5);

    return res.status(200).json({
      question: data.question,
      clue: data.clue,
      message: "Your clue has been revealed!!",
      remark: "Your score has been deducted by 5 points!!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const submitWatsonRound1Answer = async (
  req: Request<AnswerSchemaParamsType, {}, AnswerSchemaBodyType>,
  res: Response
) => {
  try {
    const { qn } = req.params;
    const { answer } = req.body;

    //check if he/she has exceeded the attempts
    const attemptsRemaining = await getWatsonRemainingAttempts(
      res.locals.teamId,
      parseInt(qn)
    );

    if (attemptsRemaining === 0)
      return res.status(403).json({
        error:
          "You have exceeded the maximum number of attempts for this question!!",
      });

    //check if the game is over
    if (parseInt(qn) > watsonData.length)
      return res.status(409).json({
        error: "No more questions, Game Over!!",
      });

    //check if he/she is posting the answer for his/her current question
    const currentQn = (await getWatsonCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        error:
          currentQn > parseInt(qn)
            ? "You have already answered this question!!"
            : "You can only answer the questions in sequence!!",
      });

    //check if the question exists
    if (!watsonData[parseInt(qn) - 1])
      return res.status(404).json({
        error: "Question not found!!",
      });

    //check if the answer is correct
    if (compareAnswer(answer, watsonData[parseInt(qn) - 1].answer)) {
      //update his/her score by 10 points
      await updateWatsonScore(res.locals.teamId, 10);

      //set the current answered question
      await setWatsonCurrentQuestion(res.locals.teamId, parseInt(qn));

      //check if it is the penultimate question
      const isPenultimateQn = parseInt(qn) === watsonData.length - 1;

      if (isPenultimateQn) await setWatsonStatus(res.locals.teamId);

      //check if this is the last question
      const isGameOver = parseInt(qn) === watsonData.length;

      if (isGameOver) {
        //end the timer
        await endWatsonTimer(res.locals.teamId);

        //get his/her start and end time
        const { watsonStartTime, watsonEndTime } = await getWatsonTiming(
          res.locals.teamId
        );

        const startTime = new Date(watsonStartTime).getTime();
        const endTime = new Date(watsonEndTime).getTime();

        //time taken by watson to complete the game
        const { hours, minutes, seconds } = calculateTimeTaken(
          startTime,
          endTime
        );

        //update the round1 score
        await updateRound1ScoreByWatson(res.locals.teamId);

        return res.status(200).json({
          message: "Correct Answer!!",
          remark: "Your score has been incremented by 10 points!!",
          gameover: isGameOver,
          time: {
            time: `You have taken ${hours} hours, ${minutes} minutes, ${seconds} seconds to complete round 1 of the game`,
            hours,
            minutes,
            seconds,
          },
        });
      }
      return res.status(200).json({
        message: "Correct Answer!!",
        remark: "Your score has been incremented by 10 points!!",
        gameOver: isGameOver,
        isPenultimateQn,
      });
    } else {
      const attemptsRemaining = await getWatsonRemainingAttempts(
        res.locals.teamId,
        parseInt(qn)
      );
      await setWatsonRemainingAttempts(
        res.locals.teamId,
        parseInt(qn),
        attemptsRemaining - 1
      );

      //skip the current question if he/she has reached the maximum attempts
      if (attemptsRemaining - 1 === 0) {
        await setWatsonCurrentQuestion(res.locals.teamId, parseInt(qn));
      }
      return res.status(400).json({
        error: "Wrong Answer!!",
        remark: "Better luck next time!!",
        attemptsRemaining: attemptsRemaining - 1,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};
