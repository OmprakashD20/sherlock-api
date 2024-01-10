const express = require("express");
const router = express.Router();

const { handleSuccess } = require("../../utils/helper.util");

const authRouter = require("./auth.route");
const sherlockRouter = require("./sherlock.route");
const watsonRouter = require("./watson.route");

router.get("/", (req, res) => handleSuccess(res, "You hit the v1 API route"));

router.use("/", authRouter);
router.use("/sherlock", sherlockRouter);
router.use("/watson", watsonRouter);
router.use("/round2", sherlockRouter);

module.exports = router;
