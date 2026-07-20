import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaCarSide,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function DashboardNavbar() {
const navigate = useNavigate();
const { user, userProfile } = useAuth();
const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/");
  } catch (error) {
    console.error(error);
    alert("Failed to logout.");
  }
};
  return (
    <nav className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
  to="/"
  className="flex items-center gap-3"
>
          <FaCarSide className="text-3xl text-blue-600" />

          <div>
            <h1 className="text-2xl font-bold">
              Rent<span className="text-blue-600">ACar</span>
            </h1>

           <p className="text-xs text-gray-500">
  Iloilo Community Car Rental
</p>
          </div>

        </Link>

       {/* Menu */}

<div className="hidden md:flex items-center gap-10 font-medium">

  <Link
    to="/"
    className="hover:text-blue-600 transition"
  >
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
        to="/add-car"
        className="hover:text-blue-600 transition"
      >
        List My Car
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

      {/* Right Side */}
<div className="flex items-center gap-6">

  {user ? (
    <>
      <FaBell
        className="
          text-2xl
          text-gray-600
          hover:text-blue-600
          cursor-pointer
        "
      />

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


    </nav>
  );
}

export default DashboardNavbar;