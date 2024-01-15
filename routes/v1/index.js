const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const sherlockRouter = require("./sherlock.route");
const watsonRouter = require("./watson.route");
const teamRouter = require("./team.route");

router.get("/", (req, res) =>
  res.status(200).json({
    message: "You hit the v1 API route",
  })
);

/* AUTH ROUTES */
router.use("/", authRouter);

/* SHERLOCK ROUTES */
router.use("/sherlock", sherlockRouter);

/* WATSON ROUTES */
router.use("/watson", watsonRouter);

/* ROUND 2 ROUTES */
router.use("/round2", sherlockRouter);

/* TEAM ROUTES */
router.use("/team", teamRouter);

module.exports = router;
