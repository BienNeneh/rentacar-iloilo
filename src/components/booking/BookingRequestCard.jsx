import BookingStatusBadge from "./BookingStatusBadge";
import BookingDetails from "./BookingDetails";
import BookingActions from "./BookingActions";

function BookingRequestCard({
  booking,
  approveBooking,
  rejectBooking,
  cancelBooking,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">

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

        {/* Status Badge */}
        <div className="self-start md:self-auto">
          <BookingStatusBadge status={booking.status} />
        </div>

      </div>

      <hr className="my-6" />

      <BookingDetails booking={booking} />

      <BookingActions
        booking={booking}
        approveBooking={approveBooking}
        rejectBooking={rejectBooking}
        cancelBooking={cancelBooking}
      />

    </div>
  );
}

export default BookingRequestCard;