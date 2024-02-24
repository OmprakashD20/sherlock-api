"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var v1Router = express_1.default.Router();
var auth_route_1 = __importDefault(require("./auth.route"));
var sherlock_route_1 = __importDefault(require("./sherlock.route"));
var watson_route_1 = __importDefault(require("./watson.route"));
var team_route_1 = __importDefault(require("./team.route"));
var round2_route_1 = __importDefault(require("./round2.route"));
v1Router.get("/", function (req, res) {
    res.status(200).json({ message: "You hit the v1 API route" });
});
v1Router.use("/", auth_route_1.default);
v1Router.use("/sherlock", sherlock_route_1.default);
v1Router.use("/watson", watson_route_1.default);
v1Router.use("/round2", round2_route_1.default);
v1Router.use("/team", team_route_1.default);
exports.default = v1Router;
//# sourceMappingURL=index.js.map