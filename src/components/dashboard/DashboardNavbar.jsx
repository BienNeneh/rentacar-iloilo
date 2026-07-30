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
      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-orange-100 shadow-lg">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex justify-between items-center">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">

              <FaCarSide className="text-orange-500 text-2xl" />

            </div>

            <div>

              <h1 className="text-xl md:text-2xl font-black text-[#3A2A27]">

                Rent<span className="text-orange-500">ACar</span>

              </h1>

              <p className="hidden sm:block text-xs text-gray-500">

                Iloilo Community Car Rental

              </p>

            </div>

          </Link>

          {/* Desktop Navigation */}

          <div className="hidden lg:flex items-center gap-12">

            <div className="flex items-center gap-10">

              <Link
                to="/"
                className="font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                Home
              </Link>

              <Link
                to="/list-car"
                className="font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                Browse Cars
              </Link>

              {user && (
                <>
                  <Link
                    to="/booking-requests"
                    className="font-semibold text-gray-700 hover:text-orange-500 transition"
                  >
                    Booking Requests
                  </Link>

                  <Link
                    to="/my-cars"
                    className="font-semibold text-gray-700 hover:text-orange-500 transition"
                  >
                    My Cars
                  </Link>

                  <Link
                    to="/my-bookings"
                    className="font-semibold text-gray-700 hover:text-orange-500 transition"
                  >
                    My Bookings
                  </Link>
                </>
              )}

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-5">

              {user ? (
                <>

                  <button className="w-11 h-11 rounded-full bg-orange-50 hover:bg-orange-100 transition flex items-center justify-center">

                    <FaBell className="text-orange-500 text-lg" />

                  </button>

                  <div className="flex items-center gap-3 bg-orange-50 rounded-full px-4 py-2">

                    <FaUserCircle className="text-5xl text-orange-500" />

                    <div>

                      <h2 className="font-semibold leading-none">

                        {userProfile?.fullName?.split(" ")[0] || "User"}

                      </h2>

                      <p className="text-sm text-gray-500">

                        Member

                      </p>

                    </div>

                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-3 font-semibold flex items-center gap-2 transition"
                  >

                    <FaSignOutAlt />

                    Logout

                  </button>

                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-semibold hover:text-orange-500 transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-full font-semibold transition"
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
            className="lg:hidden w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"
          >

            <FaBars />

          </button>

        </div>

      </nav>

      {/* Overlay */}

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-50 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}

      <div
        className={`fixed
        top-0
        left-0
        h-screen
        w-[340px]
        max-w-[90vw]
        bg-[#FFF8ED]
        border-r
        border-orange-100
        shadow-2xl
        z-[60]
        flex
        flex-col
        transition-transform
        duration-300
        ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Drawer Header */}

        <div className="flex items-center justify-between p-6 border-b border-orange-100">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">

              <FaCarSide className="text-orange-500 text-2xl" />

            </div>

            <div>

              <h2 className="font-black text-xl">

                Rent<span className="text-orange-500">ACar</span>

              </h2>

            </div>

          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-orange-50 hover:bg-orange-100 transition flex items-center justify-center"
          >

            <FaTimes className="text-orange-500" />

          </button>

        </div>
        {/* User */}

        <div className="p-6 border-b border-orange-100">

          <div className="flex items-center gap-4">

            <FaUserCircle className="text-6xl text-orange-500" />

            <div>

              <h2 className="font-bold text-lg text-[#3A2A27]">
                {user
                  ? userProfile?.fullName?.split(" ")[0] || "User"
                  : "Guest"}
              </h2>

              <p className="text-sm text-gray-500">
                {user ? "Member" : "Welcome to RentACar"}
              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <div className="flex-1 py-5 px-2 space-y-2">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-orange-100 transition"
          >
            <FaHome className="text-orange-500" />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/list-car"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-orange-100 transition"
          >
            <FaCarSide className="text-orange-500" />
            <span className="font-medium">Browse Cars</span>
          </Link>

          {user && (
            <>
              <Link
                to="/booking-requests"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-orange-100 transition"
              >
                <FaClipboardList className="text-orange-500" />
                <span className="font-medium">Booking Requests</span>
              </Link>

              <Link
                to="/my-cars"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-orange-100 transition"
              >
                <FaCarSide className="text-orange-500" />
                <span className="font-medium">My Cars</span>
              </Link>

              <Link
                to="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-orange-100 transition"
              >
                <FaCalendarAlt className="text-orange-500" />
                <span className="font-medium">My Bookings</span>
              </Link>
            </>
          )}

        </div>

        {/* Bottom Area */}

        <div className="border-t border-orange-100 p-6">

          {user ? (

            <button
              onClick={handleLogout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          ) : (

            <div className="space-y-3">

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 border border-orange-200 rounded-xl py-3 hover:bg-orange-50 transition"
              >
                <FaSignInAlt />
                Sign In
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-semibold transition"
              >
                Get Started
              </Link>

            </div>

          )}

        </div>

      </div>

    </>
  );
}

export default DashboardNavbar;