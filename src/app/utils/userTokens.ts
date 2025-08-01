import { JwtPayload } from "jsonwebtoken";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import User from "../modules/user/user.model";
import AppError from "../errors/AppError";
import httpStatus from 'http-status'

export const createUserTokens = (user: Partial<IUser>) => {
      const jwtPayload = {
      userId: user._id,
      email: user.email,
      role: user.role
   }

   const accessToken = generateToken(jwtPayload, process.env.JWT_SECRET as string, '30')

   const refreshToken = generateToken(jwtPayload, process.env.JWT_REFRESH_SECRET as string, '180d');

   return {
      accessToken,
      refreshToken
   }

}


export const createNewAccessTokenWithRefreshToken = async(refreshToken: string) =>{
   const verifiedRefreshToken = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;

   const isUserExits = await User.findOne({ email: verifiedRefreshToken.email });

   if (!isUserExits) {
      throw new AppError(httpStatus.BAD_REQUEST, "User does not exits")
   }

   if (isUserExits.isActive === IsActive.BLOCKED || isUserExits.isActive === IsActive.INACTIVE) {
      throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExits.isActive}`)
   }

   if (isUserExits.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
   }

   const jwtPayload = {
      userId: isUserExits._id,
      email: isUserExits.email,
      role: isUserExits.role
   }

   const accessToken = generateToken(jwtPayload, process.env.JWT_REFRESH_SECRET as string, '30d')

   return  accessToken
 
}