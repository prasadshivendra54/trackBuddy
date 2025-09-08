const mongoose = require("mongoose");

// Create Habit Schema
const habitSchema = new mongoose.Schema(
  {
    habitName: {
      type: String,
      required: true,
    },
    type: { 
      type: String, 
      enum: ["daily", "weekly"], 
      required: true 
    },
    goal: { 
      type: Number, 
      default: 1 
    },
    currentStreak: { 
      type: Number, 
      default: 0 
    },
    longestStreak: { 
      type: Number, 
      default: 0 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

// Model
const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
