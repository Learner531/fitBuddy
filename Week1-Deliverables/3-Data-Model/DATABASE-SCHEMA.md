# 🗃️ FitBuddy - MongoDB Database Schema Design


---

## 📊 Collections Overview

This database design includes **7 main collections**:

1. **Users** - User accounts and profiles
2. **FoodLogs** - Daily food intake records
3. **WorkoutLogs** - Exercise and workout records
4. **SleepLogs** - Sleep tracking records
5. **Goals** - User fitness goals and targets
6. **FoodReference** - Standard food database for lookups
7. **WorkoutReference** - Standard workout database with MET values for calorie calculation

---

## 1️⃣ Users Collection

Stores user account information and profile data.

### Schema Structure:
```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated ID
  username: String,                 // Unique username
  email: String,                    // Unique email address
  password: String,                 // Hashed password (bcrypt)
  role: String,                     // "user", "trainer", "admin"
  profile: {
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,                 // "male", "female", "other"
    height: Number,                 // in cm
    weight: Number,                 // in kg
    profilePicture: String          // URL to image
  },
  createdAt: Date,                  // Account creation timestamp
  updatedAt: Date                   // Last update timestamp
}
```

### Indexes:
- `email` (unique)
- `username` (unique)

### Example Document:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_fit",
  "email": "john@example.com",
  "password": "$2b$10$abcdefghijklmnopqrstuv",
  "role": "user",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "age": 28,
    "gender": "male",
    "height": 175,
    "weight": 75,
    "profilePicture": "/uploads/john.jpg"
  },
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-10T10:30:00.000Z"
}
```

---

## 2️⃣ FoodLogs Collection

Records daily food intake and nutritional information.

### Schema Structure:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,                 // Reference to Users collection
  date: Date,                       // Date of the meal
  mealType: String,                 // "breakfast", "lunch", "dinner", "snack"
  foodItems: [
    {
      foodId: ObjectId,             // Reference to FoodReference collection (null if manual)
      foodName: String,             // Name of the food item
      quantity: Number,             // Amount consumed
      unit: String,                 // "grams", "ml", "pieces", "servings"
      calories: Number,             // Calories for this quantity
      protein: Number,              // Protein in grams
      carbs: Number,                // Carbohydrates in grams
      fats: Number,                 // Fats in grams
      isManualEntry: Boolean        // true if manually entered (not from FoodReference)
    }
  ],
  totalCalories: Number,            // Sum of all food items calories
  totalProtein: Number,             // Sum of all protein
  totalCarbs: Number,               // Sum of all carbs
  totalFats: Number,                // Sum of all fats
  notes: String,                    // Optional notes
  createdAt: Date,
  updatedAt: Date
}
```

### 🔥 Calorie Calculation Approach:
**Consistent with WorkoutLogs - Auto-calculate with manual override option**

**Workflow:**
1. User searches food in `FoodReference` OR enters manually
2. If from FoodReference:
   - System calculates nutrition based on quantity
   - User can **adjust** the calculated values if needed
   - `isManualEntry = false`
3. If manual entry:
   - User enters food name, quantity, and nutrition values directly
   - `isManualEntry = true`

### Indexes:
- `userId` + `date` (compound index for queries)
- `userId`

### Example Document (Mix of FoodReference and Manual Entry):
```json
{
  "_id": "607f1f77bcf86cd799439022",
  "userId": "507f1f77bcf86cd799439011",
  "date": "2025-01-15T00:00:00.000Z",
  "mealType": "breakfast",
  "foodItems": [
    {
      "foodId": "707f1f77bcf86cd799439033",
      "foodName": "Oatmeal",
      "quantity": 100,
      "unit": "grams",
      "calories": 389,
      "protein": 17,
      "carbs": 66,
      "fats": 7,
      "isManualEntry": false
    },
    {
      "foodId": "707f1f77bcf86cd799439034",
      "foodName": "Banana",
      "quantity": 1,
      "unit": "pieces",
      "calories": 105,
      "protein": 1.3,
      "carbs": 27,
      "fats": 0.4,
      "isManualEntry": false
    },
    {
      "foodId": null,
      "foodName": "Homemade Protein Shake",
      "quantity": 1,
      "unit": "serving",
      "calories": 250,
      "protein": 30,
      "carbs": 15,
      "fats": 5,
      "isManualEntry": true
    }
  ],
  "totalCalories": 744,
  "totalProtein": 48.3,
  "totalCarbs": 108,
  "totalFats": 12.4,
  "notes": "Pre-workout meal with custom protein shake",
  "createdAt": "2025-01-15T08:30:00.000Z",
  "updatedAt": "2025-01-15T08:30:00.000Z"
}
```

