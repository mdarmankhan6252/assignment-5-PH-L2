import { Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from 'http-status';
import { sendResponse } from "../../utils/sendResponse";


const createUser = async (req: Request, res: Response) => {
    const user = await userServices.createUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully!",
        data: user
    })
}

export const updateUser = (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}


export const UserControllers = {
    createUser
}