"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: String, enum: Object.values(user_interface_1.IsActive), default: user_interface_1.IsActive.ACTIVE },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(user_interface_1.Role), default: user_interface_1.Role.RECEIVER },
    parcelsSent: [{ type: mongoose_1.Types.ObjectId, ref: "Parcel" }],
    parcelsReceived: [{ type: mongoose_1.Types.ObjectId, ref: "Parcel" }]
}, {
    timestamps: true
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
