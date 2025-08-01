import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './app/config/db';
import userRouter from './app/modules/user/user.route';
import authRouter from './app/modules/auth/auth.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//connected database
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())


//root route
app.get("/", (req: Request, res: Response) => {
    res.send("Parcel Server Is Running.")
})

//application route

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);


app.use(globalErrorHandler)

app.listen(port, () =>{
    console.log("Sever is running on port", port)
})




