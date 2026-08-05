function BookingDetails({ booking }) {
  return (
    <>
      {/* Requested By */}

      <div>

        <p className="text-gray-500 font-semibold">
          👤 Requested By
        </p>

        <h3 className="text-xl font-semibold mt-2">
          {booking.renterName || booking.renterEmail}
        </h3>

        <p className="text-gray-500 mt-1">
          {booking.renterEmail}
        </p>

      </div>

      {/* Booking Details */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div>
          <p className="text-gray-500">
            Pickup
          </p>

          <h3 className="font-bold mt-1">
            {booking.pickupDate}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Return
          </p>

          <h3 className="font-bold mt-1">
            {booking.returnDate}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Rental Days
          </p>

          <h3 className="font-bold mt-1">
            {booking.rentalDays}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Total
          </p>

          <h3 className="font-bold text-blue-600 mt-1">
            ₱{Number(booking.totalPrice).toLocaleString()}
          </h3>
        </div>

      </div>
    </>
  );
}

export default BookingDetails;