import BookingStatusBadge from "./BookingStatusBadge";

function BookingCard({
  booking,
  cancelBooking,
  highlightedBooking,
}) {
  const isHighlighted = highlightedBooking === booking.id;

  return (
    <div
      id={`booking-${booking.id}`}
      className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 transition-all duration-500 ${
        isHighlighted
          ? "bg-orange-50 border-orange-400 ring-4 ring-orange-200"
          : ""
      }`}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">

        {/* Car Information */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1">

          <img
            src={booking.car.image}
            alt={`${booking.car.brand} ${booking.car.model}`}
            className="w-full sm:w-44 h-52 sm:h-28 object-cover rounded-2xl shadow"
          />

          <div className="flex-1 min-w-0">

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">
              {booking.car.brand} {booking.car.model}
            </h2>

            <p className="text-gray-500 mt-2 font-medium">
              {booking.car.vehicleType} • {booking.car.year}
            </p>

            <p className="text-gray-600 mt-2">
              📍 {booking.car.location}
            </p>

            <p className="text-gray-600 mt-2">
              ⚙ {booking.car.transmission} • 👥 {booking.car.seats} Seats
            </p>

          </div>
        </div>

        {/* Status */}
        <div className="self-start md:self-auto">
          <BookingStatusBadge status={booking.status} />
        </div>
      </div>

      <hr className="my-6" />

      {/* Booking Details */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div>
          <p className="text-sm text-gray-500">
            Pickup
          </p>

          <p className="font-semibold mt-1">
            {booking.pickupDate}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Return
          </p>

          <p className="font-semibold mt-1">
            {booking.returnDate}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Rental Days
          </p>

          <p className="font-semibold mt-1">
            {booking.rentalDays}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Total
          </p>

          <p className="font-semibold mt-1 text-blue-600">
            ₱{Number(booking.totalPrice).toLocaleString()}
          </p>
        </div>

      </div>

      {/* Cancel Booking */}
      {booking.status === "Pending" && (
        <div className="mt-6">
          <button
            onClick={() => cancelBooking(booking.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-3 rounded-xl transition"
          >
            Cancel Booking
          </button>
        </div>
      )}

    </div>
  );
}

export default BookingCard;