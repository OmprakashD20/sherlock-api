const prisma = require("../prisma/prisma");

const getUser = async (kid) => {
  const user = await prisma.user.findUnique({
    where: {
      kid: kid,
    },
  });
  return user;
};

module.exports = { getUser };
