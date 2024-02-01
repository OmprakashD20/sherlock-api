import { genSalt, compare, hash } from "bcryptjs";

//hash password
export const hashData = async (data: string) => {
  let salt = await genSalt(10);
  return await hash(data, salt);
};

//verify password
export const verifyData = async (data: string, hashedData: string) => {
  return await compare(data, hashedData);
};

//compare answers
export const compareAnswer = (submission: string, answer: string) => {
  const normalizedSubmission = submission.replace(/[]/g, "").toLowerCase();
  const normalizedAnswer = answer.replace(/[]/g, "").toLowerCase();

  return normalizedSubmission === normalizedAnswer;
};
