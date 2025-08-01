import { Router } from "express";
import { AuthControllers } from "./auth.controller";


const authRouter = Router();

authRouter.post('/login', AuthControllers.loginApi)
authRouter.post('/refresh-token', AuthControllers.getNewAccessToken);
authRouter.post('/logout', AuthControllers.logout)


export default authRouter;