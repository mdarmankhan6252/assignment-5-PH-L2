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
exports.createNewAccessTokenWithRefreshToken = exports.createUserTokens = void 0;
const user_interface_1 = require("../modules/user/user.interface");
const jwt_1 = require("./jwt");
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createUserTokens = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, process.env.JWT_SECRET, '30d');
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, process.env.JWT_REFRESH_SECRET, '60d');
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserTokens = createUserTokens;
const createNewAccessTokenWithRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedRefreshToken = (0, jwt_1.verifyToken)(refreshToken, process.env.JWT_REFRESH_SECRET);
    const isUserExits = yield user_model_1.default.findOne({ email: verifiedRefreshToken.email });
    if (!isUserExits) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User does not exits");
    }
    if (isUserExits.isActive === user_interface_1.IsActive.BLOCKED || isUserExits.isActive === user_interface_1.IsActive.INACTIVE) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `User is ${isUserExits.isActive}`);
    }
    if (isUserExits.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is deleted");
    }
    const jwtPayload = {
        userId: isUserExits._id,
        email: isUserExits.email,
        role: isUserExits.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, process.env.JWT_REFRESH_SECRET, '30d');
    return accessToken;
});
exports.createNewAccessTokenWithRefreshToken = createNewAccessTokenWithRefreshToken;
