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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = __importDefault(require("./user.model"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { JwtPayload } from 'jsonwebtoken';
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const isUserExits = yield user_model_1.default.findOne({ email });
    if (isUserExits) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exist");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_model_1.default.create(Object.assign({ email, password: hashedPassword }, rest));
    return user;
});
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ifUserExist = yield user_model_1.default.findById(userId);
    if (!ifUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.RECEIVER || decodedToken.role === user_interface_1.Role.SENDER) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized");
        }
        if (payload.isActive || payload.isDeleted || payload.isVerified) {
            if (decodedToken.role === user_interface_1.Role.RECEIVER || decodedToken.role === user_interface_1.Role.SENDER) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized!");
            }
        }
        if (payload.password) {
            payload.password = yield bcrypt_1.default.hash(payload.password, 10);
        }
        const newUpdatedUser = yield user_model_1.default.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
        return newUpdatedUser;
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    const totalUsers = yield user_model_1.default.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    return user;
});
exports.userServices = {
    createUser,
    getAllUsers,
    updateUser,
    getSingleUser
};
