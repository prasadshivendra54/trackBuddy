import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#45556C] text-white flex flex-col py-14 sm:py-32">
      {/* ---------------- Hero Section -------- */}
      <section className="px-10 py-6 sm:text-left">
        <h1 className="text-3xl sm:text-6xl font-bold mb-6 leading-tight">
          Track Your Habits & 
          <br className="hidden sm:block" />
          Achieve What You Want.
        </h1>
        <p className="text-md sm:text-xl max-w-2xl mx-auto sm:mx-0">
          TrackBuddy helps you stay consistent, monitor your progress, and
          build lasting habits with ease.
        </p>
      </section>

      {/* -------------- Features Section --------------------------- */}
      <section className="px-10 py-10">
        <h2 className="text-3xl font-semibold sm:text-left">
          Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
          {/* Feature 1 */}
          <div className="border border-pink-500 p-10 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">
              Daily & Weekly Tracking
            </h3>
            <p className="text-gray-200">
              Track your habits daily or weekly and monitor your streaks effortlessly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border border-pink-500 p-10 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">Streaks & Progress</h3>
            <p className="text-gray-200">
              Stay motivated by tracking your current and longest streaks for every habit.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="border border-pink-500 p-10 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">Responsive Dashboard</h3>
            <p className="text-gray-200">
              Access your habits from any device with a clean, responsive interface.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
