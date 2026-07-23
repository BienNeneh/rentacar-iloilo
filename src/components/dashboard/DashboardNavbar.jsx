import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

import {
  FaCarSide,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaCalendarAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

function DashboardNavbar() {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to logout.");
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <FaCarSide className="text-2xl md:text-3xl text-blue-600" />

            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                Rent<span className="text-blue-600">ACar</span>
              </h1>

              <p className="hidden sm:block text-xs text-gray-500">
                Iloilo Community Car Rental
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">

            <div className="flex items-center gap-8 font-medium">

              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>

              <Link
                to="/list-car"
                className="hover:text-blue-600 transition"
              >
                Browse Cars
              </Link>

              {user && (
                <>
                  <Link
                    to="/booking-requests"
                    className="hover:text-blue-600 transition"
                  >
                    Booking Requests
                  </Link>

              <Link
    to="/my-cars"
    className="hover:text-blue-600 transition"
>
    My Cars
</Link>
                  <Link
                    to="/my-bookings"
                    className="hover:text-blue-600 transition"
                  >
                    My Bookings
                  </Link>
                </>
              )}

            </div>

            {/* Desktop Right Side */}
            <div className="flex items-center gap-6">

              {user ? (
                <>
                  <FaBell className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer" />

                  <div className="flex items-center gap-3">

                    <FaUserCircle className="text-4xl text-blue-600" />

                    <div>
                      <h2 className="font-semibold">
                        {userProfile?.fullName?.split(" ")[0] || "User"}
                      </h2>

                      <p className="text-sm text-gray-500">
                        Member
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              )}

            </div>

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-3xl text-gray-700"
          >
            <FaBars />
          </button>

        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-320 max-w-[80%] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b">

          <div className="flex items-center gap-3">
            <FaCarSide className="text-3xl text-blue-600" />

            <h1 className="text-2xl font-bold">
              Rent<span className="text-blue-600">ACar</span>
            </h1>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl text-gray-700"
          >
            <FaTimes />
          </button>

        </div>

        {/* User */}
        <div className="p-6 border-b flex items-center gap-4">

          <FaUserCircle className="text-6xl text-blue-600" />

          <div>
            <h2 className="font-bold text-lg">
              {user
                ? userProfile?.fullName?.split(" ")[0] || "User"
                : "Guest"}
            </h2>

            <p className="text-gray-500">
              {user ? "Member" : "Welcome to RentACar"}
            </p>
          </div>

        </div>

        {/* Navigation */}
        <div className="flex-1 py-4">

          <Link
  to="/"
  onClick={() => setMenuOpen(false)}
  className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition duration-200 rounded-xl mx-2"
>
  <FaHome className="text-blue-600" />
  Home
</Link>

          <Link
            to="/list-car"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition duration-200 rounded-xl mx-2"
          >
            <FaCarSide className="text-blue-600" />
            Browse Cars
          </Link>

          {user ? (
            <>
              <Link
                to="/booking-requests"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition duration-200 rounded-xl mx-2"
              >
                <FaClipboardList className="text-blue-600" />
                Booking Requests
              </Link>

              <Link
                to="/add-car"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition duration-200 rounded-xl mx-2"
              >
                <FaCarSide className="text-blue-600" />
                List My Car
              </Link>

              <Link
                to="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition duration-200 rounded-xl mx-2"
              >
                <FaCalendarAlt className="text-blue-600" />
                My Bookings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition duration-200 rounded-xl mx-2"
              >
                <FaSignInAlt className="text-blue-600" />
                Sign In
              </Link>
            </>
          )}

        </div>

        {/* Bottom Button */}
        {!user && (
          <div className="p-6 border-t">
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
            >
              Get Started
            </Link>
          </div>
        )}

      </div>
    </>
  );
}

export default DashboardNavbar;