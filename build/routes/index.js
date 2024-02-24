"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.status(200).json({ message: "You hit the Sherlock API route" });
});
var v1_1 = __importDefault(require("./v1"));
//v1 routes
router.use("/v1", v1_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map