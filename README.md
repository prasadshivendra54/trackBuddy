##App is runing on vercel





Fuelbuddy – Hiring Challenge
Goal
Build a small web app that tracks habits and calculates streaks. The app should be built in
React with TypeScript. The focus is on correctness, state management, and clean code.
Core Requirements
1. Multiple Habits
○ Users should be able to create more than one habit (for example: &quot;Read 10
pages&quot;, &quot;Workout&quot;, &quot;Meditate&quot;).
○ Each habit should maintain its own streak separately.
2. Daily vs Weekly Tracking
○ When creating a habit, the user must choose whether it is tracked daily or
weekly.
3. Daily habits:
○ A daily habit can be marked as &quot;done&quot; once per day.
○ Example:
■ Habit = &quot;Meditate&quot; (daily)
■ Completed on Monday and Tuesday → streak = 2
■ Skipped Wednesday → streak resets to 0
■ Completed Thursday → streak = 1

4. Weekly habits:
○ A weekly habit has a goal like &quot;3 times per week&quot;.
○ Example:
■ Habit = &quot;Workout&quot; (weekly, 3 times/week)

■ Week 1: completed 3 times → streak = 1
■ Week 2: completed 4 times → streak = 2
■ Week 3: completed only 2 times → streak resets to 0
■ Week 4: completed 3 times → streak = 1 again

5. Streaks &amp; History
○ For each habit, show:
■ Current streak (ongoing consecutive success count)
■ Longest streak ever achieved
○ Users must be able to back-fill previous days.
Example:
■ Habit = &quot;Meditate&quot; (daily)
■ Forgot to mark Tuesday but actually completed it.
■ User goes back and marks Tuesday as done.
■ If Wednesday is also complete, streak becomes 3 (Mon, Tue, Wed).

6. Persistence
○ All habits, streaks, and history must be saved in the browser (localStorage or
IndexedDB).
○ The data must survive page refresh and closing/reopening the browser.
7. User Interface
○ A dashboard showing all habits with:
■ Name of the habit
■ Daily/weekly type and goal
■ Current streak and longest streak
○ Ability to:
■ Add a new habit

■ Mark today’s progress (or a past day)
■ Switch a habit between daily and weekly tracking (streaks must
recalculate properly)

○ A simple date navigation to test marking past days (for example, move to
&quot;yesterday&quot; and mark a habit done).

Examples of Expected Behavior
Daily Habit Example:
● Habit = &quot;Read&quot; (daily)
● User marks done on Jan 1, Jan 2, Jan 3 → streak = 3
● User skips Jan 4 → streak resets to 0
● User marks done on Jan 5 → streak = 1
● Longest streak so far = 3

Weekly Habit Example:
● Habit = &quot;Exercise&quot; (weekly, 3 times/week)
● Week 1: User completes 3 times → streak = 1
● Week 2: User completes 5 times → streak = 2 (success counts even if more than 3)
● Week 3: User completes only 1 time → streak resets to 0
● Week 4: User completes 3 times → streak = 1
● Longest streak so far = 2

Back-fill Example:
● Habit = &quot;Meditate&quot; (daily)

● User completes Mon and Wed, but forgot to mark Tue
● Initially streak = 1 (Wed only, because Tue is missing)
● User later back-fills Tue as completed
● Streak recalculates to 3 (Mon, Tue, Wed)

Deliverables
● A React + TypeScript app that we can run locally.
● Code pushed to a public GitHub repository (so we can fork and run).

Rules
● No AI-generated code (ChatGPT, Copilot, Codeium, etc.). We want to see your own
problem-solving and coding style.
● Code should be clean, readable, and modular. Comments are welcome if they explain
important design choices.
● You may use Zustand library for state management and any other necessary libraries
(e.g. for date-time management) but only if you explain why you chose them.

Timeframe
● You have 2 full days to complete the challenge.