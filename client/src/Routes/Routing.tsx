// import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import { type ReactNode } from "react";



// This code not work in production
// // Protected route component
// // This will checks if the user is logged in. if no token is found, redirect them to signin page to signin. and if token exists, allow to redirect dashboard page.
// const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
//   const token = localStorage.getItem("userToken"); // check token in localStorage 
//   if (!token) {
//     return <Navigate to="/signin" replace />;
//   }
//   return children;
// };


// It's work

// Protected route component
// Checks if the user is logged in. If no token is found, redirects to signin page. Otherwise, renders children.
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("userToken"); // check token in localStorage
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};


// Routing
const Routing = () => {
  return (
    <BrowserRouter>
      {/* Navbar will show on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Protected dashboard page - only allow logged in users*/}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
