import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction ) =>{
   let statusCode = 5000;
   let message = "Something went wrong!";

   if(err instanceof AppError) {
      statusCode = err.statusCode
      message = err.message
   }else if(err instanceof Error) {
      statusCode = 500;
      message = err.message
   }

   res.status(statusCode).json({
      success: false,
      message,
      err,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null
   })
}