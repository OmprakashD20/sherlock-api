import AppDataSource from "@/data-source";

import { Score } from "@/models";

export const scoreRepository = AppDataSource.getRepository(Score);

export const getScoresByTeamId = (teamId: string) => {
  return scoreRepository
    .createQueryBuilder("score")
    .where("score.teamId = :teamId", { teamId })
    .getOne();
};

export const updateSherlockScore = (teamId: string, score: number) => {
  return scoreRepository
    .createQueryBuilder()
    .update()
    .set({
      sherlockScore: () => `sherlockScore + ${score}`,
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const updateWatsonScore = (teamId: string, score: number) => {
  return scoreRepository
    .createQueryBuilder()
    .update()
    .set({
      watsonScore: () => `watsonScore + ${score}`,
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const updateRound1ScoreBySherlock = (teamId: string) => {
  return scoreRepository
    .createQueryBuilder()
    .update()
    .set({
      round1Score: () => "round1Score + sherlockScore",
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const updateRound1ScoreByWatson = (teamId: string) => {
  return scoreRepository
    .createQueryBuilder()
    .update()
    .set({
      round1Score: () => "round1Score + watsonScore",
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const updateRound2Score = (teamId: string, score: number) => {
  return scoreRepository
    .createQueryBuilder()
    .update()
    .set({
      round2Score: () => `round2Score + ${score}`,
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const updateTeamScore = (teamId: string) => {
  return scoreRepository
    .createQueryBuilder()
    .update()
    .set({
      teamScore: () => "round1Score + round2Score",
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};
