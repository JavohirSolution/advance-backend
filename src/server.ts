import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import connectDB from "../src/config/db"
const app: Application = express();

app.use(express.json());
dotenv.config()

app.get("/", (req, res) => {
    res.json("Hello world")
})

const PORT: Number = Number(process.env.PORT) || 8000

connectDB()
app.listen(PORT, () => console.log(`[server]: Server is running on port ${PORT}`));