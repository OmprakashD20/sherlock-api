import express from "express";

//controllers
import {
  getRound2Clue,
  getRound2Question,
  removeLoggedInCharacter,
  submitRound2Answer,
} from "@/controllers";

//middlewares
import {
  checkRound1Cleared,
  restrictSecondUser,
  verifyToken,
} from "@/middlewares";

//validators
import {
  AnswerSchema,
  CharacterSchema,
  QnSchema,
  validate,
} from "@/validators";

const round2Router = express.Router();

round2Router.use(verifyToken);
round2Router.use(checkRound1Cleared);

// round 2

//GET - remove already logged in character
round2Router.get("/logout", removeLoggedInCharacter);

//GET - get questions
round2Router.get(
  "/:qn",
  restrictSecondUser,
  validate(QnSchema),
  getRound2Question
);

//GET - get clues
round2Router.get(
  "/:qn/clue",
  restrictSecondUser,
  validate(QnSchema),
  getRound2Clue
);

//POST - submit answers
round2Router.post(
  "/:qn",
  restrictSecondUser,
  validate(AnswerSchema),
  submitRound2Answer
);

export default round2Router;
