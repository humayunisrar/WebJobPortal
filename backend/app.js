import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";
import helmet from "helmet"; // ✅ Security middleware
import morgan from "morgan"; // ✅ Logging middleware

const app = express();
config({ path: "./config/config.env" });

// ✅ Security Middleware (Prevents common security vulnerabilities)
app.use(helmet());

// ✅ CORS Configuration (More secure with dynamic origins)
const allowedOrigins = process.env.FRONTEND_URL?.split(",") || ["*"]; // Support multiple origins
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Logger Middleware (For debugging requests)
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// ✅ Start Newsletter Cron Job
newsLetterCron();

// ✅ Database Connection (With Error Handling)
connection()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit on failure
  });

// ✅ Global Error Handler
app.use(errorMiddleware);

export default app;
