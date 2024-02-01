import express from "express";

const authRouter = express.Router();

//controllers
import { signInController, signUpController } from "@/controllers";

//validators
import { SignInSchema, SignUpSchema, validate } from "@/validators";

//POST - sign up
authRouter.post("/sign-up", validate(SignUpSchema), signUpController);

//POST - sign in
authRouter.post("/sign-in", validate(SignInSchema), signInController);

export default authRouter;
