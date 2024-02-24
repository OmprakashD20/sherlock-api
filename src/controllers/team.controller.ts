import { Request, Response } from "express";

//services
import {
  findTeamById,
  getLeaderboardDetails,
  getRound2CurrentQuestion,
  getScoresByTeamId,
  getSherlockCurrentQuestion,
  getTimingDetailsByTeamId,
  getWatsonCurrentQuestion,
} from "@/services";

//utils
import { calculateTimeTaken } from "@/utils";

//models
import { Team } from "@/models";
import { CharacterSchemaType } from "@/validators";

export const getCharacterDetails = async (
  req: Request<{}, {}, {}, CharacterSchemaType>,
  res: Response
) => {
  try {
    const { character } = req.query;
    const team = await findTeamById(res.locals.teamId);
    const round2CurrentQn = await getRound2CurrentQuestion(res.locals.teamId);
    if (character === "sherlock") {
      const currentQn = await getSherlockCurrentQuestion(res.locals.teamId);
      return res.status(200).json({
        name: team.name,
        character: "sherlock",
        sherlock: team.sherlock,
        watson: team.watson,
        currentQn: currentQn + 1,
        round1Cleared: team.round1Cleared,
        round2CurrentQn: round2CurrentQn + 1,
      });
    }
    if (character === "watson") {
      const currentQn = await getWatsonCurrentQuestion(res.locals.teamId);
      return res.status(200).json({
        name: team.name,
        character: "watson",
        sherlock: team.sherlock,
        watson: team.watson,
        currentQn: currentQn + 1,
        round1Cleared: team.round1Cleared,
        round2CurrentQn: round2CurrentQn + 1,
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

    const scores = await getScoresByTeamId(res.locals.teamId);

    let sherlockTiming: {
        hours: number;
        minutes: number;
        seconds: number;
      },
      watsonTiming: {
        hours: number;
        minutes: number;
        seconds: number;
      };

    const timings = await getTimingDetailsByTeamId(res.locals.teamId);
    if (
      !timings.sherlockStartTime ||
      !timings.sherlockEndTime ||
      !timings.watsonStartTime ||
      !timings.watsonEndTime
    ) {
      sherlockTiming = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      watsonTiming = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    } else {
      sherlockTiming = calculateTimeTaken(
        timings.sherlockStartTime.getTime(),
        timings.sherlockEndTime.getTime()
      );
      watsonTiming = calculateTimeTaken(
        timings.watsonStartTime.getTime(),
        timings.watsonEndTime.getTime()
      );
    }
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
      sherlockTiming,
      watsonTiming,
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
        //if a team hasn't started the round yet, then their time will be null
        if (
          a.time.sherlockStartTime &&
          a.time.sherlockEndTime &&
          a.time.watsonStartTime &&
          a.time.watsonEndTime &&
          b.time.sherlockStartTime &&
          b.time.sherlockEndTime &&
          b.time.watsonStartTime &&
          b.time.watsonEndTime
        )
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
        return 0;
      }
      return b.score.round1Score - a.score.round1Score;
    });
    const position = data.findIndex((team) => team.id === res.locals.teamId);
    const totalTeams = data.length;
    let result = data.map((team, index) => {
      if (
        !team.time.sherlockStartTime ||
        !team.time.sherlockEndTime ||
        !team.time.watsonStartTime ||
        !team.time.watsonEndTime
      )
        return {
          id: index + 1,
          name: team.name,
          teamScore: team.score.teamScore,
          timeTaken: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        };
      const sherlockTime = calculateTimeTaken(
        team.time.sherlockStartTime.getTime(),
        team.time.sherlockEndTime.getTime()
      );
      const watsonTime = calculateTimeTaken(
        team.time.watsonStartTime.getTime(),
        team.time.watsonEndTime.getTime()
      );
      let teamTime: {
        hours: number;
        minutes: number;
        seconds: number;
      };
      if (sherlockTime.hours > watsonTime.hours) {
        teamTime = sherlockTime;
      } else if (sherlockTime.hours < watsonTime.hours) {
        teamTime = watsonTime;
      } else if (sherlockTime.hours === watsonTime.hours) {
        if (sherlockTime.minutes > watsonTime.minutes) {
          teamTime = sherlockTime;
        } else if (sherlockTime.minutes < watsonTime.minutes) {
          teamTime = watsonTime;
        }
        if (sherlockTime.minutes === watsonTime.minutes) {
          if (sherlockTime.seconds > watsonTime.seconds) {
            teamTime = sherlockTime;
          } else {
            teamTime = watsonTime;
          }
        }
      }
      return {
        id: index + 1,
        name: team.name,
        teamScore: team.score.teamScore,
        timeTaken: teamTime,
      };
    });
    res.status(200).json({
      position: position + 1,
      totalTeams,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

//todo: add time taken for round 2
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
