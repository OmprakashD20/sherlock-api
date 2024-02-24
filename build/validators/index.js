"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var zod_1 = require("zod");
var validate = function (schema) {
    return function (req, res, next) {
        try {
            schema.parse({
                params: req.params,
                body: req.body,
            });
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError)
                return res.status(422).json({
                    error: err.errors[0].message,
                });
            res.status(422).json({
                error: err.message,
            });
        }
    };
};
exports.validate = validate;
__exportStar(require("./user.validator"), exports);
__exportStar(require("./team.validator"), exports);
//# sourceMappingURL=index.js.map