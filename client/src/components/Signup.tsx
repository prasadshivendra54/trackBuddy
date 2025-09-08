import { useState, useEffect, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { signup } from "../redux/slices/authSlice";

const Signup: React.FC = () => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux and router hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, token } = useSelector((state: RootState) => state.auth);
  const redirect = new URLSearchParams(location.search).get("redirect") || "/dashboard";

  // if user gets token after signup, redirect
  useEffect(() => {
    if (token) {
      navigate(redirect);
    }
  }, [token, navigate, redirect]);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signup({ name, email, password }));
  };

  return (
    <div className="flex bg-[#45556C]">
      {/* Left side illustration */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://play-lh.googleusercontent.com/7cwJD9wRKPu1xnSomH7UI0ICAXT_lJt7JAJa76Nut0oYH__b2XvjaUUpJHQhhx41roA"
          alt="Signup illustration"
          className="h-[780px] w-full object-cover"
        />
      </div>

      {/* Signup form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md border-pink-600 text-white border p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Hey buddy! 👋</h2>
          <p className="text-center mb-6">Enter your details to Sign Up</p>

          {/* Name Fiels */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Make your password"
              className="w-full p-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 cursor-pointer text-white p-2 rounded-2xl font-semibold transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          {/* Redirect to signin */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
