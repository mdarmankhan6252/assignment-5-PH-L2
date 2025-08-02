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
exports.ParcelController = void 0;
const parcel_model_1 = __importDefault(require("./parcel.model"));
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const parcel_service_1 = require("./parcel.service");
const createParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelServices.createParcel(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Parcel Created successfully!",
        data: result
    });
});
// const updateParcelStatus = async (req: Request, res: Response) => {
//    const { id } = req.params;
//    const { status } = req.body;
//    const user = (req as any).user;
//    const parcel = await Parcel.findById(id);
//    if (!parcel) {
//       throw new AppError(httpStatus.NOT_FOUND, "Parcel not found!")
//    }
//    const currentStatus = parcel.currentStatus;
//    if (!parcel) {
//       throw new AppError(httpStatus.NOT_FOUND, "Parcel not found!");
//    }
//    // Ownership checks
//    if (user.role === Role.SENDER && !parcel.sender.equals(user._id)) {
//       throw new AppError(httpStatus.FORBIDDEN, "You can only update your own parcels");
//    }
//    if (user.role === Role.RECEIVER && !parcel.receiver.equals(user._id)) {
//       throw new AppError(httpStatus.FORBIDDEN, "You can only update parcels assigned to you");
//    }
//    // sender logic
//    if (user.role === Role.SENDER) {
//       if (status !== ParcelStatus.CANCELLED) {
//          throw new AppError(httpStatus.FORBIDDEN, "Sender can only cancel the parcel");
//       }
//       if (![ParcelStatus.REQUESTED, ParcelStatus.ACCEPTED].includes(currentStatus)) {
//          throw new AppError(httpStatus.FORBIDDEN, "Parcel can't be canceled at this moment!");
//       }
//    }
//    // receiver logic
//    if (user.role === Role.RECEIVER) {
//       if (status !== ParcelStatus.DELIVERED) {
//          throw new AppError(httpStatus.FORBIDDEN, "Receiver can only mark the parcel as delivered");
//       }
//       if (currentStatus !== ParcelStatus.IN_TRANSIT) {
//          throw new AppError(httpStatus.FORBIDDEN, "Parcel must be in transit to be delivered!");
//       }
//    }
//    const updatedParcel = await Parcel.findByIdAndUpdate(id, { currentStatus: status }, { new: true });
//    if (!updatedParcel) {
//       throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
//    }
//    sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Parcel status updated successfully!",
//       data: updatedParcel
//    });
// };
const updateParcelStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { currentStatus } = req.body;
    const updatedParcel = yield parcel_service_1.ParcelServices.updateParcel(id, currentStatus);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Parcel status updated successfully!",
        data: updatedParcel
    });
});
const getAllParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelServices.getAllParcels();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Parcel is retrieved successfully!",
        data: result
    });
});
const deleteParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isExistParcel = yield parcel_model_1.default.findById(id);
    if (!isExistParcel) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Parcel not found!");
    }
    yield parcel_service_1.ParcelServices.deleteParcel(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Parcel Deleted successfully!",
        data: null
    });
});
exports.ParcelController = {
    createParcel,
    updateParcelStatus,
    getAllParcels,
    deleteParcel
};
