import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import taskRoutes  from "./routes/taskRoutes.js"
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.js';
import cors from "cors"


export const app = express();

// Configure the dotenv file
dotenv.config({
    path: './data/.env'
});

// Using middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials: true
}))

// Routes for user
app.use('/api/v1/users', userRoutes);

//routes for task
app.use("/api/v1/task", taskRoutes)


//default route
app.get("/", (req, res)=>{
    res.send("nice working")
})

//using error middle ware
app.use(errorMiddleware)
