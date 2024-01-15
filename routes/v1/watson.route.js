const express = require("express");

/* CONTROLLERS */
const {
  getRound1Clue,
  getRound1Question,
  postRound1Answer,
} = require("../../controllers/watson.controller");

/* MIDDLEWARES */
const verifyUser = require("../../middleware/auth.middleware");

/* VALIDATORS */

const watsonRouter = express.Router();

watsonRouter.get("/", (req, res) =>
  res.status(200).json({
    message: "You hit the Watson API route",
  })
);

/* ROUND 1 WATSON ROUTES */

//GET - /round1/:qn
watsonRouter.get("/round1/:qn", verifyUser, getRound1Question);

//POST - /round1/:qn/clue
watsonRouter.post("/round1/:qn/clue", verifyUser, getRound1Clue);

//POST - /round1/:qn
watsonRouter.post("/round1/:qn", verifyUser, postRound1Answer);

module.exports = watsonRouter;
