import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";

const app = express();
config({ path: "./config/config.env" });

// Correct CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL, e.g., http://localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Required to allow cookies/auth headers
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Automated tasks
newsLetterCron();

// Database connection
connection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
