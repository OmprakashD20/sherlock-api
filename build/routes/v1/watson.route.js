"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//controllers
var controllers_1 = require("@/controllers");
//middleware
var middlewares_1 = require("@/middlewares");
//validators
var validators_1 = require("@/validators");
var watsonRouter = express_1.default.Router();
watsonRouter.use(middlewares_1.verifyToken);
watsonRouter.use(middlewares_1.verifyWatson);
watsonRouter.use(middlewares_1.checkWatsonLastQuestion);
// round 1
//GET - get questions
watsonRouter.get("/round1/:qn", (0, validators_1.validate)(validators_1.QnSchema), controllers_1.getWatsonRound1Question);
//GET - get clues
watsonRouter.get("/round1/:qn/clue", (0, validators_1.validate)(validators_1.QnSchema), controllers_1.getWatsonRound1Clue);
//POST - submit answers
watsonRouter.post("/round1/:qn", (0, validators_1.validate)(validators_1.AnswerSchema), controllers_1.submitWatsonRound1Answer);
exports.default = watsonRouter;
//# sourceMappingURL=watson.route.js.map