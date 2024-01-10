const express = require("express");

const { handleSuccess } = require("../../utils/helper.util");

//Controllers

//Middlewares

//Validators

const watsonRouter = express.Router();

watsonRouter.get("/", (req, res) =>
  handleSuccess(res, "Welcome to the Watson Route")
);

/* ROUND 1 WATSON ROUTES */

//GET - /round1/:qn

//POST - /round1/:qn/clue

//POST - /round1/:qn

module.exports = watsonRouter;
