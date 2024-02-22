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
        error: "No token found, authorization denied.",
      });

    let payload = verifyJWT(token) as JwtPayload;

    if (!payload)
      return res.status(401).json({
        error: "Token verification failed, authorization denied.",
      });

    res.locals.teamId = payload.teamId;
    res.locals.kid = payload.kid;
    res.locals.email = payload.email;

    next();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error!!",
    });
  }
};
