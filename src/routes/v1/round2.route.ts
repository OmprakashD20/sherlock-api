import express from "express";

//controllers
import {
  getRound2Clue,
  getRound2Question,
  submitRound2Answer,
} from "@/controllers";

//middlewares
import {
  checkRound1Cleared,
  restrictSecondUser,
  verifyToken,
} from "@/middlewares";

//validators
import { AnswerSchema, QnSchema, validate } from "@/validators";

const round2Router = express.Router();

round2Router.use(verifyToken);
round2Router.use(checkRound1Cleared);
round2Router.use(restrictSecondUser);

// round 2

//GET - get questions
round2Router.get("/:qn", validate(QnSchema), getRound2Question);

//GET - get clues
round2Router.get("/:qn/clue", validate(QnSchema), getRound2Clue);

//POST - submit answers
round2Router.post("/:qn", validate(AnswerSchema), submitRound2Answer);

export default round2Router;
