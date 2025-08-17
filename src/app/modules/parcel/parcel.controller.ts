import { Request, Response } from "express";
import Parcel from "./parcel.model";
import { ParcelStatus } from "./parcel.interface";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import AppError from "../../errors/AppError";
import { Role } from "../user/user.interface";
import { ParcelServices } from "./parcel.service";
import User from "../user/user.model";

const createParcel = async (req: Request, res: Response) => {

   const result = await ParcelServices.createParcel(req.body);

   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Parcel Created successfully!",
      data: result
   })
}

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



const updateParcelStatus = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { currentStatus } = req.body;

   const isParcelExist = await Parcel.findById(id);

   if (isParcelExist?.currentStatus === 'CANCELLED') {
      throw new AppError(httpStatus.BAD_REQUEST, "The status is not changeable now!")
   }

   const updatedParcel = await ParcelServices.updateParcel(id, currentStatus)

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Parcel status updated successfully!",
      data: updatedParcel
   })

};


const getAllParcels = async (req: Request, res: Response) => {
   const result = await ParcelServices.getAllParcels();
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Parcel is retrieved successfully!",
      data: result
   })

}

const getParcelById = async (req: Request, res: Response) => {
   const id = req.params.id;

   const parcel = await ParcelServices.getParcelById(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Parcel is retrieved successfully",
      data: parcel
   })

}

const getParcelByEmail = async (req: Request, res: Response) => {
   const email = req.params.email;

   const parcel = await ParcelServices.getParcelByEmail(email)

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Parcel is retrieved successfully",
      data: parcel
   })
}

const deleteParcel = async (req: Request, res: Response) => {

   const { id } = req.params;
   const isExistParcel = await Parcel.findById(id);

   if (!isExistParcel) {
      throw new AppError(httpStatus.BAD_REQUEST, "Parcel not found!")
   }

   await ParcelServices.deleteParcel(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Parcel Deleted successfully!",
      data: null
   })
}

export const ParcelController = {
   createParcel,
   updateParcelStatus,
   getAllParcels,
   deleteParcel,
   getParcelByEmail,
   getParcelById
}