export const sendToken = (user, statusCode, res, message) => {
    // Create JWT token
    const token = user.getJwtToken();

    console.log("Generated Token:", token); // Debugging token creation

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: 'None', // Allow cross-site cookie sending
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token, // Check if token is being returned here
        message,
    });
};
