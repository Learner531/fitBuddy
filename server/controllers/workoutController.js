const WorkoutLog = require('../models/WorkoutLog');

// GET all workout logs
const getAllWorkoutLogs = async (req, res) => {
  try {
    const workoutLogs = await WorkoutLog.find();
    res.status(200).json(workoutLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create new workout log
const createWorkoutLog = async (req, res) => {
  try {
    const workoutLog = await WorkoutLog.create(req.body);
    res.status(201).json(workoutLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update workout log
const updateWorkoutLog = async (req, res) => {
  try {
    const workoutLog = await WorkoutLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!workoutLog) {
      return res.status(404).json({ message: 'Workout log not found' });
    }
    res.status(200).json(workoutLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE workout log
const deleteWorkoutLog = async (req, res) => {
  try {
    const workoutLog = await WorkoutLog.findByIdAndDelete(req.params.id);
    if (!workoutLog) {
      return res.status(404).json({ message: 'Workout log not found' });
    }
    res.status(200).json({ message: 'Workout log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWorkoutLogs,
  createWorkoutLog,
  updateWorkoutLog,
  deleteWorkoutLog
};