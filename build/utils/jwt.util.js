"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createJWT = function (kid, teamId, email) {
    //payload contains the kid of the user who has logged in and the teamId
    var payload = {
        kid: kid,
        teamId: teamId,
        email: email,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 5 * 86400,
        algorithm: "HS256",
    });
};
exports.createJWT = createJWT;
var verifyJWT = function (token) {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });
    }
    catch (err) {
        return null;
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.util.js.map