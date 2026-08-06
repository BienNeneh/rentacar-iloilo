function BookingActions({
  booking,
  approveBooking,
  rejectBooking,
  cancelBooking,
}) {
  return (
    <div className="flex justify-end gap-4 mt-8">

      {/* Pending Booking */}
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

      {/* Approved Booking */}
      {booking.status === "Approved" && (
        <button
          onClick={() => cancelBooking(booking.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Cancel Booking
        </button>
      )}

      {/* Rejected & Cancelled Bookings */}
      {(booking.status === "Rejected" ||
        booking.status === "Cancelled") && null}

    </div>
  );
}

export default BookingActions;