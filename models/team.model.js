const prisma = require("../prisma/prisma");

const TEAM_SELECT_FIELDS = {
  id: true,
  name: true,
  sherlock: true,
  Sherlock: true,
  watson: true,
  Watson: true,
  password: false,
};

const createTeam = async (name, hashedPassword, sherlockId, watsonId) => {
  const existingTeam = await prisma.team.findUnique({
    where: {
      name,
    },
  });

  //check if team exists
  if (existingTeam) return null;

  const team = await prisma.team.create({
    data: {
      name,
      password: hashedPassword,
      Sherlock: {
        connect: {
          kid: sherlockId,
        },
      },
      Watson: {
        connect: {
          kid: watsonId,
        },
      },
    },
    select: {
      ...TEAM_SELECT_FIELDS,
    },
  });
  return team;
};

const getTeam = async (name) => {
  const team = await prisma.team.findUnique({
    where: {
      name,
    },
    include: {
      Sherlock: true,
      Watson: true,
    },
  });
  return team;
};

module.exports = { createTeam, getTeam };
