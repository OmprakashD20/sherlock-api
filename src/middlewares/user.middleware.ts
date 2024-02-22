import { NextFunction, Request, Response } from "express";

//services
import {
  getCharacter,
  getLogInStatus,
  getRound2Status,
  isSherlock,
  isWatson,
  setRound2Status,
} from "@/services";

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
        error: "You are not the sherlock of your team.",
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
        error: "You are not the watson of your team.",
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

export const restrictSecondUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = res.locals.teamId;

    //fix: get the character of the user from the req params

    //check if a user has already logged in
    const { isSherlock, isWatson } = await getCharacter(res.locals.kid, teamId);

    //restrict the second user from logging in

    const character = await getRound2Status(teamId);

    if (!character) {
      const userCharacter = isSherlock ? "sherlock" : "watson";
      await setRound2Status(teamId, userCharacter);
      next();
    }

    if (isSherlock) {
      const isLoggedIn = await getLogInStatus(teamId);
      if (isLoggedIn && character !== "sherlock")
        return res.status(409).json({
          error: "Oops! Looks like Watson is already in the game.",
        });
    }

    if (isWatson) {
      const isLoggedIn = await getLogInStatus(teamId);
      if (isLoggedIn && character !== "watson")
        return res.status(409).json({
          error: "Oops! Looks like Sherlock is already in the game.",
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
