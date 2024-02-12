import express from "express";

//controllers
import {
  getWatsonRound1Clue,
  getWatsonRound1Question,
  submitWatsonRound1Answer,
} from "@/controllers";

//middleware
import {
  verifyWatson,
  verifyToken,
  checkWatsonLastQuestion,
} from "@/middlewares";

//validators
import { validate } from "@/validators";
import { AnswerSchema, QnSchema } from "@/validators/team.validator";

const watsonRouter = express.Router();

watsonRouter.use(verifyToken);
watsonRouter.use(verifyWatson);
watsonRouter.use(checkWatsonLastQuestion);

// round 1

//GET - get questions
watsonRouter.get("/round1/:qn", validate(QnSchema), getWatsonRound1Question);

//GET - get clues
watsonRouter.get("/round1/:qn/clue", validate(QnSchema), getWatsonRound1Clue);

//POST - submit answers
watsonRouter.post(
  "/round1/:qn",
  validate(AnswerSchema),
  submitWatsonRound1Answer
);

export default watsonRouter;
