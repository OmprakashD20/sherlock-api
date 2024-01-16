const express = require("express");

/* CONTROLLERS */
const {
  getRound1Clue,
  getRound1Question,
  getRound2Clue,
  getRound2Question,
  postRound1Answer,
  postRound2Answer,
} = require("../../controllers/sherlock.controller");

/* MIDDLEWARES */
const verifyUser = require("../../middleware/auth.middleware");
const { verifySherlock } = require("../../middleware/user.middleware");

/* VALIDATORS */

const sherlockRouter = express.Router();

sherlockRouter.get("/", verifyUser, (req, res) =>
  res.status(200).json({
    message: "You hit the Sherlock Route",
  })
);

/* ROUND 1 SHERLOCK ROUTES */

//GET - /round1/:qn
sherlockRouter.get(
  "/round1/:qn",
  verifyUser,
  verifySherlock,
  getRound1Question
);

//POST - /round1/:qn/clue
sherlockRouter.post(
  "/round1/:qn/clue",
  verifyUser,
  verifySherlock,
  getRound1Clue
);

//POST - /round1/:qn
sherlockRouter.post(
  "/round1/:qn",
  verifyUser,
  verifySherlock,
  postRound1Answer
);

/* ROUND 2 ROUTES */

//GET - /:qn
sherlockRouter.get("/:qn", verifyUser, getRound2Question);

//POST - /:qn/clue
sherlockRouter.post("/:qn/clue", verifyUser, getRound2Clue);

//POST - /:qn
sherlockRouter.post("/:qn", verifyUser, postRound2Answer);

module.exports = sherlockRouter;
