import { Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from 'http-status';
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";


const createUser = async (req: Request, res: Response) => {
    const user = await userServices.createUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully!",
        data: user
    })
}

const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const verifiedToken = verifyToken(token as string, process.env.JWT_SECRET as string) as JwtPayload;
    const payload = req.body;

    const user = await userServices.updateUser(userId, payload, verifiedToken)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Updated successfully!",
        data: user
    })
}

const getAllUsers = async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Users retrieved successfully!",
        data: result.data,
        meta: result.meta
    })
}




export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}