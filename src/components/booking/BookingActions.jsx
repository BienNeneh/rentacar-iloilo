function BookingActions({
  booking,
  approveBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {/* =========================
          Pending Booking
      ========================= */}

      {booking.status === "Pending" && (
        <>
          <button
            onClick={() => rejectBooking(booking.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Reject
          </button>

          <button
            onClick={() => approveBooking(booking.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Approve
          </button>
        </>
      )}

      {/* =========================
          Approved Booking
      ========================= */}

      {booking.status === "Approved" && (
        <>
          <button
            onClick={() => cancelBooking(booking.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Cancel Booking
          </button>

          <button
            onClick={() => completeBooking(booking.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Mark Rental Completed
          </button>
        </>
      )}

      {/* =========================
          Completed Booking
      ========================= */}

      {booking.status === "Completed" && (
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          ✅ Rental Completed
        </span>
      )}

      {/* =========================
          Rejected & Cancelled
      ========================= */}

      {(booking.status === "Rejected" ||
        booking.status === "Cancelled") && null}

    </div>
  );
}

export default BookingActions;