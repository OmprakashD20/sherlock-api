"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.checkIfUserExists = exports.getCharacter = exports.getLeaderboardDetails = exports.isWatson = exports.isSherlock = exports.createNewTeam = exports.findTeamById = exports.findTeamByName = exports.setRound2Status = exports.getRound2Status = exports.getRound1Status = exports.setLogInStatus = exports.getLogInStatus = exports.teamRepository = void 0;
var data_source_1 = __importDefault(require("@/data-source"));
var models_1 = require("@/models");
exports.teamRepository = data_source_1.default.getRepository(models_1.Team);
var getLogInStatus = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.findTeamById)(teamId)];
            case 1:
                team = _a.sent();
                return [2 /*return*/, team.isLoggedIn];
        }
    });
}); };
exports.getLogInStatus = getLogInStatus;
var setLogInStatus = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var isLoggedIn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getLogInStatus)(teamId)];
            case 1:
                isLoggedIn = _a.sent();
                if (isLoggedIn)
                    return [2 /*return*/];
                return [2 /*return*/, exports.teamRepository
                        .createQueryBuilder()
                        .update()
                        .set({
                        isLoggedIn: true,
                    })
                        .where("id = :teamId", { teamId: teamId })
                        .execute()];
        }
    });
}); };
exports.setLogInStatus = setLogInStatus;
var getRound1Status = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.findTeamById)(teamId)];
            case 1:
                team = _a.sent();
                return [2 /*return*/, team.round1Cleared];
        }
    });
}); };
exports.getRound1Status = getRound1Status;
var getRound2Status = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.findTeamById)(teamId)];
            case 1:
                team = _a.sent();
                return [2 /*return*/, team.character];
        }
    });
}); };
exports.getRound2Status = getRound2Status;
var setRound2Status = function (teamId, character) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, exports.teamRepository
                .createQueryBuilder()
                .update()
                .set({
                character: "".concat(character),
            })
                .where("id = :teamId", { teamId: teamId })
                .execute()];
    });
}); };
exports.setRound2Status = setRound2Status;
var findTeamByName = function (name) {
    return exports.teamRepository
        .createQueryBuilder("team")
        .where("team.name = :name", { name: name })
        .getOne();
};
exports.findTeamByName = findTeamByName;
var findTeamById = function (teamId) {
    return exports.teamRepository
        .createQueryBuilder("team")
        .where("team.id = :id", { id: teamId })
        .getOne();
};
exports.findTeamById = findTeamById;
var createNewTeam = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var team, score, clues, time, question;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                team = new models_1.Team();
                score = new models_1.Score();
                clues = new models_1.Clues();
                time = new models_1.Time();
                question = new models_1.Question();
                Object.assign(team, __assign(__assign({}, data), { score: score, clues: clues, time: time, question: question }));
                return [4 /*yield*/, exports.teamRepository.save(team)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createNewTeam = createNewTeam;
var isSherlock = function (kid, teamId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.findTeamById)(teamId)];
            case 1: return [2 /*return*/, (_a.sent()).sherlock === kid];
        }
    });
}); };
exports.isSherlock = isSherlock;
var isWatson = function (kid, teamId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.findTeamById)(teamId)];
            case 1: return [2 /*return*/, (_a.sent()).watson === kid];
        }
    });
}); };
exports.isWatson = isWatson;
var getLeaderboardDetails = function () {
    return exports.teamRepository
        .createQueryBuilder("team")
        .select(["team.id", "team.name", "team.sherlock", "team.watson"])
        .leftJoinAndSelect("team.score", "score")
        .leftJoinAndSelect("team.time", "time")
        .getMany();
};
exports.getLeaderboardDetails = getLeaderboardDetails;
var getCharacter = function (kid, teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.findTeamById)(teamId)];
            case 1:
                team = _a.sent();
                if (kid === team.sherlock)
                    return [2 /*return*/, {
                            isSherlock: true,
                            isWatson: false,
                        }];
                else
                    return [2 /*return*/, {
                            isSherlock: false,
                            isWatson: true,
                        }];
                return [2 /*return*/];
        }
    });
}); };
exports.getCharacter = getCharacter;
var checkIfUserExists = function (kid) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.teamRepository
                    .createQueryBuilder("team")
                    .where("team.sherlock = :kid OR team.watson = :kid", { kid: kid })
                    .getCount()];
            case 1:
                team = _a.sent();
                return [2 /*return*/, team ? true : false];
        }
    });
}); };
exports.checkIfUserExists = checkIfUserExists;
//# sourceMappingURL=team.service.js.map