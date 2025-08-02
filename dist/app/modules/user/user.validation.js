"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, { message: "Name must be at least 2 character!" })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    email: zod_1.default
        .string()
        .min(2, { message: "Email must be at least 2 character!" })
        .max(50, { message: "Email cannot exceed 50 characters" }),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh"
    })
        .optional(),
    address: zod_1.default
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
});
