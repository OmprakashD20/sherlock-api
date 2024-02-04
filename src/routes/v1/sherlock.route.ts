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

sherlockRouter.get(
  "/round1/:qn",
  verifySherlock,
  checkSherlockLastQuestion,
  validate(QnSchema),
  getSherlockRound1Question
);
sherlockRouter.get(
  "/round1/:qn/clue",
  verifySherlock,
  checkSherlockLastQuestion,
  validate(QnSchema),
  getSherlockRound1Clue
);
sherlockRouter.post(
  "/round1/:qn",
  verifySherlock,
  checkSherlockLastQuestion,
  validate(AnswerSchema),
  submitSherlockRound1Answer
);

// round 2

sherlockRouter.get("/round2/:qn", validate(QnSchema));
sherlockRouter.post("/round2/:qn/clue", verifyToken);
sherlockRouter.post("/round2/:qn", verifyToken);

export default sherlockRouter;
