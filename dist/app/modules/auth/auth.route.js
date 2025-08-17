"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_controller_1.AuthControllers.loginApi);
authRouter.post('/refresh-token', auth_controller_1.AuthControllers.getNewAccessToken);
authRouter.post('/logout', auth_controller_1.AuthControllers.logout);
exports.default = authRouter;
