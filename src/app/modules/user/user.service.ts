import AppError from "../../errors/AppError";
import { IsActive, IUser, Role } from "./user.interface";
import User from "./user.model";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt'
import { JwtPayload } from "jsonwebtoken";
// import { JwtPayload } from 'jsonwebtoken';

const createUser = async (payload: Partial<IUser>) => {

    const { email, password, ...rest } = payload;

    const isUserExits = await User.findOne({ email });

    if (isUserExits) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already exist")
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest
    })
    return user;
}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }



    if (payload.role) {
        if (decodedToken.role === Role.RECEIVER || decodedToken.role === Role.SENDER) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }

        if (payload.isActive || payload.isDeleted || payload.isVerified) {
            if (decodedToken.role === Role.RECEIVER || decodedToken.role === Role.SENDER) {
                throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!")
            }
        }

        if (payload.password) {
            payload.password = await bcrypt.hash(payload.password, 10)
        }

        const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });

        return newUpdatedUser;
    }


}

const getAllUsers = async () => {
    const users = await User.find();
    const totalUsers = await User.countDocuments();

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
}


const getSingleUser = async (id: string) => {
    const user = await User.findById(id);
    return user
}



export const userServices = {
    createUser,
    getAllUsers,
    updateUser,
    getSingleUser
}