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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = require("../../utils/sendResponse");
const jwt_1 = require("../../utils/jwt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userServices.createUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "User created successfully!",
        data: user
    });
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const verifiedToken = (0, jwt_1.verifyToken)(token, process.env.JWT_SECRET);
    const payload = req.body;
    const user = yield user_service_1.userServices.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Updated successfully!",
        data: user
    });
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All Users retrieved successfully!",
        data: result.data,
        meta: result.meta
    });
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    updateUser
};
