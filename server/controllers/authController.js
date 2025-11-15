const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT Secret (should be in .env, but using a default for now)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// POST /api/auth/signup - Register new user
const signup = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or username' });
    }

    // Create new user (password will be hashed by pre-save hook)
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'user',
      profile
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user (without password) and token
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /api/auth/signin - Login user
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user (without password) and token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/auth/profile - Get current user profile
const getProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/auth/check-user - Check if user is authenticated
const checkUser = async (req, res) => {
  try {
    // If middleware passes, user is authenticated
    res.status(200).json({
      message: 'User is authenticated',
      user: {
        id: req.user.userId,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/auth/check-admin - Check if user is admin
const checkAdmin = async (req, res) => {
  try {
    // If middleware passes, user is admin
    res.status(200).json({
      message: 'User is admin',
      user: {
        id: req.user.userId,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/auth/check-trainer - Check if user is trainer
const checkTrainer = async (req, res) => {
  try {
    // If middleware passes, user is trainer
    res.status(200).json({
      message: 'User is trainer',
      user: {
        id: req.user.userId,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/logout - Logout (optional, mainly for frontend)
const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
  signup,
  signin,
  getProfile,
  checkUser,
  checkAdmin,
  checkTrainer,
  logout
};