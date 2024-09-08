import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const mongo_URI: string = process.env.MONGO_URI as string;

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongo_URI);
        console.log("Connected to MongoDB Database");
    }
    catch (error) {
        console.error("Error Connecting to Database", (error as Error).message);
        throw error;

    }
};