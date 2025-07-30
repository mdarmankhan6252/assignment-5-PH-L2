import { model, Schema, Types } from "mongoose";
import { IsActive, IUser, Role } from "./user.interface";


const userSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: String, enum: Object.values(IsActive), default: IsActive.ACTIVE },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(Role), default: Role.RECEIVER },
    parcelsSent: [{ type: Types.ObjectId, ref: "Parcel" }],
    parcelsReceived: [{ type: Types.ObjectId, ref: "Parcel" }]
}, {
    timestamps: true
})

const User = model<IUser>("User", userSchema);
export default User;