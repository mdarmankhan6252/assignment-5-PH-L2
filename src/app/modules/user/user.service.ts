import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import User from "./user.model";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt'
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

// const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

//     const isUserExits = await User.findOne(userId);

//     if (isUserExits) {
//         throw new AppError(httpStatus.NOT_FOUND, 'User not found')
//     }


// }


export const userServices = {
    createUser
}