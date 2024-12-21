import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  // Log the request body for debugging
  console.log("Request body received:", req.body);

  // Extract fields from the request body
  const {
    name,
    email,
    phone,
    address,
    password,
    role,
    firstNiche,
    secondNiche,
    thirdNiche,
    coverletter,
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !address || !password || !role) {
    console.log("Validation failed: Missing required fields");
    return next(new ErrorHandler("Please fill in all fields.", 400));
  }
  if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
    return next(
      new ErrorHandler("Please provide your preferred job niches.", 400)
    );
  }
  // Check for existing user
  const existingUser = await User.findOne({ email });
  console.log("Existing user check completed");

  if (existingUser) {
    return next(new ErrorHandler("User already exists.", 400));
  }

  // Prepare user data
  const userData = {
    name,
    email,
    phone,
    address,
    password,
    role,
    niches: {
      firstNiche,
      secondNiche,
      thirdNiche,
    },
    coverletter,
  };

  // Handle resume file upload
  if (req.files && req.files.resume) {
    const { resume } = req.files;
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "Job_Seekers_Resume" }
      );
      if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        console.log("Error uploading resume to Cloudinary");
        return next(new ErrorHandler("Error uploading resume", 500));
      }

      userData.resume = {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return next(new ErrorHandler("Error uploading resume", 500));
    }
  }

  // Create the user in the database
  try {
    const user = await User.create(userData);
    sendToken(user, 201, res, "Account registered successfully.");
  } catch (error) {
    console.error("Error creating user:", error);
    return next(new ErrorHandler("Error creating user", 500));
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { role, email, password } = req.body;

  // Validate email and password
  if (!role || !email || !password) {
    return next(
      new ErrorHandler("Please enter email and password and role", 400)
    );
  }

  // Find user in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("Invalid user role", 401));
  }

  sendToken(user, 200, res, "Logged in successfully.");
});
