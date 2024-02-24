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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
var z = __importStar(require("zod"));
//schema for validating the request body of /sign-up endpoint
exports.SignUpSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Team name is required",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters long",
        }),
        sherlock: z.string().length(8, {
            message: "Your K! ID must be 8 characters long",
        }),
        watson: z.string().length(8, {
            message: "Your K! ID must be 8 characters long",
        }),
        sherlockMail: z
            .string({
            required_error: "Email is required",
        })
            .email({
            message: "Invalid email address",
        }),
        watsonMail: z
            .string({
            required_error: "Email is required",
        })
            .email({
            message: "Invalid email address",
        }),
    }),
});
//schema for validating the request body of /sign-in endpoint
exports.SignInSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Team name is required",
        }),
        email: z
            .string({
            required_error: "Email is required",
        })
            .email({
            message: "Invalid email address",
        }),
        password: z.string(),
        kid: z.string().length(8, {
            message: "Your K! ID must be 8 characters long",
        }),
        character: z.enum(["sherlock", "watson"]),
    }),
});
//schema for validating the request body of /team/character endpoint
exports.CharacterSchema = z.object({
    query: z.object({
        character: z.enum(["sherlock", "watson"]),
    }),
});
//# sourceMappingURL=user.validator.js.map