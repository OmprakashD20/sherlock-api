import AppDataSource from "@/data-source";

import { Team } from "@/models";

export const teamRepository = AppDataSource.getRepository(Team);

export const findTeamByName = async (name: string) => {
  return await teamRepository.findOneBy({
    name,
  });
};

export const findTeamById = async (teamId: string) => {
  return await teamRepository.findOneBy({
    id: teamId,
  });
};

export const createNewTeam = async (data: Partial<Team>) => {
  const team = new Team();
  Object.assign(team, {
    name: data.name,
    password: data.password,
    sherlock: data.sherlock,
    watson: data.watson,
  });

  return await teamRepository.save(team);
};
