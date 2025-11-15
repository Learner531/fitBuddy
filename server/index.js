const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to MongoDB
connectDB();

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'FitBuddy API running' });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);

// Get port from environment variables or use default
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});