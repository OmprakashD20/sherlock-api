"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//controllers
var controllers_1 = require("@/controllers");
//middlewares
var middlewares_1 = require("@/middlewares");
//validators
var validators_1 = require("@/validators");
var round2Router = express_1.default.Router();
round2Router.use(middlewares_1.verifyToken);
round2Router.use(middlewares_1.checkRound1Cleared);
round2Router.use(middlewares_1.restrictSecondUser);
// round 2
//GET - get questions
round2Router.get("/:qn", (0, validators_1.validate)(validators_1.QnSchema), controllers_1.getRound2Question);
//GET - get clues
round2Router.get("/:qn/clue", (0, validators_1.validate)(validators_1.QnSchema), controllers_1.getRound2Clue);
//POST - submit answers
round2Router.post("/:qn", (0, validators_1.validate)(validators_1.AnswerSchema), controllers_1.submitRound2Answer);
exports.default = round2Router;
//# sourceMappingURL=round2.route.js.map