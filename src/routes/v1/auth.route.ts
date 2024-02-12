import express from "express";

const authRouter = express.Router();

//controllers
import { signInController, signUpController } from "@/controllers";

//middleware
import { verifyKUser } from "@/middlewares";

//validators
import { SignInSchema, SignUpSchema, validate } from "@/validators";

//POST - sign up
authRouter.post(
  "/sign-up",
  validate(SignUpSchema),
  //to check if he/she is a valid k!24 user
  verifyKUser,
  signUpController
);

//POST - sign in
authRouter.post("/sign-in", validate(SignInSchema), signInController);

export default authRouter;
