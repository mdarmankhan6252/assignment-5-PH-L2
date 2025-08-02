import AppError from "../../errors/AppError";
import { IParcel } from "./parcel.interface"
import Parcel from "./parcel.model"
import httpStatus from 'http-status'

//create a parcel
const createParcel = async (payload: IParcel) => {
   const parcel = await Parcel.create(payload)
   return parcel;

}

//update a parcel
const updateParcel = async (id: string, currentStatus: string) => {

   const existingParcel = await Parcel.findById(id);
   if (!existingParcel) {
      throw new AppError(httpStatus.NOT_FOUND, "Parcel is not found");
   }

   const updatedParcel = await Parcel.findByIdAndUpdate(id, { currentStatus }, { new: true })

   return updatedParcel
}

//delete a parcel
const deleteParcel = async (id: string) => {
   return await Parcel.findByIdAndDelete(id);
}

//get all parcels
const getAllParcels = async () => {
   const parcels = await Parcel.find();
   return parcels;
}


export const ParcelServices = {
   createParcel,
   updateParcel,
   deleteParcel,
   getAllParcels
}