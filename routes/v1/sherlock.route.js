const express = require("express");

const { handleSuccess } = require("../../utils/helper.util");

//Controllers

//Middlewares

//Validators

const sherlockRouter = express.Router();

sherlockRouter.get("/", (req, res) =>
  handleSuccess(res, "Welcome to the Sherlock Route")
);

/* ROUND 1 SHERLOCK ROUTES */

//GET - /round1/:qn

//POST - /round1/:qn/clue

//POST - /round1/:qn

/* ROUND 2 ROUTES */

//GET - /:qn

//POST - /:qn/clue

//POST - /:qn

module.exports = sherlockRouter;
