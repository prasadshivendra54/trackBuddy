import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

// habit interface looks like this
export interface Habit {
  id: string;
  name: string;
  type: "daily" | "weekly";
  weeklyGoal?: number;
  history: string[];
  currentStreak: number;
  longestStreak: number;
}

// Function to check streaks (daily or weekly)
const calculateStreaks = (habit: Habit) => {
  const dates = habit.history
    .map((d) => dayjs(d))
    .sort((a, b) => a.diff(b, "day"));

  let currentStreak = 0;
  let longestStreak = 0;

  // For daily habits
  if (habit.type === "daily") {
    for (let i = 0; i < dates.length; i++) {
      if (i === 0) {
        currentStreak = 1;
        longestStreak = 1;
      } else {
        // check if today is just after yesterday
        if (dates[i].diff(dates[i - 1], "day") === 1) {
          currentStreak += 1;
        } else {
          currentStreak = 1; // reset if break
        }
        if (currentStreak > longestStreak) longestStreak = currentStreak;
      }
    }
  } else {
    // For weekly habits
    const weekMap: Record<number, number> = {};
    dates.forEach((d) => {
      const week = d.week(); // find week number
      weekMap[week] = (weekMap[week] || 0) + 1;
    });

    const sortedWeeks = Object.keys(weekMap)
      .map(Number)
      .sort((a, b) => a - b);

    currentStreak = 0;
    longestStreak = 0;

    sortedWeeks.forEach((week, index) => {
      const count = weekMap[week];
      const goal = habit.weeklyGoal || 1;

      if (index === 0) {
        currentStreak = count >= goal ? 1 : 0;
      } else {
        currentStreak = count >= goal ? currentStreak + 1 : 0;
      }
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    });
  }

  return { currentStreak, longestStreak };
};

// Get habits from localStorage (if available)
const initialState: Habit[] = JSON.parse(
  localStorage.getItem("habits") || "[]"
);

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // Add a new habit
    addHabit: (
      state,
      action: PayloadAction<
        Omit<Habit, "id" | "history" | "currentStreak" | "longestStreak">
      >
    ) => {
      const habit: Habit = {
        id: Date.now().toString(), // simple id
        name: action.payload.name,
        type: action.payload.type,
        weeklyGoal:
          action.payload.type === "weekly"
            ? action.payload.weeklyGoal
            : undefined,
        history: [],
        currentStreak: 0,
        longestStreak: 0,
      };
      state.push(habit);
      localStorage.setItem("habits", JSON.stringify(state));
    },

    // Mark a habit done or undo
    toggleHabit: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const habit = state.find((h) => h.id === action.payload.id);
      if (!habit) return;

      const historySet = new Set(habit.history);

      // if already done on this date remove, else add
      if (historySet.has(action.payload.date)) {
        historySet.delete(action.payload.date);
      } else {
        historySet.add(action.payload.date);
      }
      habit.history = Array.from(historySet);

      // update streaks again
      const streaks = calculateStreaks(habit);
      habit.currentStreak = streaks.currentStreak;
      habit.longestStreak = streaks.longestStreak;

      localStorage.setItem("habits", JSON.stringify(state));
    },

    // Change habit type daily or weekly
    switchType: (state, action: PayloadAction<string>) => {
      const habit = state.find((h) => h.id === action.payload);
      if (!habit) return;

      // chek and change type
      habit.type = habit.type === "daily" ? "weekly" : "daily";

      if (habit.type === "weekly" && !habit.weeklyGoal) habit.weeklyGoal = 1;
      if (habit.type === "daily") habit.weeklyGoal = undefined;

      // update streaks again
      const streaks = calculateStreaks(habit);
      habit.currentStreak = streaks.currentStreak;
      habit.longestStreak = streaks.longestStreak;

      localStorage.setItem("habits", JSON.stringify(state));
    },
  },
});

// Export actions and reduce
export const { addHabit, toggleHabit, switchType } = habitSlice.actions;
export default habitSlice.reducer;
