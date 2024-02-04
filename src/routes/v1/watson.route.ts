import express from "express";

//middleware
import { verifyWatson, verifyToken } from "@/middlewares";

//validators
import { validate } from "@/validators";
import { AnswerSchema, QnSchema } from "@/validators/team.validator";
import {
  getWatsonRound1Clue,
  getWatsonRound1Question,
  submitWatsonRound1Answer,
} from "@/controllers";
import { checkWatsonLastQuestion } from "@/middlewares/question.middleware";

const watsonRouter = express.Router();

watsonRouter.use(verifyToken);

// round 1

watsonRouter.get(
  "/round1/:qn",
  verifyWatson,
  checkWatsonLastQuestion,
  validate(QnSchema),
  getWatsonRound1Question
);
watsonRouter.get(
  "/round1/:qn/clue",
  verifyWatson,
  checkWatsonLastQuestion,
  validate(QnSchema),
  getWatsonRound1Clue
);
watsonRouter.post(
  "/round1/:qn",
  verifyWatson,
  checkWatsonLastQuestion,
  validate(AnswerSchema),
  submitWatsonRound1Answer
);

export default watsonRouter;
