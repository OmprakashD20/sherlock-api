const express = require("express");
const router = express.Router();

const v1Route = require("./v1");

router.get("/", (req, res) =>
  res.status(200).json({
    message: "You hit the Sherlock API route",
  })
);

//v1 routes
router.use("/v1", v1Route);

module.exports = router;
