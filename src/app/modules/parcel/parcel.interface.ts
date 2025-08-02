import { Types } from "mongoose";

export enum ParcelStatus {
   REQUESTED = 'REQUESTED',
   ACCEPTED = 'ACCEPTED',
   DISPATCHED = 'DISPATCHED',
   IN_TRANSIT = 'IN_TRANSIT',
   DELIVERED = 'DELIVERED',
   CANCELLED = 'CANCELLED'
}



export interface IParcel {
   sender: Types.ObjectId
   receiver: Types.ObjectId
   pickupAddress: string
   deliveryAddress: string
   currentStatus: ParcelStatus
   weight: number
   deliveryDate?: Date
}