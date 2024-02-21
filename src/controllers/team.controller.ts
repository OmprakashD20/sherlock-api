import { Request, Response } from "express";

//services
import {
  findTeamById,
  getCharacter,
  getLeaderboardDetails,
  getScoresByTeamId,
  getSherlockCurrentQuestion,
  getWatsonCurrentQuestion,
} from "@/services";

//models
import { Team } from "@/models";

export const getCharacterDetails = async (req: Request, res: Response) => {
  try {
    const team = await findTeamById(res.locals.teamId);
    const { isSherlock, isWatson } = await getCharacter(
      res.locals.kid,
      res.locals.teamId
    );
    if (isSherlock) {
      const currentQn = await getSherlockCurrentQuestion(res.locals.teamId);
      return res.status(200).json({
        name: team.name,
        character: "sherlock",
        sherlock: team.sherlock,
        watson: team.watson,
        currentQn: currentQn + 1 || 1,
      });
    }
    if (isWatson) {
      const currentQn = await getWatsonCurrentQuestion(res.locals.teamId);
      return res.status(200).json({
        name: team.name,
        character: "watson",
        sherlock: team.sherlock,
        watson: team.watson,
        currentQn: currentQn + 1 || 1,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const getTeamDetails = async (req: Request, res: Response) => {
  try {
    const team = await findTeamById(res.locals.teamId);

    if (!team)
      return res.status(404).json({
        message: "Team doesn't exists",
      });

    //todo: fetch team members details from k! api

    const scores = await getScoresByTeamId(res.locals.teamId);

    res.status(200).json({
      name: team.name,
      sherlock: team.sherlock,
      watson: team.watson,
      isRound1Completed: team.round1Cleared,
      sherlockScore: scores.sherlockScore,
      watsonScore: scores.watsonScore,
      round1Score: scores.round1Score,
      round2Score: scores.round2Score,
      teamScore: scores.teamScore,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const getRound1Leaderboard = async (req: Request, res: Response) => {
  try {
    let data: Team[] = await getLeaderboardDetails();
    data.sort((a, b) => {
      if (a.score.round1Score === b.score.round1Score) {
        return (
          Math.max(
            a.time.sherlockEndTime.getTime() -
              a.time.sherlockStartTime.getTime(),
            a.time.watsonEndTime.getTime() - a.time.watsonStartTime.getTime()
          ) -
          Math.max(
            b.time.sherlockEndTime.getTime() -
              b.time.sherlockStartTime.getTime(),
            b.time.watsonEndTime.getTime() - b.time.watsonStartTime.getTime()
          )
        );
      }
      return b.score.round1Score - a.score.round1Score;
    });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const getRound2Leaderboard = async (req: Request, res: Response) => {
  try {
    let data: Team[] = await getLeaderboardDetails();
    data.sort((a, b) => {
      if (a.score.round2Score === b.score.round2Score) {
        return (
          a.time.round2EndTime.getTime() - a.time.round2StartTime.getTime()
        );
      }
      return b.score.round2Score - a.score.round2Score;
    });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};
