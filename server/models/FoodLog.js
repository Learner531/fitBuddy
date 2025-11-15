const mongoose = require('mongoose');

// Define the FoodLog schema
const foodLogSchema = new mongoose.Schema({
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
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack']
  },
  foodItems: [{
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodReference',
      default: null  // null if manually entered
    },
    foodName: String,
    quantity: Number,
    unit: String,
    calories: Number,
    protein: Number,    // Protein in grams
    carbs: Number,      // Carbohydrates in grams
    fats: Number,        // Fats in grams
    isManualEntry: {
      type: Boolean,
      default: false
    }
  }],
  totalCalories: {
    type: Number,
    default: 0
  },
  totalProtein: Number,   // Sum of all protein
  totalCarbs: Number,     // Sum of all carbs
  totalFats: Number,      // Sum of all fats
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('FoodLog', foodLogSchema);