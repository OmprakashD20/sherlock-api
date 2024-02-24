"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authRouter = express_1.default.Router();
//controllers
var controllers_1 = require("@/controllers");
//validators
var validators_1 = require("@/validators");
//POST - sign up
authRouter.post("/sign-up", (0, validators_1.validate)(validators_1.SignUpSchema), controllers_1.signUpController);
//POST - sign in
authRouter.post("/sign-in", (0, validators_1.validate)(validators_1.SignInSchema), controllers_1.signInController);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map