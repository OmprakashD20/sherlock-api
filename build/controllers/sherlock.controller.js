"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSherlockRound1Answer = exports.getSherlockRound1Clue = exports.getSherlockRound1Question = void 0;
//data
var data_1 = require("@/data");
//utils
var utils_1 = require("@/utils");
var services_1 = require("@/services");
//sherlock round 1 controllers
var getSherlockRound1Question = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var qn, attemptsRemaining, currentQn, _a, question, attemptsRemaining_1, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                qn = req.params.qn;
                return [4 /*yield*/, (0, services_1.getSherlockRemainingAttempts)(res.locals.teamId, parseInt(qn))];
            case 1:
                attemptsRemaining = _b.sent();
                if (attemptsRemaining === 0)
                    return [2 /*return*/, res.status(403).json({
                            error: "You have exceeded the maximum number of attempts for this case!!",
                        })];
                //check if the game is over
                if (parseInt(qn) > data_1.sherlockData.length)
                    return [2 /*return*/, res.status(409).json({
                            error: "No more cases, Game Over!!",
                        })];
                return [4 /*yield*/, (0, services_1.getSherlockCurrentQuestion)(res.locals.teamId)];
            case 2:
                currentQn = (_b.sent()) + 1;
                if (currentQn !== parseInt(qn))
                    return [2 /*return*/, res.status(403).json({
                            error: currentQn > parseInt(qn)
                                ? "You have already attempted this case!!"
                                : "You can only attempt cases in sequence!!",
                        })];
                if (!data_1.sherlockData[parseInt(qn) - 1]) return [3 /*break*/, 8];
                _a = parseInt(qn) === 1;
                if (!_a) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, services_1.isSherlockTimerStarted)(res.locals.teamId)];
            case 3:
                _a = !(_b.sent());
                _b.label = 4;
            case 4:
                if (!_a) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, services_1.startSherlockTimer)(res.locals.teamId)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                question = data_1.sherlockData[parseInt(qn) - 1];
                return [4 /*yield*/, (0, services_1.getSherlockRemainingAttempts)(res.locals.teamId, parseInt(qn))];
            case 7:
                attemptsRemaining_1 = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        question: question.question,
                        attemptsRemaining: attemptsRemaining_1,
                        assets: question.asset,
                    })];
            case 8: return [2 /*return*/, res.status(404).json({
                    error: "Case not found!!",
                })];
            case 9:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.getSherlockRound1Question = getSherlockRound1Question;
var getSherlockRound1Clue = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var qn, attemptsRemaining, currentQn, lastClueUsedBySherlock, data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                qn = req.params.qn;
                return [4 /*yield*/, (0, services_1.getSherlockRemainingAttempts)(res.locals.teamId, parseInt(qn))];
            case 1:
                attemptsRemaining = _a.sent();
                if (attemptsRemaining === 0)
                    return [2 /*return*/, res.status(403).json({
                            error: "You have exceeded the maximum number of attempts for this case!!",
                        })];
                //check if the game is over
                if (parseInt(qn) > data_1.sherlockData.length)
                    return [2 /*return*/, res.status(409).json({
                            error: "No more cases, Game Over!!",
                        })];
                //check if the question number is valid
                if (!data_1.sherlockData[parseInt(qn) - 1])
                    return [2 /*return*/, res.status(404).json({ error: "Case not found!!" })];
                return [4 /*yield*/, (0, services_1.getSherlockCurrentQuestion)(res.locals.teamId)];
            case 2:
                currentQn = (_a.sent()) + 1;
                if (currentQn !== parseInt(qn))
                    return [2 /*return*/, res.status(403).json({
                            error: "You can only request clue for the current case!!",
                        })];
                return [4 /*yield*/, (0, services_1.getLastClueUsedBySherlock)(res.locals.teamId)];
            case 3:
                lastClueUsedBySherlock = _a.sent();
                //check if the clue has already been used
                if (parseInt(qn) === lastClueUsedBySherlock)
                    return [2 /*return*/, res.status(410).json({
                            error: "Use your brain!!. Why do you need a clue for the same case again!!",
                        })];
                data = data_1.sherlockData[parseInt(qn) - 1];
                //set the last clue used by sherlock as the current question
                return [4 /*yield*/, (0, services_1.setLastClueUsedBySherlock)(res.locals.teamId, parseInt(qn))];
            case 4:
                //set the last clue used by sherlock as the current question
                _a.sent();
                //deduct 5 points from his/her score
                return [4 /*yield*/, (0, services_1.updateSherlockScore)(res.locals.teamId, -5)];
            case 5:
                //deduct 5 points from his/her score
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        question: data.question,
                        clue: data.clue,
                        message: "Use your clue wisely!!. Your score has been deducted by 5 points!!",
                    })];
            case 6:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getSherlockRound1Clue = getSherlockRound1Clue;
