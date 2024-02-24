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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamScore = exports.updateRound2Score = exports.updateRound1ScoreByWatson = exports.updateRound1ScoreBySherlock = exports.updateWatsonScore = exports.updateSherlockScore = exports.getScoresByTeamId = exports.scoreRepository = void 0;
var data_source_1 = __importDefault(require("@/data-source"));
var models_1 = require("@/models");
exports.scoreRepository = data_source_1.default.getRepository(models_1.Score);
var getScoresByTeamId = function (teamId) {
    return exports.scoreRepository
        .createQueryBuilder("score")
        .where("score.teamId = :teamId", { teamId: teamId })
        .getOne();
};
exports.getScoresByTeamId = getScoresByTeamId;
var updateSherlockScore = function (teamId, score) { return __awaiter(void 0, void 0, void 0, function () {
    var sherlockScore;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.scoreRepository
                    .createQueryBuilder("score")
                    .select("score.sherlockScore")
                    .where("score.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                sherlockScore = (_a.sent()).sherlockScore;
                if (sherlockScore <= 0 && score === -5)
                    score = 0;
                return [2 /*return*/, exports.scoreRepository
                        .createQueryBuilder()
                        .update()
                        .set({
                        sherlockScore: function () { return "sherlockScore + ".concat(score); },
                    })
                        .where("teamId = :teamId", { teamId: teamId })
                        .execute()];
        }
    });
}); };
exports.updateSherlockScore = updateSherlockScore;
var updateWatsonScore = function (teamId, score) { return __awaiter(void 0, void 0, void 0, function () {
    var watsonScore;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.scoreRepository
                    .createQueryBuilder("score")
                    .select("score.watsonScore")
                    .where("score.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                watsonScore = (_a.sent()).watsonScore;
                if (watsonScore <= 0 && score === -5)
                    score = 0;
                return [2 /*return*/, exports.scoreRepository
                        .createQueryBuilder()
                        .update()
                        .set({
                        watsonScore: function () { return "watsonScore + ".concat(score); },
                    })
                        .where("teamId = :teamId", { teamId: teamId })
                        .execute()];
        }
    });
}); };
exports.updateWatsonScore = updateWatsonScore;
var updateRound1ScoreBySherlock = function (teamId) {
    return exports.scoreRepository
        .createQueryBuilder()
        .update()
        .set({
        round1Score: function () { return "round1Score + sherlockScore"; },
    })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.updateRound1ScoreBySherlock = updateRound1ScoreBySherlock;
var updateRound1ScoreByWatson = function (teamId) {
    return exports.scoreRepository
        .createQueryBuilder()
        .update()
        .set({
        round1Score: function () { return "round1Score + watsonScore"; },
    })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.updateRound1ScoreByWatson = updateRound1ScoreByWatson;
var updateRound2Score = function (teamId, score) { return __awaiter(void 0, void 0, void 0, function () {
    var round2Score;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.scoreRepository
                    .createQueryBuilder("score")
                    .select("score.round2Score")
                    .where("score.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                round2Score = (_a.sent()).round2Score;
                if (round2Score <= 0 && score === -5)
                    score = 0;
                return [2 /*return*/, exports.scoreRepository
                        .createQueryBuilder()
                        .update()
                        .set({
                        round2Score: function () { return "round2Score + ".concat(score); },
                    })
                        .where("teamId = :teamId", { teamId: teamId })
                        .execute()];
        }
    });
}); };
exports.updateRound2Score = updateRound2Score;
var updateTeamScore = function (teamId) {
    return exports.scoreRepository
        .createQueryBuilder()
        .update()
        .set({
        teamScore: function () { return "round1Score + round2Score"; },
    })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.updateTeamScore = updateTeamScore;
//# sourceMappingURL=score.service.js.map