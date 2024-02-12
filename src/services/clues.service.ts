import AppDataSource from "@/data-source";

import { Clues } from "@/models";

export const cluesRepository = AppDataSource.getRepository(Clues);

export const getLastClueUsedBySherlock = async (teamId: string) => {
  return (
    await cluesRepository
      .createQueryBuilder("clues")
      .where("clues.teamId = :teamId", { teamId })
      .getOne()
  ).lastClueUsedBySherlock;
};

export const setLastClueUsedBySherlock = (teamId: string, clueId: number) => {
  return cluesRepository
    .createQueryBuilder()
    .update()
    .set({
      lastClueUsedBySherlock: clueId,
      cluesUsedBySherlock: () => "cluesUsedBySherlock + 1",
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const getLastClueUsedByWatson = async (teamId: string) => {
  return (
    await cluesRepository
      .createQueryBuilder("clues")
      .where("clues.teamId = :teamId", { teamId })
      .getOne()
  ).lastClueUsedByWatson;
};

export const setLastClueUsedByWatson = (teamId: string, clueId: number) => {
  return cluesRepository
    .createQueryBuilder()
    .update()
    .set({
      lastClueUsedByWatson: clueId,
      cluesUsedByWatson: () => "cluesUsedByWatson + 1",
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const getLastClueUsedInRound2 = async (teamId: string) => {
  return (
    await cluesRepository
      .createQueryBuilder("clues")
      .where("clues.teamId = :teamId", { teamId })
      .getOne()
  ).lastClueUsedInRound2;
};

export const setLastClueUsedInRound2 = (teamId: string, clueId: number) => {
  return cluesRepository
    .createQueryBuilder()
    .update()
    .set({
      lastClueUsedInRound2: clueId,
      cluesUsedInRound2: () => "cluesUsedInRound2 + 1",
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};
