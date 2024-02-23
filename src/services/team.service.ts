import AppDataSource from "@/data-source";

import { Clues, Question, Score, Team, Time } from "@/models";

export const teamRepository = AppDataSource.getRepository(Team);

export const getLogInStatus = async (teamId: string) => {
  const team = await findTeamById(teamId);
  return team.isLoggedIn;
};

export const setLogInStatus = async (teamId: string) => {
  const isLoggedIn = await getLogInStatus(teamId);
  if (isLoggedIn) return;
  return teamRepository
    .createQueryBuilder()
    .update()
    .set({
      isLoggedIn: true,
    })
    .where("id = :teamId", { teamId })
    .execute();
};

export const getRound1Status = async (teamId: string) => {
  const team = await findTeamById(teamId);
  return team.round1Cleared;
};

export const getRound2Status = async (teamId: string) => {
  const team = await findTeamById(teamId);
  return team.character;
};

export const setRound2Status = async (
  teamId: string,
  character: string | null
) => {
  return teamRepository
    .createQueryBuilder()
    .update()
    .set({
      character: `${character}`,
    })
    .where("id = :teamId", { teamId })
    .execute();
};

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
    .select(["team.id", "team.name", "team.sherlock", "team.watson"])
    .leftJoinAndSelect("team.score", "score")
    .leftJoinAndSelect("team.time", "time")
    .getMany();
};

export const getCharacter = async (kid: string, teamId: string) => {
  const team = await findTeamById(teamId);
  if (kid === team.sherlock)
    return {
      isSherlock: true,
      isWatson: false,
    };
  else
    return {
      isSherlock: false,
      isWatson: true,
    };
};

export const checkIfUserExists = async (kid: string) => {
  const team = await teamRepository
    .createQueryBuilder("team")
    .where("team.sherlock = :kid OR team.watson = :kid", { kid })
    .getCount();
  return team ? true : false;
};
