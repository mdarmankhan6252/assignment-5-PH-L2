import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Database Connected!")
    } catch (error) {
        console.log("Failed to connect Database.")        
    }

}
export default connectDB;