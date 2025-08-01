import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface"
import User from "../user/user.model";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";

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

   const userTokens = createUserTokens(isUserExits)

   const { password: pass, ...rest } = isUserExits.toObject();


   return {
      accessToken: userTokens.accessToken,
      refreshToken: userTokens.refreshToken,
      user: rest
   }

}

const getNewAccessToken = async (refreshToken: string) => {
   const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

   return {
      accessToken: newAccessToken
   }
}




export const AuthServices = {
   loginApi,
   getNewAccessToken
}