const data = require("../data/round1/sherlock.data");

/* MODEL HELPERS */
const {
  getSherlockLastClue,
  setSherlockLastClue,
  setSherlockScore,
  startSherlockTimer,
  endSherlockTimer,
} = require("../models/team.model");

/* UTILS */
const { compareAnswer } = require("../utils/helper.util");

/* ROUND 1 SHERLOCK CONTROLLERS */
const getRound1Question = async (req, res) => {
  try {
    const { qn } = req.params;

    //check if the game is over
    if (qn > data.length)
      return res.status(409).json({
        message: "No more questions, Game Over!",
      });

    //check if the question exists
    if (data[qn - 1]) {
      //start the timer if it is the first question
      if (parseInt(qn) === 1) await startSherlockTimer(req.teamId);

      const { question } = data[qn - 1];
      return res.status(200).json({
        question,
      });
    } else {
      return res.status(404).json({
        message: "Question not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getRound1Clue = async (req, res) => {
  try {
    const { qn } = req.params;

    //check if the game is over
    if (qn > data.length)
      return res.status(409).json({
        message: "No more questions, Game Over!",
      });

    //check if the question exists
    if (!data[qn - 1])
      return res.status(404).json({
        message: "Question not found",
      });

    //get the last clue used by sherlock
    const lastSherlockClue = await getSherlockLastClue(req.teamId);

    //check if the clue has already been used
    if (qn > lastSherlockClue) {
      const { clue } = data[qn - 1];

      //set the last clue used by sherlock and deduct 5 points from the overall score
      await setSherlockLastClue(req.teamId, qn);
      return res.status(200).json({
        questionNo: qn,
        clue,
        message: "Your clue has been revealed!",
        remark: "Your score has been deducted by 5 points",
      });
    } else {
      return res.status(410).json({
        message: "Clue has already been used for this question",
        questionNo: qn,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const postRound1Answer = async (req, res) => {
  try {
    const { qn } = req.params;
    const { answer } = req.body;

    //check if the game is over
    if (qn > data.length)
      return res.status(409).json({
        message: "No more questions, Game Over!",
      });

    //check if the question exists
    if (!data[qn - 1])
      return res.status(404).json({
        message: "Question not found",
      });

    //check if the answer is correct
    if (compareAnswer(answer, data[qn - 1].answer)) {
      //set the score for sherlock
      await setSherlockScore(req.teamId);

      //check if the game is over
      const isGameOver = parseInt(qn) === data.length;

      //end the timer if the game is over
      if (isGameOver) {
        const { sherlockStartTime, sherlockEndTime } = await endSherlockTimer(
          req.teamId
        );
        const startTime = new Date(sherlockStartTime);
        const endTime = new Date(sherlockEndTime);
        const timeInMilliSeconds = endTime - startTime;

        const timeInSeconds = timeInMilliSeconds / 1000;

        // Convert seconds to hours, minutes, and seconds
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        
        return res.status(200).json({
          message: "Correct Answer!",
          remark: "Your score has been incremented by 10 points!",
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
        message: "Correct Answer!",
        remark: "Your score has been incremented by 10 points!",
        gameover: isGameOver,
      });
    } else {
      return res.status(200).json({
        message: "Wrong Answer!",
        remark: "Better luck next time!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/* ROUND 2 CONTROLLERS */
const getRound2Question = async (req, res) => {};

const getRound2Clue = async (req, res) => {};

const postRound2Answer = async (req, res) => {};

module.exports = {
  getRound1Question,
  getRound1Clue,
  postRound1Answer,
  getRound2Question,
  getRound2Clue,
  postRound2Answer,
};
