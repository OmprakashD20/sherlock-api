import AppDataSource from "@/data-source";

import { Score } from "@/models";

export const scoreRepository = AppDataSource.getRepository(Score);

export const getScoresByTeamId = (teamId: string) => {
  return scoreRepository
    .createQueryBuilder("score")
    .where("score.teamId = :teamId", { teamId })
    .getOne();
};

export const updateSherlockScore = async (teamId: string, score: number) => {
  const sherlockScore = (
    await scoreRepository
      .createQueryBuilder("score")
      .select("score.sherlockScore")
      .where("score.teamId = :teamId", { teamId })
      .getOne()
  ).sherlockScore;
  if (sherlockScore <= 0 && score === -5) score = 0;
  return scoreRepository
    .createQueryBuilder()
    .update()
    .set({
      sherlockScore: () => `sherlockScore + ${score}`,
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const updateWatsonScore = async (teamId: string, score: number) => {
  const watsonScore = (
    await scoreRepository
      .createQueryBuilder("score")
      .select("score.watsonScore")
      .where("score.teamId = :teamId", { teamId })
      .getOne()
  ).watsonScore;
  if (watsonScore <= 0 && score === -5) score = 0;
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

export const updateRound2Score = async (teamId: string, score: number) => {
  const round2Score = (
    await scoreRepository
      .createQueryBuilder("score")
      .select("score.round2Score")
      .where("score.teamId = :teamId", { teamId })
      .getOne()
  ).round2Score;
  if (round2Score <= 0 && score === -5) score = 0;
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
