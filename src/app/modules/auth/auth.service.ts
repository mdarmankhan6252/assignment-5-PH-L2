import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface"
import User from "../user/user.model";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { generateToken } from "../../utils/jwt";

const loginApi = async (payload: Partial<IUser>) => {

   const { email, password } = payload;

   const isUserExits = await User.findOne({ email })

   if (!isUserExits) {
      throw new AppError(httpStatus.BAD_REQUEST, "Email doest not exits!")
   }

   const isPasswordMatched = await bcrypt.compare(password as string, isUserExits.password as string);

   if (!isPasswordMatched) {
      throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
   }

   const jwtPayload = {
      userId: isUserExits._id,
      email: isUserExits.email,
      role: isUserExits.role
   }

   const accessToken = generateToken(jwtPayload, process.env.JWT_SECRET as string, '1d')

   return {
      accessToken
   }

}

export const AuthServices = {
   loginApi
}