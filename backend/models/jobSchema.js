import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter job title"],
    maxLength: [100, "Job title cannot exceed 100 characters"],
  },
  jobType: {
    type: String,
    required: [true, "Please enter job type"],
    enum: {
      values: ["Full Time", "Part Time", "Contract", "Internship"],
      message: "Please select correct job type",
    },
  },
  location: {
    type: String,
    required: [true, "Please enter job location"],
  },
  companyName: {
    type: String,
    required: [true, "Please enter company name"],
  },
  introduction: {
    type: String,
  },
  responsibilities: {
    type: String,
    required: [true, "Please enter job responsibilities"],
  },
  qualifications: {
    type: String,
    required: [true, "Please enter job qualifications"],
  },
  offers: {
    type: String,
  },
  salary: {
    type: String,
    required: [true, "Please enter job salary"],
  },
  hiringMultipleCandidates: {
    type: String,
    enum: {
      values: ["Yes", "No"],
      message: "Please select correct option",
    },
    default: "No",
  },
  personalWebsite: {
    title: String,
    url: String,
  },
  jobNiche: {
    type: String,
    required: [true, "Please enter job niche"],
  },
  newsLettersSent: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  
});

export const Job = mongoose.model("Job", jobSchema);
