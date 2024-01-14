const express = require("express");

//controllers

//middlewares
const verifyUser = require("../../middleware/auth.middleware");

//validators

const sherlockRouter = express.Router();

sherlockRouter.get("/", verifyUser, (req, res) =>
  res.status(200).json({
    message: "You hit the Sherlock Route",
  })
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
