import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const userRouter = Router();


//api/v1/user/register
userRouter.post('/register' ,validateRequest(createUserZodSchema), UserControllers.createUser);

//api/v1/user/all-users
userRouter.get('/all-users',checkAuth(Role.ADMIN), UserControllers.getAllUsers)


//api/v1/user/single-user


//api/v1/user/:id
userRouter.patch('/:id', checkAuth(...Object.values(Role)), UserControllers.updateUser)





export default userRouter;