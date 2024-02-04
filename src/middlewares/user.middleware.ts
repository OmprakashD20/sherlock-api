import { NextFunction, Request, Response } from "express";

//services
import { isSherlock, isWatson } from "@/services";

export const verifySherlock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if the user is the sherlock of his/her team
    const sherlock = await isSherlock(res.locals.kid, res.locals.teamId);

    if (!sherlock) {
      return res.status(403).json({
        message: "You are not the sherlock of your team.",
      });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const verifyWatson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if the user is the watson of his/her team
    const watson = await isWatson(res.locals.kid, res.locals.teamId);

    if (!watson) {
      return res.status(403).json({
        message: "You are not the watson of your team.",
      });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};
