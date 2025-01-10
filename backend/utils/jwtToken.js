export const sendToken = (user, statusCode, res, message) => {
    // Create JWT token
    const token = user.getJwtToken();

    // Cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Ensures the cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production', // Only set the secure flag in production
        sameSite: 'strict' // Strict SameSite option for cross-site cookie security
    };

    // Send token in cookie and in response
    res.status(statusCode)
       .cookie('token', token, options)
       .json({
           success: true,
           token, // Token in body is optional but helpful for immediate use
           message
       });
};
