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
exports.signInController = exports.signUpController = void 0;
//utils
var utils_1 = require("@/utils");
//services
var services_1 = require("@/services");
var signUpController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, password, sherlock, watson, sherlockMail, watsonMail, hashedPassword, newTeam, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, name = _a.name, password = _a.password, sherlock = _a.sherlock, watson = _a.watson, sherlockMail = _a.sherlockMail, watsonMail = _a.watsonMail;
                return [4 /*yield*/, (0, services_1.findTeamByName)(name.toLowerCase())];
            case 1:
                //check if team already exists
                if (_b.sent())
                    return [2 /*return*/, res.status(400).json({
                            error: "Team with this name is already investigating the case!!",
                        })];
                return [4 /*yield*/, (0, services_1.checkIfUserExists)(sherlock)];
            case 2:
                if (_b.sent())
                    return [2 /*return*/, res.status(400).json({
                            error: "Sherlock, you are already investigating the case!!",
                        })];
                return [4 /*yield*/, (0, services_1.checkIfUserExists)(watson)];
            case 3:
                if (_b.sent())
                    return [2 /*return*/, res.status(400).json({
                            error: "Watson, you are already investigating the case!!",
                        })];
                return [4 /*yield*/, (0, utils_1.hashData)(password)];
            case 4:
                hashedPassword = _b.sent();
                return [4 /*yield*/, (0, services_1.createNewTeam)({
                        name: name.toLowerCase(),
                        password: hashedPassword,
                        sherlock: sherlock,
                        watson: watson,
                        sherlockMail: sherlockMail,
                        watsonMail: watsonMail,
                    })];
            case 5:
                newTeam = _b.sent();
                if (!newTeam)
                    return [2 /*return*/, res.status(500).json({
                            error: "Internal Server Error!!",
                        })];
                res.status(201).json({
                    message: "Start investigating the case!!",
                });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signUpController = signUpController;
var signInController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, kid, character, team, isPasswordValid, token, currentQn, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, kid = _a.kid, character = _a.character;
                return [4 /*yield*/, (0, services_1.findTeamByName)(name.toLowerCase())];
            case 1:
                team = _b.sent();
                if (!team)
                    return [2 /*return*/, res.status(404).json({
                            error: "You are not investigating the case!!",
                        })];
                return [4 /*yield*/, (0, utils_1.verifyData)(password, team.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid)
                    return [2 /*return*/, res.status(401).json({
                            error: "Invalid password!!",
                        })];
                if (!(character === "sherlock")) return [3 /*break*/, 4];
                if (!team.sherlock || team.sherlock !== kid)
                    return [2 /*return*/, res.status(401).json({
                            error: "Invalid character!!",
                        })];
                if (team.sherlockMail !== email)
                    return [2 /*return*/, res.status(401).json({
                            error: "Invalid email!!",
                        })];
                return [4 /*yield*/, (0, services_1.setLogInStatus)(team.id)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!(character === "watson")) return [3 /*break*/, 6];
                if (!team.watson || team.watson !== kid)
                    return [2 /*return*/, res.status(401).json({
                            error: "Invalid character!!",
                        })];
                if (team.watsonMail !== email)
                    return [2 /*return*/, res.status(401).json({
                            error: "Invalid email!!",
                        })];
                return [4 /*yield*/, (0, services_1.setLogInStatus)(team.id)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                token = (0, utils_1.createJWT)(kid, team.id, email);
                currentQn = 1;
                if (!(character === "sherlock")) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, services_1.getSherlockCurrentQuestion)(team.id)];
            case 7:
                currentQn = _b.sent();
                _b.label = 8;
            case 8:
                if (!(character === "watson")) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, services_1.getWatsonCurrentQuestion)(team.id)];
            case 9:
                currentQn = _b.sent();
                _b.label = 10;
            case 10:
                res.status(200).json({
                    message: "Good luck on your case, ".concat(character[0].toUpperCase()).concat(character.slice(1), "!!"),
                    token: token,
                    name: team.name,
                    character: character,
                    email: email,
                    kid: kid,
                    currentQn: currentQn + 1,
                });
                return [3 /*break*/, 12];
            case 11:
                err_2 = _b.sent();
                console.error(err_2);
                res.status(500).json({
                    error: "Internal Server Error!!",
                });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.signInController = signInController;
//# sourceMappingURL=auth.controller.js.map