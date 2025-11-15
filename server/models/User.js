const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

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



// Hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash if password is modified (or new)
    if (!this.isModified('password')) {
      return next();
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
module.exports = mongoose.model('User', userSchema);