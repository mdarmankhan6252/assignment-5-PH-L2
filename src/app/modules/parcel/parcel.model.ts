import { model, Schema } from "mongoose";
import { IParcel, ParcelStatus } from "./parcel.interface";


const parcelSchema = new Schema<IParcel>({
   sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   receiver: {
      type: Schema.Types.ObjectId,
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
      enum: Object.values(ParcelStatus),
      default: ParcelStatus.REQUESTED
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
})

const Parcel = model<IParcel>("Parcel", parcelSchema);

export default Parcel;