🏆 TrackBuddy – Habit Tracker (MERN + TypeScript)

A MERN stack web app to track daily & weekly habits with streaks and history.

🚀 Live Demo

App: [TrackBuddy](https://trackbuddy-five.vercel.app/)

Backend: [API](https://trackbuddy-five.vercel.app/)

🛠️ Features

Add multiple habits (daily or weekly).

Track current streak and longest streak.

Back-fill missed days.

Data saved in localStorage + MongoDB.

User authentication with JWT.

💻 Tech Stack

Frontend: React, TypeScript, Redux Toolkit, TailwindCSS

Backend: Node.js, Express.js, MongoDB, JWT

Deployment: Vercel



⚙️ Setup Locally

1, Clone Repo
git clone https://github.com/prasadshivendra54/trackBuddy.git
cd trackbuddy

2, Backend
cd server
npm install

Create .env


PORT=5000
URI=your-mongodb-uri
JWT_SECRET=your-secret-key

npm run dev


--------------

Frontend
cd ../client
npm install


Create .env


VITE_BACKEND_URL=http://localhost:5000
npm run dev
