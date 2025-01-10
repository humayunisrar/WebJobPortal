import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";


export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Extract token from cookies
  const { token } = req.cookies;

  // If no token is found, return an error
  if (!token) {
    return next(new ErrorHandler("User is not authenticated. Please login.", 401));
  }

  try {
    // Decode the token to get user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user by decoded token id
    const user = await User.findById(decoded.id);

    // If user does not exist, return an error
    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    // Attach the user to the request object for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token.", 401)); // Invalid token error
  }
});
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
