export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    // Ensure the provided function runs inside a Promise
    Promise.resolve(theFunction(req, res, next)).catch((error) => {
      // Log the error for debugging
      console.error("Error caught in catchAsyncErrors middleware:", error);

      // Pass the error to the next middleware
      next(error);
    });
  };
};
