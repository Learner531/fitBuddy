const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  getProfile,
  checkUser,
  checkAdmin,
  checkTrainer,
  logout
} = require('../controllers/authController');
const { authenticate, authorizeAdmin, authorizeTrainer } = require('../middleware/auth');

// POST /api/auth/signup - Register new user (no auth needed)
router.post('/signup', signup);

// POST /api/auth/signin - Login user (no auth needed)
router.post('/signin', signin);

// POST /api/auth/logout - Logout (no auth needed)
router.post('/logout', logout);

// GET /api/auth/profile - Get current user profile (requires auth)
router.get('/profile', authenticate, getProfile);

// GET /api/auth/check-user - Check if user is authenticated (requires auth)
router.get('/check-user', authenticate, checkUser);

// GET /api/auth/check-admin - Check if user is admin (requires auth + admin role)
router.get('/check-admin', authenticate, authorizeAdmin, checkAdmin);

// GET /api/auth/check-trainer - Check if user is trainer (requires auth + trainer role)
router.get('/check-trainer', authenticate, authorizeTrainer, checkTrainer);

module.exports = router;