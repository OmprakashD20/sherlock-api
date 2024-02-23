import AppDataSource from "@/data-source";

import { Time } from "@/models";

export const timeRepository = AppDataSource.getRepository(Time);

export const startSherlockTimer = (teamId: string) => {
  return timeRepository
    .createQueryBuilder()
    .update()
    .set({ sherlockStartTime: new Date() })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const endSherlockTimer = (teamId: string) => {
  return timeRepository
    .createQueryBuilder()
    .update()
    .set({ sherlockEndTime: new Date() })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const isSherlockTimerStarted = async (teamId: string) => {
  const timings: Time = await timeRepository
    .createQueryBuilder("time")
    .where("time.teamId = :teamId", { teamId })
    .getOne();

  return timings.sherlockStartTime !== null;
};

export const startWatsonTimer = (teamId: string) => {
  return timeRepository
    .createQueryBuilder()
    .update()
    .set({ watsonStartTime: new Date() })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const endWatsonTimer = (teamId: string) => {
  return timeRepository
    .createQueryBuilder()
    .update()
    .set({ watsonEndTime: new Date() })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const isWatsonTimerStarted = async (teamId: string) => {
  const timings: Time = await timeRepository
    .createQueryBuilder("time")
    .where("time.teamId = :teamId", { teamId })
    .getOne();

  return timings.watsonStartTime !== null;
};

export const getSherlockTiming = async (teamId: string) => {
  const timings: Time = await timeRepository
    .createQueryBuilder("time")
    .where("time.teamId = :teamId", { teamId })
    .getOne();

  return {
    sherlockStartTime: timings.sherlockStartTime,
    sherlockEndTime: timings.sherlockEndTime,
  };
};

export const getWatsonTiming = async (teamId: string) => {
  const timings: Time = await timeRepository
    .createQueryBuilder("time")
    .where("time.teamId = :teamId", { teamId })
    .getOne();

  return {
    watsonStartTime: timings.watsonStartTime,
    watsonEndTime: timings.watsonEndTime,
  };
};

export const startRound2Timer = (teamId: string) => {
  return timeRepository
    .createQueryBuilder()
    .update()
    .set({ round2StartTime: new Date() })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const endRound2Timer = (teamId: string) => {
  return timeRepository
    .createQueryBuilder()
    .update()
    .set({ round2EndTime: new Date() })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const isRound2TimerStarted = async (teamId: string) => {
  const timings: Time = await timeRepository
    .createQueryBuilder("time")
    .where("time.teamId = :teamId", { teamId })
    .getOne();

  return timings.round2StartTime !== null;
};

export const getRound2Timing = async (teamId: string) => {
  const timings: Time = await timeRepository
    .createQueryBuilder("time")
    .where("time.teamId = :teamId", { teamId })
    .getOne();

  return {
    round2StartTime: timings.round2StartTime,
    round2EndTime: timings.round2EndTime,
  };
};

export const getTimingDetailsByTeamId = async (teamId: string) => {
  return timeRepository
    .createQueryBuilder("time")
    .where("time.teamId = :teamId", { teamId })
    .getOne();
};
