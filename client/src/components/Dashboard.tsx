import React, { useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { addHabit, toggleHabit, switchType } from "../redux/slices/habitSlice";

dayjs.extend(weekOfYear);

const Dashboard: React.FC = () => {
  // get all habits from redux storee
  const habits = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  // local states for new habit form
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitType, setNewHabitType] = useState<"daily" | "weekly">("daily");
  const [newWeeklyGoal, setNewWeeklyGoal] = useState(1);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  // add new habit
  const handleAddHabit = () => {
    if (!newHabitName) return;
    dispatch(addHabit({ name: newHabitName, type: newHabitType, weeklyGoal: newWeeklyGoal }));
    setNewHabitName(""); // reset input after adding
  };

  // Mark done for selected date
  const handleToggleHabit = (habitId: string) => {
    dispatch(toggleHabit({ id: habitId, date: selectedDate }));
  };

  // switch between daily and weekly habit type
  const handleSwitchType = (habitId: string) => {
    dispatch(switchType(habitId));
  };

  return (
    <div className="flex min-h-screen bg-[#45556C]">
      <main className="flex-1 p-6 transition-all">
        {/* welcome text */}
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Welcome to{" "}
          <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
            <span className="relative text-white">trackBuddy</span>
          </span>
        </h1>

        {/* date selector box */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">My Habits</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </header>

        {/* New habit add section */}
        <div className="mb-8 bg-white p-4 rounded-2xl shadow flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="text"
            placeholder="Enter your habit..."
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            required
            className="p-2 rounded-2xl flex-1 w-full sm:w-auto focus:ring-2 focus:ring-blue-400"
          />

          {/* habit type selector */}
          <select
            value={newHabitType}
            onChange={(e) => setNewHabitType(e.target.value as "daily" | "weekly")}
            className="border p-2 rounded-2xl focus:ring-2 focus:ring-blue-400"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          {/* weekly goal */}
          {newHabitType === "weekly" && (
            <input
              type="number"
              min={1}
              value={newWeeklyGoal}
              onChange={(e) => setNewWeeklyGoal(parseInt(e.target.value))}
              className="border p-2 rounded-2xl w-24 focus:ring-2 focus:ring-blue-400"
            />
          )}

          <button
            onClick={handleAddHabit}
            className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-2 rounded-2xl shadow cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Maping List of all habits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit: Habit) => (
            <div
              key={habit.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition flex flex-col gap-3"
            >
              {/* habit name and  type change */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">{habit.name}</h3>
                <button
                  onClick={() => handleSwitchType(habit.id)}
                  className="text-sm px-3 py-1 rounded-2xl cursor-pointer text-white bg-blue-400 hover:bg-blue-500 transition"
                >
                  {habit.type === "daily" ? "Daily" : "Weekly"}
                </button>
              </div>

              {/* weekly goal content */}
              {habit.type === "weekly" && habit.weeklyGoal && (
                <p className="text-gray-600">
                  Weekly Goal:{" "}
                  <span className="font-semibold text-black">{habit.weeklyGoal}</span>
                </p>
              )}

              {/* streak details */}
              <p className="text-gray-600">
                Current Streak:{" "}
                <span className="font-bold text-blue-600">{habit.currentStreak}</span>
              </p>
              <p className="text-gray-600">
                Longest Streak:{" "}
                <span className="font-bold text-pink-500">{habit.longestStreak}</span>
              </p>

              {/* toggle done or undone button */}
              <button
                onClick={() => handleToggleHabit(habit.id)}
                className={`py-2 px-4 rounded-lg shadow cursor-pointer ${
                  habit.history.includes(selectedDate)
                    ? "text-white bg-blue-400 hover:bg-blue-500"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {habit.history.includes(selectedDate) ? "Done" : "Mark Done"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
