const express = require('express');
const router = express.Router();
const {
  getAllFoodLogs,
  createFoodLog,
  updateFoodLog,
  deleteFoodLog
} = require('../controllers/foodController');

// GET all food logs
router.get('/', getAllFoodLogs);

// POST create new food log
router.post('/', createFoodLog);

// PUT update food log by ID
router.put('/:id', updateFoodLog);

// DELETE food log by ID
router.delete('/:id', deleteFoodLog);

module.exports = router;