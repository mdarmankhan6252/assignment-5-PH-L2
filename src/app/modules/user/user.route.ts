import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";

const userRouter = Router();

userRouter.post('/register', validateRequest(createUserZodSchema) ,UserControllers.createUser)


export default userRouter;