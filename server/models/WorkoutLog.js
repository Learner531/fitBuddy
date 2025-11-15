const mongoose = require('mongoose');

// Define the WorkoutLog schema
const workoutLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkoutReference',
    default: null  // null if manually entered
  },
  workoutType: {
    type: String,
    enum: ['cardio', 'strength', 'sports', 'other']
  },
  workoutName: {
    type: String,
    required: true
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  duration: {
    type: Number,  // in minutes
    required: true
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  metValue: {
    type: Number,
    default: null  // MET value used for calculation (if from WorkoutReference)
  },
  isManualEntry: {
    type: Boolean,
    default: false  // true if user manually entered (not from WorkoutReference)
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);