const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'trainer', 'admin'],
    default: 'user'
  },
  profile: {
    firstName: String,
    lastName: String,
    age: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    height: Number,  // in cm
    weight: Number   // in kg
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);