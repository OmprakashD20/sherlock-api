import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { verifyJWT } from "@/utils";

//auth middleware
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    if (!token)
      return res.status(401).json({
        message: "No token found, authorization denied.",
      });

    let payload = verifyJWT(token) as JwtPayload;

    if (!payload)
      return res.status(401).json({
        message: "Token verification failed, authorization denied.",
      });

    //todo: check if the team and the user exists
    res.locals.teamId = payload.teamId;
    res.locals.kid = payload.kid;

    next();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error!!",
    });
  }
};
