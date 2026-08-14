import {
  FaMapMarkerAlt,
  FaCog,
  FaUsers,
  FaClock,
  FaEllipsisV,
} from "react-icons/fa";

import BookingStatusBadge from "./BookingStatusBadge";
import BookingDetails from "./BookingDetails";
import BookingActions from "./BookingActions";

function BookingRequestCard({
  booking,
  approveBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* =====================================================
          SUNSET TOP ACCENT
      ===================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-1
          bg-gradient-to-r
          from-orange-300
          via-pink-400
          to-purple-500
        "
      />

      <div className="p-4 sm:p-5 lg:p-6">

        {/* =====================================================
            MOBILE STATUS
            Separate from the vehicle area
        ===================================================== */}

        <div
          className="
            mb-3
            flex
            items-center
            justify-end
            xl:hidden
          "
        >
          <BookingStatusBadge
            status={booking.status}
          />
        </div>

        {/* =====================================================
            MAIN HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            xl:flex-row
            xl:items-start
            xl:justify-between
          "
        >

          {/* ===================================================
              VEHICLE INFORMATION
          =================================================== */}

          <div
            className="
              flex
              min-w-0
              flex-1
              gap-3
              sm:gap-4
            "
          >

            {/* =================================================
                CAR IMAGE
            ================================================= */}

            <div
              className="
                relative
                h-24
                w-28
                shrink-0
                overflow-hidden
                rounded-2xl
                sm:h-32
                sm:w-44
              "
            >
              <img
                src={booking.car.image}
                alt={`${booking.car.brand} ${booking.car.model}`}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/20
                  via-transparent
                  to-transparent
                "
              />
            </div>

            {/* =================================================
                VEHICLE DETAILS
            ================================================= */}

            <div className="min-w-0 flex-1">

              {/* Vehicle Name */}

              <h2
                className="
                  truncate
                  text-lg
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  sm:text-2xl
                "
              >
                {booking.car.brand} {booking.car.model}
              </h2>

              {/* Vehicle Type + Year */}

              <div
                className="
                  mt-1
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  text-xs
                  sm:text-sm
                "
              >
                <span
                  className="
                    rounded-full
                    bg-purple-100
                    px-2.5
                    py-1
                    font-semibold
                    text-purple-700
                  "
                >
                  {booking.car.vehicleType}
                </span>

                <span className="text-gray-400">
                  •
                </span>

                <span className="font-medium text-gray-500">
                  {booking.car.year}
                </span>
              </div>

              {/* Location */}

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-gray-500
                  sm:mt-3
                  sm:text-sm
                "
              >
                <FaMapMarkerAlt
                  className="
                    shrink-0
                    text-orange-500
                  "
                />

                <span className="truncate">
                  {booking.car.location}
                </span>
              </div>

              {/* Vehicle Specifications */}

              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  text-xs
                  text-gray-500
                  sm:gap-3
                  sm:text-sm
                "
              >
                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <FaCog className="text-purple-500" />

                  {booking.car.transmission}
                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <FaUsers className="text-purple-500" />

                  {booking.car.seats} Seats
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================
              DESKTOP STATUS + MENU
          =================================================== */}

          <div
            className="
              hidden
              shrink-0
              items-start
              gap-3
              xl:flex
            "
          >
            <BookingStatusBadge
              status={booking.status}
            />

            <button
              type="button"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                text-gray-400
                transition
                hover:bg-gray-100
                hover:text-gray-700
              "
              aria-label="Booking options"
            >
              <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE BOOKING TYPE / MENU
        ===================================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-end
            xl:hidden
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-gray-400
            "
          >
            <FaClock />

            <span>
              Booking Request
            </span>

            <button
              type="button"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-gray-400
                transition
                hover:bg-gray-100
                hover:text-gray-700
              "
              aria-label="Booking options"
            >
              <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div
          className="
            my-5
            h-px
            bg-gradient-to-r
            from-transparent
            via-gray-200
            to-transparent
          "
        />

        {/* =====================================================
            BOOKING DETAILS
        ===================================================== */}

        <BookingDetails
          booking={booking}
        />

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div
          className="
            mt-6
            border-t
            border-gray-100
            pt-5
          "
        >
          <BookingActions
            booking={booking}
            approveBooking={approveBooking}
            rejectBooking={rejectBooking}
            cancelBooking={cancelBooking}
            completeBooking={completeBooking}
          />
        </div>

      </div>
    </article>
  );
}

export default BookingRequestCard;