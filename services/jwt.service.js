const jwt = require("jsonwebtoken");

const createJWT = (id, kid) => {
  //payload contains the teamId and kid of the user who has logged in
  const payload = {
    teamId: id,
    kid: kid,
  };

  //create jwt
  let token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 5 * 86400,
    algorithm: "HS256",
  });
  return token;
};

const verifyToken = (token) => {
  let verified;
  try {
    //verify token
    verified = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
  return verified;
};

module.exports = {
  createJWT,
  verifyToken,
};
