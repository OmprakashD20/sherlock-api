const express = require("express");

const { handleSuccess } = require("../../utils/helper.util");

//Controllers

//Validators

const authRouter = express.Router();

authRouter.get("/", (req, res) =>
  handleSuccess(res, "Welcome to the Sherlock Authentication Route")
);

//POST - /sign-up

//POST - /sign-in

module.exports = authRouter;
