function BookingActions({
  booking,
  approveBooking,
  rejectBooking,
}) {
  if (booking.status !== "Pending") {
    return null;
  }

  return (
    <div className="flex justify-end gap-4 mt-8">

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

    </div>
  );
}

export default BookingActions;