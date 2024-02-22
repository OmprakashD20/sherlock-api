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
  getSherlockRemainingAttempts,
  getSherlockTiming,
  isSherlockTimerStarted,
  setLastClueUsedBySherlock,
  setSherlockCurrentQuestion,
  setSherlockRemainingAttempts,
  setSherlockStatus,
  setWatsonCurrentQuestion,
  startSherlockTimer,
  updateRound1ScoreBySherlock,
  updateSherlockScore,
  updateTeamScore,
} from "@/services";
import { parse } from "path";

//sherlock round 1 controllers
export const getSherlockRound1Question = async (
  req: Request<QnSchemaType, {}, {}>,
  res: Response
) => {
  try {
    const { qn } = req.params;

    //check if he/she has exceeded the attempts
    const attemptsRemaining = await getSherlockRemainingAttempts(
      res.locals.teamId,
      parseInt(qn)
    );

    if (attemptsRemaining === 0)
      return res.status(403).json({
        error:
          "You have exceeded the maximum number of attempts for this question!!",
      });

    //check if the game is over
    if (parseInt(qn) > sherlockData.length)
      return res.status(409).json({
        error: "No more questions, Game Over!!",
      });

    //check if he/she is requesting the question in correct sequence
    const currentQn = (await getSherlockCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        error:
          currentQn > parseInt(qn)
            ? "You have already attempted this question!!"
            : "You can only attempt questions in sequence!!",
      });

    //check if the question number is valid
    if (sherlockData[parseInt(qn) - 1]) {
      //start the timer if it is the first question
      if (parseInt(qn) === 1 && !isSherlockTimerStarted(res.locals.teamId))
        await startSherlockTimer(res.locals.teamId);

      const question = sherlockData[parseInt(qn) - 1];

      const attemptsRemaining = await getSherlockRemainingAttempts(
        res.locals.teamId,
        parseInt(qn)
      );

      return res.status(200).json({
        question: question.question,
        attemptsRemaining,
        assets: question.asset,
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

export const getSherlockRound1Clue = async (
  req: Request<QnSchemaType, {}, {}>,
  res: Response
) => {
  try {
    const { qn } = req.params;

    //check if he/she has exceeded the attempts
    const attemptsRemaining = await getSherlockRemainingAttempts(
      res.locals.teamId,
      parseInt(qn)
    );

    if (attemptsRemaining === 0)
      return res.status(403).json({
        error:
          "You have exceeded the maximum number of attempts for this question!!",
      });

    //check if the game is over
    if (parseInt(qn) > sherlockData.length)
      return res.status(409).json({
        error: "No more questions, Game Over!!",
      });

    //check if the question number is valid
    if (!sherlockData[parseInt(qn) - 1])
      return res.status(404).json({ error: "Question not found!!" });

    //check if he/she is requesting the clue for the current question
    const currentQn = (await getSherlockCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        error: "You can only request clue for the current question!!",
      });

    //get the last clue used by sherlock
    const lastClueUsedBySherlock = await getLastClueUsedBySherlock(
      res.locals.teamId
    );

    //check if the clue has already been used
    if (parseInt(qn) === lastClueUsedBySherlock)
      return res.status(410).json({
        error: "Clue has already been used for this question!!",
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

    //check if he/she has exceeded the attempts
    const attemptsRemaining = await getSherlockRemainingAttempts(
      res.locals.teamId,
      parseInt(qn)
    );

    if (attemptsRemaining === 0)
      return res.status(403).json({
        error:
          "You have exceeded the maximum number of attempts for this question!!",
      });

    //check if the game is over
    if (parseInt(qn) > sherlockData.length)
      return res.status(409).json({
        error: "No more questions, Game Over!!",
      });

    //check if he/she is posting the answer for his/her current question
    const currentQn = (await getSherlockCurrentQuestion(res.locals.teamId)) + 1;
    if (currentQn !== parseInt(qn))
      return res.status(403).json({
        error:
          currentQn > parseInt(qn)
            ? "You have already answered this question!!"
            : "You can only answer the questions in sequence!!",
      });

    //check if the question exists
    if (!sherlockData[parseInt(qn) - 1])
      return res.status(404).json({
        error: "Question not found!!",
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

        //set the current answered question for watson as the last question
        await setWatsonCurrentQuestion(res.locals.teamId, parseInt(qn));

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

        //update the team score
        await updateTeamScore(res.locals.teamId);

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
      const attemptsRemaining = await getSherlockRemainingAttempts(
        res.locals.teamId,
        parseInt(qn)
      );
      await setSherlockRemainingAttempts(
        res.locals.teamId,
        parseInt(qn),
        attemptsRemaining - 1
      );

      //skip the current question if he/she has reached the maximum attempts
      if (attemptsRemaining - 1 === 0) {
        await setSherlockCurrentQuestion(res.locals.teamId, parseInt(qn));
      }

      //check if it is the penultimate question
      const isPenultimateQn = parseInt(qn) === sherlockData.length - 1;

      if (isPenultimateQn) await setSherlockStatus(res.locals.teamId);

      //check if this is the last question
      const isGameOver = parseInt(qn) === sherlockData.length;

      if (isGameOver && attemptsRemaining - 1 === 0) {
        //end the timer
        await endSherlockTimer(res.locals.teamId);

        //set the current answered question for watson as the last question
        await setWatsonCurrentQuestion(res.locals.teamId, parseInt(qn));

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

        //update the team score
        await updateTeamScore(res.locals.teamId);

        return res.status(400).json({
          error: "Wrong Answer!!",
          remark: "Better luck next time!!",
          gameover: isGameOver,
          time: {
            time: `You have taken ${hours} hours, ${minutes} minutes, ${seconds} seconds to complete round 1 of the game`,
            hours,
            minutes,
            seconds,
          },
        });
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
