import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to home landing page after logout
  };

  return (
    <div className="container_fluid">
      <div className="bg-[#f1f5f9] py-[15px] px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-[100] sm:text-3xl sm:font-[200]">
          <Link to="/">
            <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
              <span className="relative text-white">trackBuddy</span>
            </span>
          </Link>
        </div>

        {/* Navigation buttons */}
        <div className="gap-4 flex font-[200] text-[#f8fafc]">
          {token ? (
            <div className="flex gap-3">
              <Link
                to="/dashboard"
                className="bg-blue-500 hover:bg-blue-600 px-2 text-sm sm:px-3 py-2 cursor-pointer rounded-full"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-pink-500 hover:bg-pink-600 px-2 text-sm sm:px-3 py-2 cursor-pointer rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full">
                <Link to="/signin">Signin</Link>
              </div>
              <div className="bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded-full">
                <Link to="/signup">Signup</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
