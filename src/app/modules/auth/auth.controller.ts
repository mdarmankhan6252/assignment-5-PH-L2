import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { AuthServices } from "./auth.service";


const loginApi = async(req: Request, res: Response, next: NextFunction) =>{

   const loginInfo = await AuthServices.loginApi(req.body);


   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successfully!",
      data: loginInfo
   })

}

export const AuthControllers = {
   loginApi
}