import express from "express";

//controllers
import {
  getSherlockRound1Clue,
  getSherlockRound1Question,
  submitSherlockRound1Answer,
} from "@/controllers";

//middleware
import {
  checkSherlockLastQuestion,
  verifySherlock,
  verifyToken,
} from "@/middlewares";

//validators
import { AnswerSchema, QnSchema, validate } from "@/validators";

const sherlockRouter = express.Router();

sherlockRouter.use(verifyToken);
sherlockRouter.use(verifySherlock);
sherlockRouter.use(checkSherlockLastQuestion);

// round 1

//GET - get questions
sherlockRouter.get(
  "/round1/:qn",
  validate(QnSchema),
  getSherlockRound1Question
);

//GET - get clues
sherlockRouter.get(
  "/round1/:qn/clue",
  validate(QnSchema),
  getSherlockRound1Clue
);

//POST - submit answers
sherlockRouter.post(
  "/round1/:qn",
  validate(AnswerSchema),
  submitSherlockRound1Answer
);

export default sherlockRouter;
