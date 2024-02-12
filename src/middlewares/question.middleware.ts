import { NextFunction, Request, Response } from "express";

//services
import {
  getRound1Status,
  getSherlockCurrentQuestion,
  getWatsonCurrentQuestion,
  isSherlockCompleted,
  isWatsonCompleted,
} from "@/services";
import { sherlockData, watsonData } from "@/data";

export const checkSherlockLastQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isLastQuestion = await isWatsonCompleted(res.locals.teamId);
    const currentQn = await getSherlockCurrentQuestion(res.locals.teamId);
    if (!isLastQuestion && currentQn === sherlockData.length - 1)
      return res.status(403).json({
        message: `Your team mate, Watson hasn't reached ${
          watsonData.length - 1
        }th question yet!!`,
        remark: `Wait for his completion upto ${watsonData.length}th question!!`,
      });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const checkWatsonLastQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isLastQuestion = await isSherlockCompleted(res.locals.teamId);
    const currentQn = await getWatsonCurrentQuestion(res.locals.teamId);
    if (!isLastQuestion && currentQn === watsonData.length - 1)
      return res.status(403).json({
        message: `Your team mate, Sherlock hasn't reached ${
          sherlockData.length - 1
        }th question yet!!`,
        remark: `Wait for his completion upto ${
          sherlockData.length - 1
        }th question!!`,
      });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const checkRound1Cleared = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const round1Status = await getRound1Status(res.locals.teamId);
    if (!round1Status)
      return res.status(403).json({
        message: "You haven't selected for Round 2, Better luck next time",
      });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};
