const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("Database connection successful!!");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

module.exports = prisma;
