const express = require("express");

//controllers
const {
  signInController,
  signUpController,
} = require("../../controllers/auth.controller");

//validators
const {
  signInValidator,
  signUpValidator,
} = require("../../validators/team.validator");

const authRouter = express.Router();

authRouter.get("/", (req, res) =>
  res.status(200).json({
    message: "You hit the Auth API route",
  })
);

//POST - /sign-up
authRouter.post("/sign-up", signUpValidator, signUpController);

//POST - /sign-in
authRouter.post("/sign-in", signInValidator, signInController);

module.exports = authRouter;
