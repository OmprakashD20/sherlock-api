import AppDataSource from "@/data-source";

import { Clues, Question, Score, Team, Time } from "@/models";

export const teamRepository = AppDataSource.getRepository(Team);

export const findTeamByName = (name: string) => {
  return teamRepository
    .createQueryBuilder("team")
    .where("team.name = :name", { name })
    .getOne();
};

export const findTeamById = (teamId: string) => {
  return teamRepository
    .createQueryBuilder("team")
    .where("team.id = :id", { id: teamId })
    .getOne();
};

export const createNewTeam = async (data: Partial<Team>) => {
  const team = new Team();
  const score = new Score();
  const clues = new Clues();
  const time = new Time();
  const question = new Question();
  Object.assign(team, {
    ...data,
    score,
    clues,
    time,
    question,
  });
  return await teamRepository.save(team);
};

export const isSherlock = async (kid: string, teamId: string) => {
  return (await findTeamById(teamId)).sherlock === kid;
};

export const isWatson = async (kid: string, teamId: string) => {
  return (await findTeamById(teamId)).watson === kid;
};

export const getLeaderboardDetails = () => {
  return teamRepository
    .createQueryBuilder("team")
    .select([
      "team.id",
      "team.name",
      "team.sherlock",
      "team.watson",
    ])
    .leftJoinAndSelect("team.score", "score")
    .leftJoinAndSelect("team.time", "time")
    .getMany();
};
