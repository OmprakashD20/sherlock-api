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
var sherlockRouter = express_1.default.Router();
sherlockRouter.use(middlewares_1.verifyToken);
sherlockRouter.use(middlewares_1.verifySherlock);
sherlockRouter.use(middlewares_1.checkSherlockLastQuestion);
// round 1
//GET - get questions
sherlockRouter.get("/round1/:qn", (0, validators_1.validate)(validators_1.QnSchema), controllers_1.getSherlockRound1Question);
//GET - get clues
sherlockRouter.get("/round1/:qn/clue", (0, validators_1.validate)(validators_1.QnSchema), controllers_1.getSherlockRound1Clue);
//POST - submit answers
sherlockRouter.post("/round1/:qn", (0, validators_1.validate)(validators_1.AnswerSchema), controllers_1.submitSherlockRound1Answer);
exports.default = sherlockRouter;
//# sourceMappingURL=sherlock.route.js.map