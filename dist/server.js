"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./app/config/db"));
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const auth_route_1 = __importDefault(require("./app/modules/auth/auth.route"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const parcel_route_1 = __importDefault(require("./app/modules/parcel/parcel.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//connected database
(0, db_1.default)();
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//root route
app.get("/", (req, res) => {
    res.send("Parcel Server Is Running.");
});
//application route
app.use('/api/v1/user', user_route_1.default);
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/parcel', parcel_route_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
app.listen(port, () => {
    console.log("Sever is running on port", port);
});
