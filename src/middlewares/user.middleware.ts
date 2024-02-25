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
import { CharacterSchemaType } from "@/validators";

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

//restrict the second user from logging in
export const restrictSecondUser = async (
  req: Request<any, any, any, CharacterSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = res.locals.teamId;

    const { character: player } = req.query;

    const character = await getRound2Status(teamId);

    if (!character || character === "null") {
      await setRound2Status(teamId, player);
      next();
    }

    if (player === "sherlock" && character === "watson") {
      const isLoggedIn = await getLogInStatus(teamId);
      if (isLoggedIn)
        return res.status(409).json({
          error: "Oops! Looks like Watson is already in the game.",
        });
    }

    if (player === "watson" && character === "sherlock") {
      const isLoggedIn = await getLogInStatus(teamId);
      if (isLoggedIn)
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
