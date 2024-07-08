import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = () => {
    try {
        mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log("[database]: Connected to database");
    } catch (error) {
        console.log("[database]: Error with database connection " + error)
    }
}

export default connectDB 