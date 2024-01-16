const bcrpyt = require("bcryptjs");

/* HASH PASSWORD */
const hash = async (password) => {
  let salt = await bcrpyt.genSalt(10);
  let hashedPassword = await bcrpyt.hash(password, salt);
  return hashedPassword;
};

/* VERIFY PASSWORD */
const verify = async (password, hashedPassword) => {
  let isMatch = await bcrpyt.compare(password, hashedPassword);
  return isMatch;
};

/* COMPARE ANSWER */
const compareAnswer = (submission, answer) => {
  const normalisedSubmission = submission.replace(/[ ]/g, "").toLowerCase();
  const normalisedAnswer = answer.replace(/[ ]/g, "").toLowerCase();
  return normalisedSubmission === normalisedAnswer;
};

module.exports = {
  compareAnswer,
  hash,
  verify,
};
