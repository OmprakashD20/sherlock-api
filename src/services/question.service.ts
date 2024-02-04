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
