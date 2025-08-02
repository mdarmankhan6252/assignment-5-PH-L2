"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parcel_interface_1 = require("./parcel.interface");
const parcelSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pickupAddress: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    currentStatus: {
        type: String,
        enum: Object.values(parcel_interface_1.ParcelStatus),
        default: parcel_interface_1.ParcelStatus.REQUESTED
    },
    weight: {
        type: Number,
        required: true
    },
    deliveryDate: {
        type: Date
    }
}, {
    timestamps: true
});
const Parcel = (0, mongoose_1.model)("Parcel", parcelSchema);
exports.default = Parcel;
