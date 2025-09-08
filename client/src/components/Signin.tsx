import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { signin } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Signin: React.FC = () => {
  // Local state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux & navigation hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  // If the user came from a protected route, redirect them there
  const redirect = new URLSearchParams(location.search).get("redirect") || "/dashboard";

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  // Error toast message if login fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
  };

  return (
    <div className="flex min-h-screen bg-[#45556C]">
      {/* ------ Left Illustration Image link from google ------------- */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://play-lh.googleusercontent.com/7cwJD9wRKPu1xnSomH7UI0ICAXT_lJt7JAJa76Nut0oYH__b2XvjaUUpJHQhhx41roA"
          alt="Signin illustration"
          className="h-[780px] w-full object-cover"
        />
      </div>

      {/* --------------- Right Form Section --------- */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md backdrop-blur-md p-8 rounded-2xl border border-pink-500 shadow-lg text-white"
        >
          <h2 className="text-2xl font-bold text-center mb-2">Welcome Buddy! 👋</h2>
          <p className="text-center mb-6 text-sm">
            Enter your email and password to sign in
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl border focus:ring-pink-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 rounded-xl border focus:ring-pink-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold p-3 cursor-pointer rounded-xl transition duration-300"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Signup redirect */}
          <p className="mt-6 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
