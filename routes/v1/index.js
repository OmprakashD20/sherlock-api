const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const sherlockRouter = require("./sherlock.route");
const watsonRouter = require("./watson.route");

router.get("/", (req, res) =>
  res.status(200).json({
    message: "You hit the v1 API route",
  })
);

//auth routes
router.use("/", authRouter);

//sherlock routes
router.use("/sherlock", sherlockRouter);

//watson routes
router.use("/watson", watsonRouter);

//round 2 routes
router.use("/round2", sherlockRouter);

module.exports = router;
