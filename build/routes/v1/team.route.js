"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//middleware
var middlewares_1 = require("@/middlewares");
//controllers
var controllers_1 = require("@/controllers");
var teamRouter = express_1.default.Router();
teamRouter.use(middlewares_1.verifyToken);
//GET -get team details
teamRouter.get("/details", controllers_1.getTeamDetails);
//GET - get character details
teamRouter.get("/character", controllers_1.getCharacterDetails);
//GET - leaderboard
teamRouter.get("/leaderboard", controllers_1.getRound1Leaderboard);
exports.default = teamRouter;
//# sourceMappingURL=team.route.js.map