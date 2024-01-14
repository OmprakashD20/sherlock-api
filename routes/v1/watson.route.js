const express = require("express");

//controllers

//middlewares

//validators

const watsonRouter = express.Router();

watsonRouter.get("/", (req, res) =>
  res.status(200).json({
    message: "You hit the Watson API route",
  })
);

/* ROUND 1 WATSON ROUTES */

//GET - /round1/:qn

//POST - /round1/:qn/clue

//POST - /round1/:qn

module.exports = watsonRouter;
