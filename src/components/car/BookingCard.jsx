import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function BookingCard({
  car,
  unavailableDates,
  selectedRange,
  setSelectedRange,
  pickupDate,
  returnDate,
  setPickupDate,
  setReturnDate,
  totalDays,
  estimatedTotal,
  requestBooking,
}) {

  return (

    <div className="
mt-8
rounded-3xl
border
bg-gray-50
p-4
sm:p-6
shadow-sm
">

   <h2 className="text-xl md:text-2xl font-bold mb-5">
        📅 Book This Car
      </h2>

      <div className="w-full overflow-hidden mb-6">

  <Calendar
    className="w-full max-w-full"
          selectRange={true}
          value={selectedRange}

          onChange={(range) => {

            setSelectedRange(range);

            if (Array.isArray(range)) {

              const [start, end] = range;

              const formatDate = (date) =>
                `${date.getFullYear()}-${String(
                  date.getMonth() + 1
                ).padStart(2, "0")}-${String(
                  date.getDate()
                ).padStart(2, "0")}`;

              setPickupDate(formatDate(start));

              if (end) {
                setReturnDate(formatDate(end));
              } else {
                setReturnDate("");
              }

            }

          }}

          tileClassName={({ date }) => {

            const formatted =
              `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(
                date.getDate()
              ).padStart(2, "0")}`;

            return car.blockedDates?.includes(formatted)
              ? "blocked-date"
              : null;

          }}

          tileDisabled={({ date }) => {

            const formatted =
              `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(
                date.getDate()
              ).padStart(2, "0")}`;

            return car.blockedDates?.includes(formatted);

          }}

        />

      </div>

            {unavailableDates.length > 0 && (

          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">

          <h3 className="font-bold text-red-600 mb-3">
            🚫 Unavailable Dates
          </h3>

          <div className="space-y-2">

            {unavailableDates.map((booking) => (

              <div
                key={booking.id}
                className="
flex
flex-col
sm:flex-row
justify-between
gap-2
bg-white
rounded-xl
p-3
"
              >

                <span>{booking.pickupDate}</span>

                <span>→</span>

                <span>{booking.returnDate}</span>

              </div>

            ))}

          </div>

        </div>

      )}

      <div className="space-y-5">

        {/* Pickup */}

        <div className="
bg-white
rounded-2xl
border
p-4
shadow-sm
">

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Pickup Date
          </p>

          <p className="text-lg md:text-xl font-bold mt-1 break-words">

            {pickupDate
              ? new Date(pickupDate).toLocaleDateString()
              : "Select a date"}

          </p>

        </div>

        {/* Return */}

        <div className="bg-white rounded-xl border p-4">

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Return Date
          </p>

          <p className="text-xl font-bold mt-1">

            {returnDate
              ? new Date(returnDate).toLocaleDateString()
              : "Select a date"}

          </p>

        </div>

        {/* Rental Days */}

        <div className="
flex
items-center
justify-between
text-base
md:text-lg
">

          <span>Rental Duration</span>

          <strong>{totalDays} Days</strong>

        </div>

        {/* Total */}

        <div className="
flex
items-center
justify-between
text-lg
md:text-xl
font-bold
pt-3
border-t
">

          <span>Estimated Total</span>

          <span className="text-blue-600">

            ₱{estimatedTotal.toLocaleString()}

          </span>

        </div>

                {/* Button */}

        <button
          onClick={requestBooking}
         className="
w-full
mt-6
bg-blue-600
hover:bg-blue-700
active:scale-[0.98]
text-white
font-semibold
py-3.5
rounded-2xl
transition
duration-200
"
        >
          Request Booking
        </button>

      </div>

    </div>

  );

}

export default BookingCard;