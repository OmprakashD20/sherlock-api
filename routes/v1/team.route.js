const express = require("express");

/* CONTROLLERS */

/* MIDDLEWARES */
const verifyUser = require("../../middleware/auth.middleware");

/* VALIDATORS */

const teamRouter = express.Router();

teamRouter.get("/", verifyUser, (req, res) =>
  res.status(200).json({
    message: "You hit the Team Route",
  })
);

//GET - /details

//GET - /leaderboard

module.exports = teamRouter;
