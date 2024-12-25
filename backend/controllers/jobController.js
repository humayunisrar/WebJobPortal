import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsiteTitle,
    personalWebsiteUrl,
    jobNiche,
  } = req.body;
  if (
    !title ||
    !jobType ||
    !location ||
    !companyName ||
    !introduction ||
    !responsibilities ||
    !qualifications ||
    !salary ||
    !jobNiche
  ) {
    return next(new ErrorHandler("Please fill in all fields.", 400));
  }

  if (
    (personalWebsiteTitle && !personalWebsiteUrl) ||
    (!personalWebsiteTitle && personalWebsiteUrl)
  ) {
    return next(new ErrorHandler("Please enter personal website details", 400));
  }

  const postedBy = req.user.id;
  const job = await Job.create({
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsite: {
      title: personalWebsiteTitle || "",
      url: personalWebsiteUrl || "",
    },
    jobNiche,
    postedBy,
  });
  res.status(201).json({
    success: true,
    message: "Job posted successfully",
    job,
  });
});

export const getAllJobs = catchAsyncErrors(async (req, res) => {
  const { city, niche, searchKeyword } = req.query;
  const query = {};
  if (city) {
    query.location = { $regex: new RegExp(city, "i") };
  }
  if (niche) {
    query.jobNiche = { $regex: new RegExp(niche, "i") };
  }

  if (searchKeyword) {
    query.$or = [
      {
        title: {
          $regex: searchKeyword,
          $options: "i",
        },
      },
      {
        companyName: {
          $regex: searchKeyword,
          $options: "i",
        },
      },
      {
        jobNiche: {
          $regex: searchKeyword,
          $options: "i",
        },
      },
      {
        introduction: {
          $regex: searchKeyword,
          $options: "i",
        },
      },
    ];
  }

  const jobs = await Job.find(query);
  res.status(200).json({
    success: true,
    jobs,
    count: jobs.length,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res) => {});

export const deleteJob = catchAsyncErrors(async (req, res) => {});

export const getASingleJob = catchAsyncErrors(async (req, res) => {});
