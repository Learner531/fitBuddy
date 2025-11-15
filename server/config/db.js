// Import mongoose and dotenv
const mongoose = require('mongoose');
require('dotenv').config();

// Get connection string from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt connection
    const conn = await mongoose.connect(MONGO_URI);
    
    // Success message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Error handling
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

// Export the function so we can use it in index.js
module.exports = connectDB;