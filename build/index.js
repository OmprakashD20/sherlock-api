"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
require("./paths");
var data_source_1 = __importDefault(require("@/data-source"));
var routes_1 = __importDefault(require("@/routes"));
data_source_1.default.initialize()
    .then(function () {
    console.log("✅ Database connected successfully!!");
    var app = (0, express_1.default)();
    //middlewares
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }));
    app.disable("x-powered-by");
    app.use(express_1.default.json());
    app.get("/", function (req, res) {
        res.status(200).json({ message: "Backend for Sherlock '24!!" });
    });
    //api routes
    app.use("/api", routes_1.default);
    //404 handler
    app.all("*", function (req, res) {
        res.status(404).json({ message: "Route not found" });
    });
    app.listen(process.env.PORT, function () {
        console.log("\u2705 Server listing on port ".concat(process.env.PORT));
    });
})
    .catch(function () {
    console.error("❌ Database connection failed");
});
//# sourceMappingURL=index.js.map