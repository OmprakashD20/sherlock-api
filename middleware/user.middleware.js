/* MODEL HELPERS */
const { isSherlock, isWatson } = require("../models/team.model");

/* SHERLOCK MIDDLEWARE */
const verifySherlock = async (req, res, next) => {
  try {
    //check if the user is the sherlock
    const sherlock = await isSherlock(req.teamId, req.kid);
    if (!sherlock)
      return res.status(401).json({
        message: "You are not the Sherlock of this team!",
      });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

/* WATSON MIDDLEWARE */
const verifyWatson = async (req, res, next) => {
  try {
    //check if the user is the watson
    const watson = await isWatson(req.teamId, req.kid);
    if (!watson)
      return res.status(401).json({
        message: "You are not the Watson of this team!",
      });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

module.exports = { verifySherlock, verifyWatson };
