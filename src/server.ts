import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './app/config/db';
import userRouter from './app/modules/user/user.route';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//connected database
connectDB();

//middlewares
app.use(cors());
app.use(express.json());


//root route
app.get("/", (req: Request, res: Response) => {
    res.send("Parcel Server Is Running.")
})

//application route

app.use('/api/v1/user', userRouter)



app.listen(port, () =>{
    console.log("Sever is running on port", port)
})




