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

module.exports = {
  hash,
  verify,
};
