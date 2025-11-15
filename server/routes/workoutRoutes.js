const express = require('express');
const router = express.Router();
const {
  getAllWorkoutLogs,
  createWorkoutLog,
  updateWorkoutLog,
  deleteWorkoutLog
} = require('../controllers/workoutController');

// GET all workout logs
router.get('/', getAllWorkoutLogs);

// POST create new workout log
router.post('/', createWorkoutLog);

// PUT update workout log by ID
router.put('/:id', updateWorkoutLog);

// DELETE workout log by ID
router.delete('/:id', deleteWorkoutLog);

module.exports = router;