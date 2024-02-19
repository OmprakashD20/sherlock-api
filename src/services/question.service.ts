import AppDataSource from "@/data-source";

import { Question } from "@/models";

export const questionRepository = AppDataSource.getRepository(Question);

export const getSherlockCurrentQuestion = async (teamId: string) => {
  return (
    await questionRepository
      .createQueryBuilder("question")
      .where("question.teamId = :teamId", { teamId })
      .getOne()
  ).sherlockCurrentQuestion;
};

export const setSherlockCurrentQuestion = (
  teamId: string,
  questionId: number
) => {
  return questionRepository
    .createQueryBuilder()
    .update()
    .set({ sherlockCurrentQuestion: questionId })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const getWatsonCurrentQuestion = async (teamId: string) => {
  return (
    await questionRepository
      .createQueryBuilder("question")
      .where("question.teamId = :teamId", { teamId })
      .getOne()
  ).watsonCurrentQuestion;
};

export const setWatsonCurrentQuestion = (
  teamId: string,
  questionId: number
) => {
  return questionRepository
    .createQueryBuilder()
    .update()
    .set({ watsonCurrentQuestion: questionId })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const getRound2CurrentQuestion = async (teamId: string) => {
  return (
    await questionRepository
      .createQueryBuilder("question")
      .where("question.teamId = :teamId", { teamId })
      .getOne()
  ).round2CurrentQuestion;
};

export const setRound2CurrentQuestion = (
  teamId: string,
  questionId: number
) => {
  return questionRepository
    .createQueryBuilder()
    .update()
    .set({ round2CurrentQuestion: questionId })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const setSherlockStatus = (teamId: string) => {
  return questionRepository
    .createQueryBuilder()
    .update()
    .set({
      isSherlockCompleted: true,
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const setWatsonStatus = (teamId: string) => {
  return questionRepository
    .createQueryBuilder()
    .update()
    .set({
      isWatsonCompleted: true,
    })
    .where("teamId = :teamId", { teamId })
    .execute();
};

export const isSherlockCompleted = async (teamId: string) => {
  return (
    await questionRepository
      .createQueryBuilder("question")
      .where("question.teamId = :teamId", { teamId })
      .getOne()
  ).isSherlockCompleted;
};

export const isWatsonCompleted = async (teamId: string) => {
  return (
    await questionRepository
      .createQueryBuilder("question")
      .where("question.teamId = :teamId", { teamId })
      .getOne()
  ).isWatsonCompleted;
};

export const getSherlockRemainingAttempts = async (
  teamId: string,
  qn: number
) => {
  return (
    await questionRepository
      .createQueryBuilder("question")
      .where("question.teamId = :teamId", { teamId })
      .getOne()
  ).sherlockAttempts[`qn${qn}`];
};

export const setSherlockRemainingAttempts = async (
  teamId: string,
  qn: number,
  attemptsRemaining: number
) => {
  const question = await questionRepository.findOne({
    where: {
      team: {
        id: teamId,
      },
    },
  });
  if (question) {
    question.sherlockAttempts[`qn${qn}`] = attemptsRemaining;
    await questionRepository.save(question);
  }
};

export const getWatsonRemainingAttempts = async (
  teamId: string,
  qn: number
) => {
  return (
    await questionRepository
      .createQueryBuilder("question")
      .where("question.teamId = :teamId", { teamId })
      .getOne()
  ).watsonAttempts[`qn${qn}`];
};

export const setWatsonRemainingAttempts = async (
  teamId: string,
  qn: number,
  attemptsRemaining: number
) => {
  const question = await questionRepository.findOne({
    where: {
      team: {
        id: teamId,
      },
    },
  });
  if (question) {
    question.watsonAttempts[`qn${qn}`] = attemptsRemaining;
    await questionRepository.save(question);
  }
};

export const getRound2RemainingAttempts = async (
  teamId: string,
  qn: number
) => {
  return (
    await questionRepository
      .createQueryBuilder("question")
      .where("question.teamId = :teamId", { teamId })
      .getOne()
  ).round2Attempts[`qn${qn}`];
};

export const setRound2RemainingAttempts = async (
  teamId: string,
  qn: number,
  attemptsRemaining: number
) => {
  const question = await questionRepository.findOne({
    where: {
      team: {
        id: teamId,
      },
    },
  });
  if (question) {
    question.round2Attempts[`qn${qn}`] = attemptsRemaining;
    await questionRepository.save(question);
  }
};
