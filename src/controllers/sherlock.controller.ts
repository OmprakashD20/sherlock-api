import { Request, Response } from "express";

//data
import { sherlockData } from "@/data";

//utils
import { calculateTimeTaken, compareAnswer } from "@/utils";
import {
  AnswerSchemaBodyType,
  AnswerSchemaParamsType,
  QnSchemaType,
} from "@/validators/team.validator";
import {
  endSherlockTimer,
  getLastClueUsedBySherlock,
  getSherlockCurrentQuestion,
  getSherlockTiming,
  setLastClueUsedBySherlock,
  setSherlockCurrentQuestion,
  setSherlockStatus,
  startSherlockTimer,
  updateRound1ScoreBySherlock,
  updateSherlockScore,
} from "@/services";

export const getSherlockRound1Question = async (
  req: Request<QnSchemaType, {}, {}>,
  res: Response
) => {
  try {
    const { qn } = req.params;

    //check if the game is over
    if (parseInt(qn) > sherlockData.length)
      return res.status(409).json({
        message: "No more questions, Game Over!!",
      });

    //check if he/she is requesting the question in correct sequence
    const currentQn = (await getSherlockCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        message:
          currentQn > parseInt(qn)
            ? "You have already attempted this question!!"
            : "You can only attempt questions in sequence!!",
      });

    //check if the question number is valid
    if (sherlockData[parseInt(qn) - 1]) {
      //start the timer if it is the first question
      if (parseInt(qn) === 1) await startSherlockTimer(res.locals.teamId);

      const question = sherlockData[parseInt(qn) - 1].question;

      return res.status(200).json({
        question,
        //todo: send the question type -> text, images, audio
        //todo: send the answer type -> text, images
      });
    }

    return res.status(404).json({
      message: "Question not found!!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const getSherlockRound1Clue = async (
  req: Request<QnSchemaType, {}, {}>,
  res: Response
) => {
  try {
    const { qn } = req.params;

    //check if the game is over
    if (parseInt(qn) > sherlockData.length)
      return res.status(409).json({
        message: "No more questions, Game Over!!",
      });

    //check if the question number is valid
    if (!sherlockData[parseInt(qn) - 1])
      return res.status(404).json({ message: "Question not found!!" });

    //check if he/she is requesting the clue for the current question
    const currentQn = (await getSherlockCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        message: "You can only request clue for the current question!!",
      });

    //get the last clue used by sherlock
    const lastClueUsedBySherlock = await getLastClueUsedBySherlock(
      res.locals.teamId
    );

    //check if the clue has already been used
    if (parseInt(qn) === lastClueUsedBySherlock)
      return res.status(410).json({
        message: "Clue has already been used for this question!!",
      });

    //get the clue
    const data = sherlockData[parseInt(qn) - 1];

    //set the last clue used by sherlock as the current question
    await setLastClueUsedBySherlock(res.locals.teamId, parseInt(qn));

    //deduct 5 points from his/her score
    await updateSherlockScore(res.locals.teamId, -5);

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

export const submitSherlockRound1Answer = async (
  req: Request<AnswerSchemaParamsType, {}, AnswerSchemaBodyType>,
  res: Response
) => {
  try {
    const { qn } = req.params;
    const { answer } = req.body;

    //check if the game is over
    if (parseInt(qn) > sherlockData.length)
      return res.status(409).json({
        message: "No more questions, Game Over!!",
      });

    //check if he/she is posting the answer for his/her current question
    const currentQn = (await getSherlockCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        message:
          currentQn > parseInt(qn)
            ? "You have already answered this question!!"
            : "You can only answer the questions in sequence!!",
      });

    //check if the question exists
    if (!sherlockData[parseInt(qn) - 1])
      return res.status(404).json({
        message: "Question not found!!",
      });

    //check if the answer is correct
    if (compareAnswer(answer, sherlockData[parseInt(qn) - 1].answer)) {
      //update his/her score by 10 points
      await updateSherlockScore(res.locals.teamId, 10);

      //set the current answered question
      await setSherlockCurrentQuestion(res.locals.teamId, parseInt(qn));

      //check if it is the penultimate question
      const isPenultimateQn = parseInt(qn) === sherlockData.length - 1;

      if (isPenultimateQn) await setSherlockStatus(res.locals.teamId);

      //check if this is the last question
      const isGameOver = parseInt(qn) === sherlockData.length;

      if (isGameOver) {
        //end the timer
        await endSherlockTimer(res.locals.teamId);

        //get his/her start and end time
        const { sherlockStartTime, sherlockEndTime } = await getSherlockTiming(
          res.locals.teamId
        );

        const startTime = new Date(sherlockStartTime).getTime();
        const endTime = new Date(sherlockEndTime).getTime();

        //time taken by sherlock to complete the game
        const { hours, minutes, seconds } = calculateTimeTaken(
          startTime,
          endTime
        );

        //update the round1 score
        await updateRound1ScoreBySherlock(res.locals.teamId);

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
        gameover: isGameOver,
        isPenultimateQn,
      });
    } else {
      return res.status(200).json({
        message: "Wrong Answer!!",
        remark: "Better luck next time!!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};