**Note:** This example shows both approaches:
- Oatmeal & Banana from `FoodReference` (`isManualEntry: false`)
- Protein Shake manually entered (`isManualEntry: true`, `foodId: null`)

---

## 3️⃣ WorkoutLogs Collection

Tracks workout sessions and exercise activities.

### Schema Structure:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,                 // Reference to Users collection
  date: Date,                       // Date of workout
  workoutId: ObjectId,              // Reference to WorkoutReference (null if manual entry)
  workoutType: String,              // "cardio", "strength", "sports", "other"
  workoutName: String,              // Name of the workout (e.g., "Morning Run")
  intensity: String,                // "low", "medium", "high"
  duration: Number,                 // Duration in minutes
  caloriesBurned: Number,           // AUTO-CALCULATED or manually entered (user can override)
  metValue: Number,                 // MET value used for calculation (if from WorkoutReference)
  isManualEntry: Boolean,           // true if user manually entered (not from WorkoutReference)
  notes: String,                    // Optional notes
  createdAt: Date,
  updatedAt: Date
}
```

###  Calorie Calculation Approach:
**Similar to FoodLogs - Auto-calculate with manual override option**

**Workflow:**
1. User selects workout from `WorkoutReference` OR enters manually
2. If from WorkoutReference:
   - System retrieves MET value based on intensity
   - Auto-calculates: `Calories = MET × Weight (kg) × Duration (hours)`
   - User can **adjust** the calculated value if needed
3. If manual entry:
   - User enters workout name, duration, and calories directly
   - `isManualEntry = true`

### Indexes:
- `userId` + `date` (compound index)
- `userId`

### Example Document (From WorkoutReference):
```json
{
  "_id": "807f1f77bcf86cd799439044",
  "userId": "507f1f77bcf86cd799439011",
  "date": "2025-01-15T00:00:00.000Z",
  "workoutId": "907f1f77bcf86cd799439077",
  "workoutType": "strength",
  "workoutName": "Strength Training",
  "intensity": "high",
  "duration": 60,
  "caloriesBurned": 375,
  "metValue": 5.0,
  "isManualEntry": false,
  "notes": "Felt strong today!",
  "createdAt": "2025-01-15T18:00:00.000Z",
  "updatedAt": "2025-01-15T18:00:00.000Z"
}
```

**Calculation:** MET (5.0) × Weight (75 kg) × Duration (1 hour) = 375 calories

### Example Document (Manual Entry):
```json
{
  "_id": "807f1f77bcf86cd799439045",
  "userId": "507f1f77bcf86cd799439011",
  "date": "2025-01-16T00:00:00.000Z",
  "workoutId": null,
  "workoutType": "other",
  "workoutName": "Rock Climbing",
  "intensity": "medium",
  "duration": 90,
  "caloriesBurned": 450,
  "metValue": null,
  "isManualEntry": true,
  "notes": "Indoor climbing gym",
  "createdAt": "2025-01-16T19:00:00.000Z",
  "updatedAt": "2025-01-16T19:00:00.000Z"
}
```

---

## 4️⃣ SleepLogs Collection

Records sleep patterns and quality.

### Schema Structure:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,                 // Reference to Users collection
  date: Date,                       // Date of the sleep (date when user went to bed)
  sleepStartTime: Date,             // When user went to sleep
  sleepEndTime: Date,               // When user woke up
  totalDuration: Number,            // Total sleep in hours (calculated)
  sleepQuality: String,             // "poor", "fair", "good", "excellent"
  notes: String,                    // Optional notes (e.g., "Woke up 3 times")
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes:
- `userId` + `date` (compound index)
- `userId`

### Example Document:
```json
{
  "_id": "907f1f77bcf86cd799439055",
  "userId": "507f1f77bcf86cd799439011",
  "date": "2025-01-14T00:00:00.000Z",
  "sleepStartTime": "2025-01-14T23:00:00.000Z",
  "sleepEndTime": "2025-01-15T07:00:00.000Z",
  "totalDuration": 8,
  "sleepQuality": "good",
  "notes": "Deep sleep, felt refreshed",
  "createdAt": "2025-01-15T07:30:00.000Z",
  "updatedAt": "2025-01-15T07:30:00.000Z"
}
```

---

## 5️⃣ Goals Collection

Stores user fitness goals and daily targets.

### Schema Structure:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,                 // Reference to Users collection (One-to-One)
  dailyCalorieTarget: Number,       // Target calorie intake per day
  dailyCalorieBurnTarget: Number,   // Target calories to burn per day
  dailyWorkoutTarget: Number,       // Target workout duration in minutes
  dailySleepTarget: Number,         // Target sleep hours per day
  weeklyWorkoutTarget: Number,      // Target number of workouts per week
  targetWeight: Number,             // Target weight in kg
  targetWeightDate: Date,           // Date to achieve target weight
  macroTargets: {
    protein: Number,                // Daily protein target in grams
    carbs: Number,                  // Daily carbs target in grams
    fats: Number                    // Daily fats target in grams
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes:
- `userId` (unique - one goal document per user)

### Example Document:
```json
{
  "_id": "a07f1f77bcf86cd799439066",
  "userId": "507f1f77bcf86cd799439011",
  "dailyCalorieTarget": 2500,
  "dailyCalorieBurnTarget": 500,
  "dailyWorkoutTarget": 60,
  "dailySleepTarget": 8,
  "weeklyWorkoutTarget": 5,
  "targetWeight": 70,
  "targetWeightDate": "2025-06-01T00:00:00.000Z",
  "macroTargets": {
    "protein": 150,
    "carbs": 250,
    "fats": 70
  },
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-10T00:00:00.000Z"
}
```

---

## 6️⃣ FoodReference Collection

Database of standard foods with nutritional information.

### Schema Structure:
```javascript
{
  _id: ObjectId,
  foodName: String,                 // Name of the food
  category: String,                 // "fruits", "vegetables", "grains", "protein", "dairy", etc.
  servingSize: Number,              // Standard serving size
  servingUnit: String,              // "grams", "ml", "pieces", "cups"
  nutritionPer100g: {               // Nutrition values per 100g
    calories: Number,
    protein: Number,                // in grams
    carbs: Number,                  // in grams
    fats: Number,                   // in grams
    fiber: Number,                  // in grams
    sugar: Number                   // in grams
  },
  isVerified: Boolean,              // If nutritional data is verified
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes:
- `foodName` (text index for search)
- `category`

### Example Document:
```json
{
  "_id": "707f1f77bcf86cd799439033",
  "foodName": "Oatmeal",
  "category": "grains",
  "servingSize": 40,
  "servingUnit": "grams",
  "nutritionPer100g": {
    "calories": 389,
    "protein": 17,
    "carbs": 66,
    "fats": 7,
    "fiber": 10.6,
    "sugar": 0.99
  },
  "isVerified": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

---

## 7️⃣ WorkoutReference Collection

Database of standard workouts with MET values for calorie calculation.

### Schema Structure:
```javascript
{
  _id: ObjectId,
  workoutName: String,              // Name of the workout (e.g., "Running", "Cycling")
  workoutType: String,              // "cardio", "strength", "sports", "other"
  category: String,                 // More specific category (e.g., "Running", "Swimming")
  metValues: {                      // MET values by intensity level
    low: Number,                    // MET for low intensity
    medium: Number,                 // MET for medium intensity
    high: Number                    // MET for high intensity
  },
  description: String,              // Optional description of the workout
  isVerified: Boolean,              // If MET values are verified/accurate
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes:
- `workoutName` (text index for search)
- `workoutType`
- `category`

### Example Documents:
```json
{
  "_id": "907f1f77bcf86cd799439077",
  "workoutName": "Running",
  "workoutType": "cardio",
  "category": "Running",
  "metValues": {
    "low": 6.0,
    "medium": 9.0,
    "high": 12.5
  },
  "description": "Outdoor or treadmill running",
  "isVerified": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

```json
{
  "_id": "907f1f77bcf86cd799439078",
  "workoutName": "Strength Training",
  "workoutType": "strength",
  "category": "Weightlifting",
  "metValues": {
    "low": 3.0,
    "medium": 5.0,
    "high": 6.0
  },
  "description": "General weight training and resistance exercises",
  "isVerified": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

```json
{
  "_id": "907f1f77bcf86cd799439079",
  "workoutName": "Cycling",
  "workoutType": "cardio",
  "category": "Cycling",
  "metValues": {
    "low": 4.0,
    "medium": 8.0,
    "high": 12.0
  },
  "description": "Stationary or outdoor cycling",
  "isVerified": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### 📋 Common MET Values Reference:

| Workout Type | Category | Low | Medium | High |
|--------------|----------|-----|--------|------|
| Cardio | Running | 6.0 | 9.0 | 12.5 |
| Cardio | Cycling | 4.0 | 8.0 | 12.0 |
| Cardio | Swimming | 6.0 | 8.0 | 11.0 |
| Cardio | Walking | 3.5 | 4.5 | 5.0 |
| Strength | Weight Training | 3.0 | 5.0 | 6.0 |
| Strength | Bodyweight | 3.5 | 4.5 | 5.5 |
| Sports | Basketball | 6.0 | 8.0 | 10.0 |
| Sports | Soccer | 7.0 | 8.0 | 10.0 |
| Sports | Tennis | 5.0 | 7.0 | 8.0 |


---


```

--
*