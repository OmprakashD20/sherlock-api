import express from "express";

//middleware
import { verifySherlock, verifyToken } from "@/middlewares";

//validators
import { validate } from "@/validators";
import { AnswerSchema, QnSchema } from "@/validators/team.validator";
import {
  getSherlockRound1Clue,
  getSherlockRound1Question,
  submitSherlockRound1Answer,
} from "@/controllers";
import { checkSherlockLastQuestion } from "@/middlewares/question.middleware";

const sherlockRouter = express.Router();

sherlockRouter.use(verifyToken);

// round 1

//GET - get questions
sherlockRouter.get(
  "/round1/:qn",
  verifySherlock,
  checkSherlockLastQuestion,
  validate(QnSchema),
  getSherlockRound1Question
);

//GET - get clues
sherlockRouter.get(
  "/round1/:qn/clue",
  verifySherlock,
  checkSherlockLastQuestion,
  validate(QnSchema),
  getSherlockRound1Clue
);

//POST - submit answers
sherlockRouter.post(
  "/round1/:qn",
  verifySherlock,
  checkSherlockLastQuestion,
  validate(AnswerSchema),
  submitSherlockRound1Answer
);

// round 2

//GET - get questions
sherlockRouter.get("/round2/:qn", validate(QnSchema));

//GET - get clues
sherlockRouter.post("/round2/:qn/clue", validate(QnSchema));

//POST - submit answers
sherlockRouter.post("/round2/:qn", validate(AnswerSchema));

export default sherlockRouter;
