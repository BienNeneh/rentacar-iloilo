import BookingStatusBadge from "./BookingStatusBadge";

function BookingCard({
  booking,
  cancelBooking,
  highlightedBooking,
}) {
  const isHighlighted =
    highlightedBooking === booking.id;

  const car = booking.car;

  return (
    <div
      id={`booking-${booking.id}`}
      className={`
        group
        relative
        overflow-hidden
        bg-white
        rounded-[2rem]
        border
        border-orange-100
        shadow-lg
        transition-all
        duration-500

        ${
          isHighlighted
            ? "bg-orange-50 border-orange-400 ring-4 ring-orange-200 shadow-xl"
            : "hover:-translate-y-1 hover:shadow-xl"
        }
      `}
    >

      {/* =====================================================
          Sunset Accent
      ===================================================== */}

      <div
        className="
          h-1.5
          bg-gradient-to-r
          from-orange-400
          via-pink-400
          to-purple-400
        "
      />

      <div className="p-5 sm:p-6 lg:p-7">

        {/* =====================================================
            Header
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >

          {/* =================================================
              Car
          ================================================= */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
              sm:gap-5
              min-w-0
              flex-1
            "
          >

            {/* Car Image */}

            <div
              className="
                w-full
                sm:w-40
                lg:w-44
                shrink-0
                aspect-[16/10]
                sm:aspect-[4/3]
                overflow-hidden
                rounded-2xl
                bg-gray-100
                shadow-sm
              "
            >
              <img
                src={
                  car?.images?.length > 0
                    ? car.images[0]
                    : car?.image
                }
                alt={`${car?.brand || ""} ${
                  car?.model || ""
                }`}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />
            </div>

            {/* Vehicle Information */}

            <div className="min-w-0 flex-1">

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-gray-900
                  break-words
                "
              >
                {car?.brand} {car?.model}
              </h2>

              {/* Type / Year */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  mt-2
                "
              >

                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-orange-50
                    px-3
                    py-1
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-orange-700
                  "
                >
                  {car?.vehicleType ||
                    "Vehicle"}
                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span
                  className="
                    text-sm
                    text-gray-500
                    font-medium
                  "
                >
                  {car?.year || "—"}
                </span>

              </div>

              {/* Location */}

              <p
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-600
                  mt-3
                  text-sm
                  sm:text-base
                "
              >
                <span className="text-orange-500">
                  📍
                </span>

                <span className="break-words">
                  {car?.location ||
                    "Iloilo"}
                </span>
              </p>

              {/* Specs */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                  mt-2
                  text-sm
                  text-gray-500
                "
              >

                <span className="flex items-center gap-1.5">
                  <span className="text-orange-500">
                    ⚙
                  </span>

                  {car?.transmission ||
                    "—"}
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="text-pink-500">
                    👥
                  </span>

                  {car?.seats || "—"} Seats
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              Status
          ================================================= */}

          <div className="
            self-start
            sm:self-auto
            shrink-0
          ">
            <BookingStatusBadge
              status={booking.status}
            />
          </div>

        </div>

        {/* =====================================================
            Divider
        ===================================================== */}

        <div className="
          h-px
          bg-gradient-to-r
          from-transparent
          via-orange-100
          to-transparent
          my-6
        " />

        {/* =====================================================
            Booking Information
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-3
            sm:gap-4
          "
        >

          {/* Pickup */}

          <div
            className="
              rounded-2xl
              border
              border-orange-100
              bg-orange-50/70
              p-4
            "
          >

            <p
              className="
                flex
                items-center
                gap-2
                text-xs
                sm:text-sm
                text-gray-500
                font-medium
              "
            >
              <span className="text-orange-500">
                📅
              </span>

              Pickup
            </p>

            <p
              className="
                mt-2
                font-bold
                text-gray-900
                text-sm
                sm:text-base
                break-words
              "
            >
              {booking.pickupDate}
            </p>

          </div>

          {/* Return */}

          <div
            className="
              rounded-2xl
              border
              border-purple-100
              bg-purple-50/60
              p-4
            "
          >

            <p
              className="
                flex
                items-center
                gap-2
                text-xs
                sm:text-sm
                text-gray-500
                font-medium
              "
            >
              <span className="text-purple-500">
                📅
              </span>

              Return
            </p>

            <p
              className="
                mt-2
                font-bold
                text-gray-900
                text-sm
                sm:text-base
                break-words
              "
            >
              {booking.returnDate}
            </p>

          </div>

          {/* Rental Days */}

          <div
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50/60
              p-4
            "
          >

            <p
              className="
                flex
                items-center
                gap-2
                text-xs
                sm:text-sm
                text-gray-500
                font-medium
              "
            >
              <span className="text-blue-500">
                🚗
              </span>

              Rental Days
            </p>

            <p
              className="
                mt-2
                font-bold
                text-gray-900
                text-sm
                sm:text-base
              "
            >
              {booking.rentalDays}{" "}
              {Number(booking.rentalDays) === 1
                ? "day"
                : "days"}
            </p>

          </div>

          {/* Total */}

          <div
            className="
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50/70
              p-4
            "
          >

            <p
              className="
                flex
                items-center
                gap-2
                text-xs
                sm:text-sm
                text-gray-500
                font-medium
              "
            >
              <span className="text-emerald-500">
                💰
              </span>

              Total
            </p>

            <p
              className="
                mt-2
                font-extrabold
                text-emerald-600
                text-base
                sm:text-lg
              "
            >
              ₱
              {Number(
                booking.totalPrice || 0
              ).toLocaleString()}
            </p>

          </div>

        </div>

        {/* =====================================================
            Cancel Booking
        ===================================================== */}

        {booking.status === "Pending" && (
          <>

            <div className="
              h-px
              bg-gray-100
              my-6
            " />

            <button
              onClick={() =>
                cancelBooking(booking.id)
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2

                w-full
                sm:w-auto

                px-6
                py-3

                rounded-xl

                border
                border-red-200

                bg-red-50
                hover:bg-red-100

                text-red-600
                hover:text-red-700

                font-semibold

                transition
              "
            >
              🚫 Cancel Booking
            </button>

          </>
        )}

      </div>
    </div>
  );
}

export default BookingCard;