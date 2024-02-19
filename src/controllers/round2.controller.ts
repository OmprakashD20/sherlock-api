import { Request, Response } from "express";

//data
import { round2Data } from "@/data";

//utils
import { calculateTimeTaken, compareAnswer } from "@/utils";
import {
  AnswerSchemaBodyType,
  AnswerSchemaParamsType,
  QnSchemaType,
} from "@/validators/team.validator";
import {
  endRound2Timer,
  getLastClueUsedInRound2,
  getRound2CurrentQuestion,
  getRound2Timing,
  setLastClueUsedInRound2,
  setRound2CurrentQuestion,
  startRound2Timer,
  updateRound2Score,
  updateTeamScore,
} from "@/services";

//todo: restrict the number of attempts for each question in round 2

//round 2 controllers
export const getRound2Question = async (
  req: Request<QnSchemaType, {}, {}>,
  res: Response
) => {
  try {
    const { qn } = req.params;

    //check if the game is over
    if (parseInt(qn) > round2Data.length)
      return res.status(409).json({
        message: "No more questions, Game Over!!",
      });

    //check if he/she is requesting the question in correct sequence
    const currentQn = (await getRound2CurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        message:
          currentQn > parseInt(qn)
            ? "You have already attempted this question!!"
            : "You can only attempt questions in sequence!!",
      });

    //check if the question number is valid
    if (round2Data[parseInt(qn) - 1]) {
      //start the timer if it is the first question
      if (parseInt(qn) === 1) await startRound2Timer(res.locals.teamId);

      const question = round2Data[parseInt(qn) - 1].question;

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

export const getRound2Clue = async (
  req: Request<QnSchemaType, {}, {}>,
  res: Response
) => {
  try {
    const { qn } = req.params;

    //check if the game is over
    if (parseInt(qn) > round2Data.length)
      return res.status(409).json({
        message: "No more questions, Game Over!!",
      });

    //check if the question number is valid
    if (!round2Data[parseInt(qn) - 1])
      return res.status(404).json({ message: "Question not found!!" });

    //check if he/she is requesting the clue for the current question
    const currentQn = (await getRound2CurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        message: "You can only request clue for the current question!!",
      });

    //get the last clue used in round 2
    const lastClueUsedInRound2 = await getLastClueUsedInRound2(
      res.locals.teamId
    );

    //check if the clue has already been used
    if (parseInt(qn) === lastClueUsedInRound2)
      return res.status(410).json({
        message: "Clue has already been used for this question!!",
      });

    //get the clue
    const data = round2Data[parseInt(qn) - 1];

    //set the last clue used in round 2 as the current question
    await setLastClueUsedInRound2(res.locals.teamId, parseInt(qn));

    //deduct 5 points from the round 2 score
    await updateRound2Score(res.locals.teamId, -5);

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

export const submitRound2Answer = async (
  req: Request<AnswerSchemaParamsType, {}, AnswerSchemaBodyType>,
  res: Response
) => {
  try {
    const { qn } = req.params;
    const { answer } = req.body;

    //check if the game is over
    if (parseInt(qn) > round2Data.length)
      return res.status(409).json({
        message: "No more questions, Game Over!!",
      });

    //check if he/she is posting the answer for his/her current question
    const currentQn = (await getRound2CurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        message:
          currentQn > parseInt(qn)
            ? "You have already answered this question!!"
            : "You can only answer the questions in sequence!!",
      });

    //check if the question exists
    if (!round2Data[parseInt(qn) - 1])
      return res.status(404).json({
        message: "Question not found!!",
      });

    //check if the answer is correct
    if (compareAnswer(answer, round2Data[parseInt(qn) - 1].answer)) {
      //update his/her score by 10 points
      await updateRound2Score(res.locals.teamId, 10);

      //set the current answered question
      await setRound2CurrentQuestion(res.locals.teamId, parseInt(qn));

      //check if this is the last question
      const isGameOver = parseInt(qn) === round2Data.length;

      if (isGameOver) {
        //end the timer
        await endRound2Timer(res.locals.teamId);

        //get his/her start and end time
        const { round2StartTime, round2EndTime } = await getRound2Timing(
          res.locals.teamId
        );

        const startTime = new Date(round2StartTime).getTime();
        const endTime = new Date(round2EndTime).getTime();

        //time taken by sherlock to complete the game
        const { hours, minutes, seconds } = calculateTimeTaken(
          startTime,
          endTime
        );

        //update the team score
        await updateTeamScore(res.locals.teamId);

        return res.status(200).json({
          message: "Correct Answer!!",
          remark: "Your score has been incremented by 10 points!!",
          gameover: isGameOver,
          time: {
            time: `You have taken ${hours} hours, ${minutes} minutes, ${seconds} seconds to complete round 2 of the game`,
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
