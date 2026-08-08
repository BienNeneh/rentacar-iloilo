import { Link } from "react-router-dom";

function DesktopNavigation({ user }) {
  return (
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
  );
}

export default DesktopNavigation;