import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

   try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
         throw new AppError(403, "No token found")
      }

      const verifiedToken = verifyToken(accessToken, process.env.JWT_SECRET as string) as JwtPayload;


      console.log(verifiedToken);

      if (!verifiedToken) {
         console.log(verifiedToken)
         throw new AppError(403, "You are not authorized!")
      }

      if (!authRoles.includes(verifiedToken.role)) {
         throw new AppError(403, "You have not permision to access this route.")
      }

      next()


   } catch (error) {
      next(error)
   }
}