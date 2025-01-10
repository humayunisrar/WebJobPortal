import app from "./app.js";
import cloudinary from "cloudinary";
import axios from "axios"; // Import axios to fetch the public IP

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fetch and log the public IP address
axios.get('https://api.ipify.org?format=json')
  .then(response => {
    console.log(`Public IP Address: ${response.data.ip}`);
  })
  .catch(error => {
    console.error('Error fetching public IP address:', error);
  });

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
