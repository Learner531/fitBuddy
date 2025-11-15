const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to verify JWT token (authentication)
const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user info to request object
    req.user = decoded; // Contains { userId, role }
    
    next(); // Continue to next middleware/route
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if user is admin (authorization)
const authorizeAdmin = (req, res, next) => {
  try {
    // First check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    next(); // Continue if user is admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to check if user is trainer (authorization)
const authorizeTrainer = (req, res, next) => {
  try {
    // First check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Check if user is trainer
    if (req.user.role !== 'trainer') {
      return res.status(403).json({ message: 'Access denied. Trainer only.' });
    }

    next(); // Continue if user is trainer
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authenticate,
  authorizeAdmin,
  authorizeTrainer
};