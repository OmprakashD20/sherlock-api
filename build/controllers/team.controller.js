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
exports.getRound2Leaderboard = exports.getRound1Leaderboard = exports.getTeamDetails = exports.getCharacterDetails = void 0;
//services
var services_1 = require("@/services");
//utils
var utils_1 = require("@/utils");
var getCharacterDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var character, team, currentQn, currentQn, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                character = req.query.character;
                return [4 /*yield*/, (0, services_1.findTeamById)(res.locals.teamId)];
            case 1:
                team = _a.sent();
                if (!(character === "sherlock")) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, services_1.getSherlockCurrentQuestion)(res.locals.teamId)];
            case 2:
                currentQn = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        name: team.name,
                        character: "sherlock",
                        sherlock: team.sherlock,
                        watson: team.watson,
                        currentQn: currentQn + 1,
                    })];
            case 3:
                if (!(character === "watson")) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, services_1.getWatsonCurrentQuestion)(res.locals.teamId)];
            case 4:
                currentQn = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        name: team.name,
                        character: "watson",
                        sherlock: team.sherlock,
                        watson: team.watson,
                        currentQn: currentQn + 1,
                    })];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getCharacterDetails = getCharacterDetails;
var getTeamDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var team, scores, sherlockTiming, watsonTiming, timings, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, services_1.findTeamById)(res.locals.teamId)];
            case 1:
                team = _a.sent();
                if (!team)
                    return [2 /*return*/, res.status(404).json({
                            message: "Team doesn't exists",
                        })];
                return [4 /*yield*/, (0, services_1.getScoresByTeamId)(res.locals.teamId)];
            case 2:
                scores = _a.sent();
                sherlockTiming = void 0, watsonTiming = void 0;
                return [4 /*yield*/, (0, services_1.getTimingDetailsByTeamId)(res.locals.teamId)];
            case 3:
                timings = _a.sent();
                if (!timings.sherlockStartTime ||
                    !timings.sherlockEndTime ||
                    !timings.watsonStartTime ||
                    !timings.watsonEndTime) {
                    sherlockTiming = {
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                    };
                    watsonTiming = {
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                    };
                }
                else {
                    sherlockTiming = (0, utils_1.calculateTimeTaken)(timings.sherlockStartTime.getTime(), timings.sherlockEndTime.getTime());
                    watsonTiming = (0, utils_1.calculateTimeTaken)(timings.watsonStartTime.getTime(), timings.watsonEndTime.getTime());
                }
                res.status(200).json({
                    name: team.name,
                    sherlock: team.sherlock,
                    watson: team.watson,
                    isRound1Completed: team.round1Cleared,
                    sherlockScore: scores.sherlockScore,
                    watsonScore: scores.watsonScore,
                    round1Score: scores.round1Score,
                    round2Score: scores.round2Score,
                    teamScore: scores.teamScore,
                    sherlockTiming: sherlockTiming,
                    watsonTiming: watsonTiming,
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getTeamDetails = getTeamDetails;
var getRound1Leaderboard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, position, totalTeams, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, services_1.getLeaderboardDetails)()];
            case 1:
                data = _a.sent();
                data.sort(function (a, b) {
                    if (a.score.round1Score === b.score.round1Score) {
                        //if a team hasn't started the round yet, then their time will be null
                        if (a.time.sherlockStartTime &&
                            a.time.sherlockEndTime &&
                            a.time.watsonStartTime &&
                            a.time.watsonEndTime &&
                            b.time.sherlockStartTime &&
                            b.time.sherlockEndTime &&
                            b.time.watsonStartTime &&
                            b.time.watsonEndTime)
                            return (Math.max(a.time.sherlockEndTime.getTime() -
                                a.time.sherlockStartTime.getTime(), a.time.watsonEndTime.getTime() - a.time.watsonStartTime.getTime()) -
                                Math.max(b.time.sherlockEndTime.getTime() -
                                    b.time.sherlockStartTime.getTime(), b.time.watsonEndTime.getTime() - b.time.watsonStartTime.getTime()));
                        return 0;
                    }
                    return b.score.round1Score - a.score.round1Score;
                });
                position = data.findIndex(function (team) { return team.id === res.locals.teamId; });
                totalTeams = data.length;
                result = data.map(function (team, index) {
                    if (!team.time.sherlockStartTime ||
                        !team.time.sherlockEndTime ||
                        !team.time.watsonStartTime ||
                        !team.time.watsonEndTime)
                        return {
                            id: index + 1,
                            name: team.name,
                            teamScore: team.score.teamScore,
                            timeTaken: {
                                hours: 0,
                                minutes: 0,
                                seconds: 0,
                            },
                        };
                    var sherlockTime = (0, utils_1.calculateTimeTaken)(team.time.sherlockStartTime.getTime(), team.time.sherlockEndTime.getTime());
                    var watsonTime = (0, utils_1.calculateTimeTaken)(team.time.watsonStartTime.getTime(), team.time.watsonEndTime.getTime());
                    var teamTime;
                    if (sherlockTime.hours > watsonTime.hours) {
                        teamTime = sherlockTime;
                    }
                    else if (sherlockTime.hours < watsonTime.hours) {
                        teamTime = watsonTime;
                    }
                    else if (sherlockTime.hours === watsonTime.hours) {
                        if (sherlockTime.minutes > watsonTime.minutes) {
                            teamTime = sherlockTime;
                        }
                        else if (sherlockTime.minutes < watsonTime.minutes) {
                            teamTime = watsonTime;
                        }
                        if (sherlockTime.minutes === watsonTime.minutes) {
                            if (sherlockTime.seconds > watsonTime.seconds) {
                                teamTime = sherlockTime;
                            }
                            else {
                                teamTime = watsonTime;
                            }
                        }
                    }
                    return {
                        id: index + 1,
                        name: team.name,
                        teamScore: team.score.teamScore,
                        timeTaken: teamTime,
                    };
                });
                res.status(200).json({
                    position: position + 1,
                    totalTeams: totalTeams,
                    data: result,
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRound1Leaderboard = getRound1Leaderboard;
//todo: add time taken for round 2
var getRound2Leaderboard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, services_1.getLeaderboardDetails)()];
            case 1:
                data = _a.sent();
                data.sort(function (a, b) {
                    if (a.score.round2Score === b.score.round2Score) {
                        return (a.time.round2EndTime.getTime() - a.time.round2StartTime.getTime());
                    }
                    return b.score.round2Score - a.score.round2Score;
                });
                res.status(200).json(data);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRound2Leaderboard = getRound2Leaderboard;
//# sourceMappingURL=team.controller.js.map