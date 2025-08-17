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
exports.ParcelServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const parcel_model_1 = __importDefault(require("./parcel.model"));
const http_status_1 = __importDefault(require("http-status"));
//create a parcel
const createParcel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.default.create(payload);
    return parcel;
});
//update a parcel
const updateParcel = (id, currentStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const existingParcel = yield parcel_model_1.default.findById(id);
    if (!existingParcel) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Parcel is not found");
    }
    const updatedParcel = yield parcel_model_1.default.findByIdAndUpdate(id, { currentStatus }, { new: true });
    return updatedParcel;
});
//delete a parcel
const deleteParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.default.findByIdAndDelete(id);
});
//get all parcels
const getAllParcels = () => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.default
        .find()
        .populate("sender", "name email role")
        .populate("receiver", "name email role");
    return parcels;
});
const getParcelByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.default.findOne({ email });
    return parcel;
});
const getParcelById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.default
        .findById(id)
        .populate("sender")
        .populate("receiver");
    return parcel;
});
exports.ParcelServices = {
    createParcel,
    updateParcel,
    deleteParcel,
    getAllParcels,
    getParcelByEmail,
    getParcelById
};
