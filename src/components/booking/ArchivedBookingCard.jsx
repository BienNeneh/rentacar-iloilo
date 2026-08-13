function ArchivedBookingCard({
  booking,
  highlightedBooking,
}) {
  const isHighlighted = highlightedBooking === booking.id;

  return (
    <div
      id={`booking-${booking.id}`}
      className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-6 transition-all duration-500 ${
        isHighlighted
          ? "bg-orange-50 border-orange-400 ring-4 ring-orange-200"
          : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Previous Rental
          </h2>

          <p className="text-gray-500 mt-1">
            {booking.pickupDate} → {booking.returnDate}
          </p>

          <p className="text-gray-500 mt-1">
            ₱{Number(booking.totalPrice).toLocaleString()}
          </p>
        </div>

        <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full font-semibold self-start">
          🗃️ Archived
        </span>

      </div>

      <p className="text-sm text-gray-400 mt-4">
        This vehicle is no longer available.
      </p>
    </div>
  );
}

export default ArchivedBookingCard;