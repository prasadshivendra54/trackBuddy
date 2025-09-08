## TrackBuddy – Habit Tracker (MERN with TypeScript)

A MERN stack web app to track daily & weekly habits with streaks and history.


Live Demo: https://trackbuddy-ten.vercel.app

GitHub Repo: https://github.com/prasadshivendra54/trackBuddy



Features

Add multiple habits (daily/weekly)

Track current & longest streaks

Back-fill missed days

Data stored in localStorage + MongoDB

Authentication with JWT


Tech Stack

Frontend: React, TypeScript, Redux Toolkit, TailwindCSS
Backend: Node.js, Express.js, MongoDB, JWT
Deployment: Vercel


Setup Locally

# Clone repo
git clone https://github.com/prasadshivendra54/trackBuddy.git
cd trackBuddy

### Backend

cd server
npm install


Create .env file

PORT=5000
URI=your-mongodb-uri
JWT_SECRET=your-secret-key


Run

npm run dev

-------------------------------

### Frontend

cd ../client
npm install


Create .env file

VITE_BACKEND_URL=http://localhost:5000 

OR

VITE_BACKEND_URL=https://track-buddy.vercel.app


Run

npm run dev


--------