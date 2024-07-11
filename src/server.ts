import path from "path";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import errorMiddleware from "./middleware/error.middleware";
import cors from "cors"
const app = express();

// Middlewares
app.use(cors({}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser())
app.use(fileUpload({}))

dotenv.config()
// Routes
import UserRoute from "./routes/user.route"
import AuthRoute from "./routes/auth.route"
import PostRoute from "./routes/post.route"

// Use Routes
app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
app.use("/api/post", PostRoute)

app.use(errorMiddleware)

const PORT = process.env.PORT || 8000
connectDB()
app.listen(PORT, () => console.log(`[server]: Server is running on port ${PORT}`));