//JWT
const { verifyToken } = require("../services/jwt.service");

//verify user
const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    //check if token exists
    if (!token)
      return res.status(401).json({
        message: "No token, authorization denied.",
      });

    //verify token
    const verified = verifyToken(token);

    //if the token is not valid
    if (!verified)
      return res.status(401).json({
        message: "Token verification failed, authorization denied.",
      });

    //if the token is valid, update the request object with the teamId and kid of the user who has logged in
    req.teamId = verified.teamId;
    req.kid = verified.kid;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

module.exports = verifyUser;
