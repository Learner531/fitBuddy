const FoodLog = require('../models/FoodLog');

// GET all food logs
const getAllFoodLogs = async (req, res) => {
  try {
    const foodLogs = await FoodLog.find();
    res.status(200).json(foodLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create new food log
const createFoodLog = async (req, res) => {
  try {
    const foodLog = await FoodLog.create(req.body);
    res.status(201).json(foodLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update food log
const updateFoodLog = async (req, res) => {
  try {
    const foodLog = await FoodLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!foodLog) {
      return res.status(404).json({ message: 'Food log not found' });
    }
    res.status(200).json(foodLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE food log
const deleteFoodLog = async (req, res) => {
  try {
    const foodLog = await FoodLog.findByIdAndDelete(req.params.id);
    if (!foodLog) {
      return res.status(404).json({ message: 'Food log not found' });
    }
    res.status(200).json({ message: 'Food log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFoodLogs,
  createFoodLog,
  updateFoodLog,
  deleteFoodLog
};