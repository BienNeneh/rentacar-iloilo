import {
  FaCheck,
  FaTimes,
  FaBan,
  FaFlagCheckered,
} from "react-icons/fa";

function BookingActions({
  booking,
  approveBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">

      {/* =========================
          Pending Booking
      ========================= */}
      {booking.status === "Pending" && (
        <>
          {/* Reject */}
          <button
            onClick={() => rejectBooking(booking.id)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-5
              py-3
              font-semibold
              text-red-600
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-red-300
              hover:bg-red-100
              hover:shadow-md
            "
          >
            <FaTimes />
            Reject
          </button>

          {/* Approve */}
          <button
            onClick={() => approveBooking(booking.id)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-emerald-500
              to-green-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:from-emerald-600
              hover:to-green-700
              hover:shadow-md
            "
          >
            <FaCheck />
            Approve
          </button>
        </>
      )}

      {/* =========================
          Approved Booking
      ========================= */}
      {booking.status === "Approved" && (
        <>
          {/* Cancel */}
          <button
            onClick={() => cancelBooking(booking.id)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-5
              py-3
              font-semibold
              text-red-600
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-red-300
              hover:bg-red-100
              hover:shadow-md
            "
          >
            <FaBan />
            Cancel Booking
          </button>

          {/* Complete */}
          <button
            onClick={() => completeBooking(booking.id)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-violet-500
              to-purple-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:from-violet-600
              hover:to-purple-700
              hover:shadow-md
            "
          >
            <FaFlagCheckered />
            Mark Rental Completed
          </button>
        </>
      )}

      {/* =========================
          Completed Booking
      ========================= */}
      {booking.status === "Completed" && (
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-emerald-200
            bg-emerald-50
            px-5
            py-3
            font-semibold
            text-emerald-700
          "
        >
          <FaCheck />
          Rental Completed
        </div>
      )}

    </div>
  );
}

export default BookingActions;