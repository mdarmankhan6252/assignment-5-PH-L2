import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { AuthServices } from "./auth.service";
import AppError from "../../errors/AppError";
import { setAuthCookie } from "../../utils/setCookie";


const loginApi = async (req: Request, res: Response, next: NextFunction) => {

   const loginInfo = await AuthServices.loginApi(req.body);


   setAuthCookie(res, loginInfo)


   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successfully!",
      data: loginInfo
   })

}

const getNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {

   const refreshToken = req.cookies.refreshToken;

   if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, "No refresh token found!")
   }

   const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);


   setAuthCookie(res, tokenInfo)

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New Access Token Retrived successfully!",
      data: tokenInfo
   })

}


const logout = async (req: Request, res: Response, next: NextFunction) => {

   res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
   })

   res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
   })

   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged out successfully!",
      data: null
   })

}

export const AuthControllers = {
   loginApi,
   getNewAccessToken,
   logout
}