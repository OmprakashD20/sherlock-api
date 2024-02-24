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
exports.restrictSecondUser = exports.verifyWatson = exports.verifySherlock = void 0;
//services
var services_1 = require("@/services");
var verifySherlock = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sherlock, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, services_1.isSherlock)(res.locals.kid, res.locals.teamId)];
            case 1:
                sherlock = _a.sent();
                if (!sherlock) {
                    return [2 /*return*/, res.status(403).json({
                            error: "You are not the sherlock of your team.",
                        })];
                }
                next();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifySherlock = verifySherlock;
var verifyWatson = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var watson, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, services_1.isWatson)(res.locals.kid, res.locals.teamId)];
            case 1:
                watson = _a.sent();
                if (!watson) {
                    return [2 /*return*/, res.status(403).json({
                            error: "You are not the watson of your team.",
                        })];
                }
                next();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyWatson = verifyWatson;
var restrictSecondUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var teamId, _a, isSherlock_1, isWatson_1, character, userCharacter, isLoggedIn, isLoggedIn, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                teamId = res.locals.teamId;
                return [4 /*yield*/, (0, services_1.getCharacter)(res.locals.kid, teamId)];
            case 1:
                _a = _b.sent(), isSherlock_1 = _a.isSherlock, isWatson_1 = _a.isWatson;
                return [4 /*yield*/, (0, services_1.getRound2Status)(teamId)];
            case 2:
                character = _b.sent();
                if (!!character) return [3 /*break*/, 4];
                userCharacter = isSherlock_1 ? "sherlock" : "watson";
                return [4 /*yield*/, (0, services_1.setRound2Status)(teamId, userCharacter)];
            case 3:
                _b.sent();
                next();
                _b.label = 4;
            case 4:
                if (!isSherlock_1) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, services_1.getLogInStatus)(teamId)];
            case 5:
                isLoggedIn = _b.sent();
                if (isLoggedIn && character !== "sherlock")
                    return [2 /*return*/, res.status(409).json({
                            error: "Oops! Looks like Watson is already in the game.",
                        })];
                _b.label = 6;
            case 6:
                if (!isWatson_1) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, services_1.getLogInStatus)(teamId)];
            case 7:
                isLoggedIn = _b.sent();
                if (isLoggedIn && character !== "watson")
                    return [2 /*return*/, res.status(409).json({
                            error: "Oops! Looks like Sherlock is already in the game.",
                        })];
                _b.label = 8;
            case 8:
                next();
                return [3 /*break*/, 10];
            case 9:
                err_3 = _b.sent();
                console.error(err_3);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.restrictSecondUser = restrictSecondUser;
//# sourceMappingURL=user.middleware.js.map