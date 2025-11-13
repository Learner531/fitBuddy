# 📋 Quick Reference: Collections Summary

## Collection Count: 7

| # | Collection | Purpose | Key Fields |
|---|------------|---------|------------|
| 1 | **Users** | User accounts & profiles | username, email, password, role, profile (weight, height) |
| 2 | **FoodLogs** | Daily food intake tracking | userId, date, mealType, foodItems[] (foodId, calories, isManualEntry), totalCalories |
| 3 | **WorkoutLogs** | Exercise & workout records | userId, workoutId, date, workoutType, intensity, duration, caloriesBurned, metValue, isManualEntry |
| 4 | **SleepLogs** | Sleep tracking | userId, date, sleepStartTime, sleepEndTime, totalDuration, sleepQuality |
| 5 | **Goals** | User fitness targets | userId, dailyCalorieTarget, dailyWorkoutTarget, dailySleepTarget, macroTargets |
| 6 | **FoodReference** | Standard food database | foodName, category, nutritionPer100g (calories, protein, carbs, fats) |
| 7 | **WorkoutReference** | Standard workout database | workoutName, workoutType, category, metValues (low, medium, high) |

---



See **DATABASE-SCHEMA.md** for full detailed schema design.

