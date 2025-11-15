const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// GET all users
router.get('/', getAllUsers);

// POST create new user
router.post('/', createUser);

// PUT update user by ID
router.put('/:id', updateUser);

// DELETE user by ID
router.delete('/:id', deleteUser);

module.exports = router;