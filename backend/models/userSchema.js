import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Your name should have atleast 3 characters"],
    maxLength: [30, "Your name should have atmost 30 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  niche: {
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password should have atleast 6 characters"],
    maxLength: [30, "Password cannot exceed 30 characters"],
    select: false,
  },
  resume: {
    public_id: String,
    url: String,
  },
  coverLetter: {
    type: String,
    maxLength: [1000, "Cover letter cannot exceed 1000 characters"],
  },
  role: {
    type: String,
    default: "user",
    required: true,
    enum: {
      values: ["Job Seeker", "Empolyer"],
      message: "Please select correct role",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export  const User = mongoose.model("User", userSchema);