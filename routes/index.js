const express = require("express");
const router = express.Router();

const { handleSuccess } = require("../utils/helper.util");

const v1Route = require("./v1");

router.get("/", (req, res) => handleSuccess(res, "You hit the API route"));

router.use("/v1", v1Route);

module.exports = router;
