import jwt from "jsonwebtoken";

export const createJWT = (kid: string, teamId: string, email: string) => {
  //payload contains the kid of the user who has logged in and the teamId
  const payload = {
    kid,
    teamId,
    email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 5 * 86400,
    algorithm: "HS256",
  });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  } catch (err: any) {
    return null;
  }
};