var submitSherlockRound1Answer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var qn, answer, attemptsRemaining, currentQn, isPenultimateQn, isGameOver, _a, sherlockStartTime, sherlockEndTime, startTime, endTime, _b, hours, minutes, seconds, attemptsRemaining_2, isPenultimateQn, isGameOver, _c, sherlockStartTime, sherlockEndTime, startTime, endTime, _d, hours, minutes, seconds, err_3;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 27, , 28]);
                qn = req.params.qn;
                answer = req.body.answer;
                return [4 /*yield*/, (0, services_1.getSherlockRemainingAttempts)(res.locals.teamId, parseInt(qn))];
            case 1:
                attemptsRemaining = _e.sent();
                if (attemptsRemaining === 0)
                    return [2 /*return*/, res.status(403).json({
                            error: "You have exceeded the maximum number of attempts for this case!!",
                        })];
                //check if the game is over
                if (parseInt(qn) > data_1.sherlockData.length)
                    return [2 /*return*/, res.status(409).json({
                            error: "No more cases, Relax!!",
                        })];
                return [4 /*yield*/, (0, services_1.getSherlockCurrentQuestion)(res.locals.teamId)];
            case 2:
                currentQn = (_e.sent()) + 1;
                if (currentQn !== parseInt(qn))
                    return [2 /*return*/, res.status(403).json({
                            error: currentQn > parseInt(qn)
                                ? "You have already answered this case!!"
                                : "You can only answer the cases in sequence!!",
                        })];
                //check if the question exists
                if (!data_1.sherlockData[parseInt(qn) - 1])
                    return [2 /*return*/, res.status(404).json({
                            error: "Case not found!!",
                        })];
                if (!(0, utils_1.compareAnswer)(answer, data_1.sherlockData[parseInt(qn) - 1].answer)) return [3 /*break*/, 13];
                //update his/her score by 10 points
                return [4 /*yield*/, (0, services_1.updateSherlockScore)(res.locals.teamId, 10)];
            case 3:
                //update his/her score by 10 points
                _e.sent();
                //set the current answered question
                return [4 /*yield*/, (0, services_1.setSherlockCurrentQuestion)(res.locals.teamId, parseInt(qn))];
            case 4:
                //set the current answered question
                _e.sent();
                isPenultimateQn = parseInt(qn) === data_1.sherlockData.length - 1;
                if (!isPenultimateQn) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, services_1.setSherlockStatus)(res.locals.teamId)];
            case 5:
                _e.sent();
                _e.label = 6;
            case 6:
                isGameOver = parseInt(qn) === data_1.sherlockData.length;
                if (!isGameOver) return [3 /*break*/, 12];
                //end the timer
                return [4 /*yield*/, (0, services_1.endSherlockTimer)(res.locals.teamId)];
            case 7:
                //end the timer
                _e.sent();
                //set the current answered question for watson as the last question
                return [4 /*yield*/, (0, services_1.setWatsonCurrentQuestion)(res.locals.teamId, parseInt(qn))];
            case 8:
                //set the current answered question for watson as the last question
                _e.sent();
                return [4 /*yield*/, (0, services_1.getSherlockTiming)(res.locals.teamId)];
            case 9:
                _a = _e.sent(), sherlockStartTime = _a.sherlockStartTime, sherlockEndTime = _a.sherlockEndTime;
                startTime = new Date(sherlockStartTime).getTime();
                endTime = new Date(sherlockEndTime).getTime();
                _b = (0, utils_1.calculateTimeTaken)(startTime, endTime), hours = _b.hours, minutes = _b.minutes, seconds = _b.seconds;
                //update the round1 score
                return [4 /*yield*/, (0, services_1.updateRound1ScoreBySherlock)(res.locals.teamId)];
            case 10:
                //update the round1 score
                _e.sent();
                //update the team score
                return [4 /*yield*/, (0, services_1.updateTeamScore)(res.locals.teamId)];
            case 11:
                //update the team score
                _e.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "You have cracked the case!!",
                        remark: "Your score has been incremented by 10 points!!",
                        gameover: isGameOver,
                        time: {
                            time: "You have taken ".concat(hours, " hours, ").concat(minutes, " minutes, ").concat(seconds, " seconds to complete round 1 of the game"),
                            hours: hours,
                            minutes: minutes,
                            seconds: seconds,
                        },
                    })];
            case 12: return [2 /*return*/, res.status(200).json({
                    message: "You have cracked the case!!",
                    remark: "Your score has been incremented by 10 points!!",
                    gameover: isGameOver,
                    isPenultimateQn: isPenultimateQn,
                })];
            case 13: return [4 /*yield*/, (0, services_1.getSherlockRemainingAttempts)(res.locals.teamId, parseInt(qn))];
            case 14:
                attemptsRemaining_2 = _e.sent();
                return [4 /*yield*/, (0, services_1.setSherlockRemainingAttempts)(res.locals.teamId, parseInt(qn), attemptsRemaining_2 - 1)];
            case 15:
                _e.sent();
                if (!(attemptsRemaining_2 - 1 === 0)) return [3 /*break*/, 17];
                return [4 /*yield*/, (0, services_1.setSherlockCurrentQuestion)(res.locals.teamId, parseInt(qn))];
            case 16:
                _e.sent();
                _e.label = 17;
            case 17:
                isPenultimateQn = parseInt(qn) === data_1.sherlockData.length - 1;
                if (!isPenultimateQn) return [3 /*break*/, 19];
                return [4 /*yield*/, (0, services_1.setSherlockStatus)(res.locals.teamId)];
            case 18:
                _e.sent();
                _e.label = 19;
            case 19:
                isGameOver = parseInt(qn) === data_1.sherlockData.length;
                if (!(isGameOver && attemptsRemaining_2 - 1 === 0)) return [3 /*break*/, 25];
                //end the timer
                return [4 /*yield*/, (0, services_1.endSherlockTimer)(res.locals.teamId)];
            case 20:
                //end the timer
                _e.sent();
                //set the current answered question for watson as the last question
                return [4 /*yield*/, (0, services_1.setWatsonCurrentQuestion)(res.locals.teamId, parseInt(qn))];
            case 21:
                //set the current answered question for watson as the last question
                _e.sent();
                return [4 /*yield*/, (0, services_1.getSherlockTiming)(res.locals.teamId)];
            case 22:
                _c = _e.sent(), sherlockStartTime = _c.sherlockStartTime, sherlockEndTime = _c.sherlockEndTime;
                startTime = new Date(sherlockStartTime).getTime();
                endTime = new Date(sherlockEndTime).getTime();
                _d = (0, utils_1.calculateTimeTaken)(startTime, endTime), hours = _d.hours, minutes = _d.minutes, seconds = _d.seconds;
                //update the round1 score
                return [4 /*yield*/, (0, services_1.updateRound1ScoreBySherlock)(res.locals.teamId)];
            case 23:
                //update the round1 score
                _e.sent();
                //update the team score
                return [4 /*yield*/, (0, services_1.updateTeamScore)(res.locals.teamId)];
            case 24:
                //update the team score
                _e.sent();
                return [2 /*return*/, res.status(400).json({
                        error: "Wrong Answer!!",
                        remark: "Better luck next time!!",
                        gameover: isGameOver,
                        time: {
                            time: "You have taken ".concat(hours, " hours, ").concat(minutes, " minutes, ").concat(seconds, " seconds to complete round 1 of the game"),
                            hours: hours,
                            minutes: minutes,
                            seconds: seconds,
                        },
                    })];
            case 25: return [2 /*return*/, res.status(400).json({
                    error: "Wrong Answer!!",
                    remark: "Better luck next time!!",
                    attemptsRemaining: attemptsRemaining_2 - 1,
                })];
            case 26: return [3 /*break*/, 28];
            case 27:
                err_3 = _e.sent();
                console.error(err_3);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 28];
            case 28: return [2 /*return*/];
        }
    });
}); };
exports.submitSherlockRound1Answer = submitSherlockRound1Answer;
//# sourceMappingURL=sherlock.controller.js.map