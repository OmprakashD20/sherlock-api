import { DataSource } from "typeorm";

import { Clues, Question, Score, Team, Time } from "@/models";

const AppDataSource = new DataSource({
  type: "postgres",
  // host: process.env.DATABASE_HOST,
  // port: parseInt(process.env.DATABASE_PORT),
  // username: process.env.DATABASE_USERNAME,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_NAME,
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Clues, Score, Team, Time, Question],
  logging: ["error"],
  synchronize: true,
});

export default AppDataSource;
