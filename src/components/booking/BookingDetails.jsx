import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

function BookingDetails({ booking }) {
  return (
    <div className="space-y-6">

      {/* =====================================================
          RENTER
      ===================================================== */}
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <FaUser className="text-purple-500" />
          <span>Requested By</span>
        </div>

        <div className="mt-3">
          <h3 className="text-lg font-bold text-gray-900">
            {booking.renterName || booking.renterEmail}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <FaEnvelope className="text-gray-400" />

            <span className="break-all">
              {booking.renterEmail}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          DIVIDER
      ===================================================== */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* =====================================================
          BOOKING INFORMATION
      ===================================================== */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

        {/* Pickup */}
        <div
          className="
            rounded-2xl
            border
            border-orange-100
            bg-gradient-to-br
            from-orange-50
            to-white
            p-4
          "
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <FaCalendarAlt className="text-orange-500" />
            <span>Pickup</span>
          </div>

          <p className="mt-2 text-sm font-bold text-gray-900">
            {booking.pickupDate}
          </p>
        </div>

        {/* Return */}
        <div
          className="
            rounded-2xl
            border
            border-purple-100
            bg-gradient-to-br
            from-purple-50
            to-white
            p-4
          "
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <FaCalendarCheck className="text-purple-500" />
            <span>Return</span>
          </div>

          <p className="mt-2 text-sm font-bold text-gray-900">
            {booking.returnDate}
          </p>
        </div>

        {/* Rental Days */}
        <div
          className="
            rounded-2xl
            border
            border-blue-100
            bg-gradient-to-br
            from-blue-50
            to-white
            p-4
          "
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <FaClock className="text-blue-500" />
            <span>Rental Days</span>
          </div>

          <p className="mt-2 text-sm font-bold text-gray-900">
            {booking.rentalDays}{" "}
            {Number(booking.rentalDays) === 1 ? "day" : "days"}
          </p>
        </div>

        {/* Total */}
        <div
          className="
            rounded-2xl
            border
            border-emerald-100
            bg-gradient-to-br
            from-emerald-50
            to-white
            p-4
          "
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <FaMoneyBillWave className="text-emerald-500" />
            <span>Total</span>
          </div>

          <p className="mt-2 text-lg font-extrabold text-emerald-600">
            ₱{Number(booking.totalPrice).toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
}

export default BookingDetails;