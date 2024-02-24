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
exports.getTimingDetailsByTeamId = exports.getRound2Timing = exports.isRound2TimerStarted = exports.endRound2Timer = exports.startRound2Timer = exports.getWatsonTiming = exports.getSherlockTiming = exports.isWatsonTimerStarted = exports.endWatsonTimer = exports.startWatsonTimer = exports.isSherlockTimerStarted = exports.endSherlockTimer = exports.startSherlockTimer = exports.timeRepository = void 0;
var data_source_1 = __importDefault(require("@/data-source"));
var models_1 = require("@/models");
exports.timeRepository = data_source_1.default.getRepository(models_1.Time);
var startSherlockTimer = function (teamId) {
    return exports.timeRepository
        .createQueryBuilder()
        .update()
        .set({ sherlockStartTime: new Date() })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.startSherlockTimer = startSherlockTimer;
var endSherlockTimer = function (teamId) {
    return exports.timeRepository
        .createQueryBuilder()
        .update()
        .set({ sherlockEndTime: new Date() })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.endSherlockTimer = endSherlockTimer;
var isSherlockTimerStarted = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var timings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.timeRepository
                    .createQueryBuilder("time")
                    .where("time.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                timings = _a.sent();
                return [2 /*return*/, timings.sherlockStartTime !== null];
        }
    });
}); };
exports.isSherlockTimerStarted = isSherlockTimerStarted;
var startWatsonTimer = function (teamId) {
    return exports.timeRepository
        .createQueryBuilder()
        .update()
        .set({ watsonStartTime: new Date() })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.startWatsonTimer = startWatsonTimer;
var endWatsonTimer = function (teamId) {
    return exports.timeRepository
        .createQueryBuilder()
        .update()
        .set({ watsonEndTime: new Date() })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.endWatsonTimer = endWatsonTimer;
var isWatsonTimerStarted = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var timings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.timeRepository
                    .createQueryBuilder("time")
                    .where("time.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                timings = _a.sent();
                return [2 /*return*/, timings.watsonStartTime !== null];
        }
    });
}); };
exports.isWatsonTimerStarted = isWatsonTimerStarted;
var getSherlockTiming = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var timings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.timeRepository
                    .createQueryBuilder("time")
                    .where("time.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                timings = _a.sent();
                return [2 /*return*/, {
                        sherlockStartTime: timings.sherlockStartTime,
                        sherlockEndTime: timings.sherlockEndTime,
                    }];
        }
    });
}); };
exports.getSherlockTiming = getSherlockTiming;
var getWatsonTiming = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var timings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.timeRepository
                    .createQueryBuilder("time")
                    .where("time.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                timings = _a.sent();
                return [2 /*return*/, {
                        watsonStartTime: timings.watsonStartTime,
                        watsonEndTime: timings.watsonEndTime,
                    }];
        }
    });
}); };
exports.getWatsonTiming = getWatsonTiming;
var startRound2Timer = function (teamId) {
    return exports.timeRepository
        .createQueryBuilder()
        .update()
        .set({ round2StartTime: new Date() })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.startRound2Timer = startRound2Timer;
var endRound2Timer = function (teamId) {
    return exports.timeRepository
        .createQueryBuilder()
        .update()
        .set({ round2EndTime: new Date() })
        .where("teamId = :teamId", { teamId: teamId })
        .execute();
};
exports.endRound2Timer = endRound2Timer;
var isRound2TimerStarted = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var timings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.timeRepository
                    .createQueryBuilder("time")
                    .where("time.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                timings = _a.sent();
                return [2 /*return*/, timings.round2StartTime !== null];
        }
    });
}); };
exports.isRound2TimerStarted = isRound2TimerStarted;
var getRound2Timing = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var timings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.timeRepository
                    .createQueryBuilder("time")
                    .where("time.teamId = :teamId", { teamId: teamId })
                    .getOne()];
            case 1:
                timings = _a.sent();
                return [2 /*return*/, {
                        round2StartTime: timings.round2StartTime,
                        round2EndTime: timings.round2EndTime,
                    }];
        }
    });
}); };
exports.getRound2Timing = getRound2Timing;
var getTimingDetailsByTeamId = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, exports.timeRepository
                .createQueryBuilder("time")
                .where("time.teamId = :teamId", { teamId: teamId })
                .getOne()];
    });
}); };
exports.getTimingDetailsByTeamId = getTimingDetailsByTeamId;
//# sourceMappingURL=time.service.js.map