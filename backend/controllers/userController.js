import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const register = catchAsyncErrors(async (req, res) => {
  try {
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
    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("Please fill in all fields.", 400));
    }
    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(
        new ErrorHandler("Please provide your prefered niches.", 400)
      );
    }

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return next(new ErrorHandler("User already exists.", 400));
    }

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

    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
              folder: "Job_Seekers_Resume",
            }
          );
          if (
            !cloudinaryResponse ||
            !cloudinaryResponse.error ||
            !cloudinaryResponse.secure_url
          ) {
            return next(new ErrorHandler("Error uploading resume", 500));
          }
            userData.resume ={
                url: cloudinaryResponse.secure_url,
                public_id: cloudinaryResponse.public_id,
            }
        } catch (error) {
            return next(new ErrorHandler("Error uploading resume", 500));
        }
      }
    }
    const user = await User.create(userData);
    res.status(201).json({
      success: true,
      message: "Account registered successfully.",
    });

  } catch (error) {
    next(error);
  }
});
