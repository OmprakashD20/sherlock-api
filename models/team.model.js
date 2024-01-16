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

/* TEAM */
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

/* SHERLOCK */
const isSherlock = async (teamId, kid) => {
  const isSherlock =
    (await prisma.team.findUnique({
      where: {
        id: teamId,
        Sherlock: { kid },
      },
    })) !== null
      ? true
      : false;
  return isSherlock;
};

const getSherlockLastClue = async (teamId) => {
  const { lastClueSherlock } = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
    select: {
      lastClueSherlock: true,
    },
  });
  return lastClueSherlock;
};

const setSherlockLastClue = async (teamId, lastClueSherlock) => {
  await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      cluesUsedBySherlock: {
        increment: 1,
      },
      lastClueSherlock: parseInt(lastClueSherlock),
      sherlockScore: {
        decrement: 5,
      },
    },
  });
};

const setSherlockScore = async (teamId) => {
  await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      sherlockScore: {
        increment: 10,
      },
    },
  });
};

const startSherlockTimer = async (teamId) => {
  await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      sherlockStartTime: new Date(),
    },
  });
};

const endSherlockTimer = async (teamId) => {
  const sherlockTimings = await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      sherlockEndTime: new Date(),
    },
    select: {
      sherlockStartTime: true,
      sherlockEndTime: true,
    },
  });
  return sherlockTimings;
};

/* WATSON */
const isWatson = async (teamId, kid) => {
  const isWatson =
    (await prisma.team.findUnique({
      where: {
        id: teamId,
        Watson: { kid },
      },
    })) !== null
      ? true
      : false;
  return isWatson;
};

module.exports = {
  createTeam,
  getTeam,
  isSherlock,
  getSherlockLastClue,
  setSherlockLastClue,
  setSherlockScore,
  startSherlockTimer,
  endSherlockTimer,
  isWatson,
};
