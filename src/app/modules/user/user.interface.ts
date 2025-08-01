import { Types } from "mongoose"

export enum Role {
    ADMIN = 'ADMIN',
    SENDER = 'SENDER',
    RECEIVER = 'RECEIVER'
}

export enum IsActive {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED'
}

export interface IUser {
    _id?:Types.ObjectId
    name: string
    email: string
    password: string
    phone?:string
    address?: string
    isDeleted?: boolean
    isActive?: IsActive
    isVerified?: boolean
    role: Role
    parcelsSent?: Types.ObjectId[]
    parcelsReceived?: Types.ObjectId[]
}