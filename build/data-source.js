"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var models_1 = require("@/models");
var AppDataSource = new typeorm_1.DataSource({
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
    entities: [models_1.Clues, models_1.Score, models_1.Team, models_1.Time, models_1.Question],
    logging: ["error"],
    synchronize: false,
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map