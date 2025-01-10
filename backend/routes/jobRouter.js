import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  postJob,
  getAllJobs,
  getASingleJob,
  getMyJobs,
  deleteJob,
  getJobStats,
} from "../controllers/jobController.js";
import { getJobLocationsStats } from "../controllers/jobController.js";

const router = express.Router();

// Define all your routes here
router.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.get("/get/:id", getASingleJob);

// Add new route for fetching job statistics
router.get("/getstats",isAuthenticated, getJobStats); // Ensure this route is defined
router.get("/getlocationsstats", getJobLocationsStats);


export default router;
