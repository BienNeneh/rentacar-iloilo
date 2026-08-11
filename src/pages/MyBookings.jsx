import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { db, auth } from "../firebase/firebase";
import { createNotification } from "../services/notificationService";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [highlightedBooking, setHighlightedBooking] = useState(null);

  const location = useLocation();

  // =========================
  // Fetch Bookings
  // =========================

  useEffect(() => {
    fetchBookings();
  }, []);

  // =========================
  // Notification Booking Highlight
  // =========================

  useEffect(() => {
    const bookingId = location.state?.bookingId;

    if (!bookingId || bookings.length === 0) {
      return;
    }

    const element = document.getElementById(
      `booking-${bookingId}`
    );

    if (!element) {
      return;
    }

    setHighlightedBooking(bookingId);

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    const timer = setTimeout(() => {
      setHighlightedBooking(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.state, bookings]);

  // =========================
  // Cancel Booking
  // =========================

  async function cancelBooking(id) {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) return;

  try {
    // Find the booking being cancelled
    const booking = bookings.find(
      (booking) => booking.id === id
    );

    if (!booking) {
      console.error("Booking not found.");
      return;
    }

    // Update booking status
    await updateDoc(
      doc(db, "bookings", id),
      {
        status: "Cancelled",
      }
    );

    // Notify the vehicle owner
    await createNotification({
      userId: booking.ownerId,
      type: "bookingCancelled",
      title: "Booking Cancelled",
      subtitle: `${booking.car?.brand || ""} ${
        booking.car?.model || ""
      }`,
      message: `${booking.renterName || "A renter"} cancelled their booking.`,
      bookingId: booking.id,
      carId: booking.carId,
    });

    // Refresh bookings
    await fetchBookings();

  } catch (error) {
    console.error("Cancel Booking Error:", error);
  }
}

  // =========================
  // Fetch Bookings
  // =========================

  async function fetchBookings() {
    try {
      const q = query(
        collection(db, "bookings"),
        where(
          "renterId",
          "==",
          auth.currentUser.uid
        )
      );

      const snapshot = await getDocs(q);

      const bookingList = await Promise.all(
        snapshot.docs.map(async (bookingDoc) => {
          const booking = bookingDoc.data();

          const carRef = doc(
            db,
            "cars",
            booking.carId
          );

          const carSnap = await getDoc(carRef);

          return {
            id: bookingDoc.id,
            ...booking,
            car: carSnap.exists()
              ? carSnap.data()
              : null,
          };
        })
      );

      setBookings(bookingList);

    } catch (error) {
      console.error("Fetch Bookings Error:", error);
    }
  }

  // =========================
  // Determine Booking Category
  // =========================

  function getBookingCategory(booking) {
    // Completed always goes to history
    if (booking.status === "Completed") {
      return "Completed";
    }

    // Cancelled bookings
    if (booking.status === "Cancelled") {
      return "Cancelled";
    }

    // Rejected bookings
    if (booking.status === "Rejected") {
      return "Rejected";
    }

    // Pending bookings
    if (booking.status === "Pending") {
      return "Pending";
    }

    // Approved bookings
    if (booking.status === "Approved") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const pickupDate = new Date(
        `${booking.pickupDate}T00:00:00`
      );

      if (today < pickupDate) {
        return "Upcoming";
      }

      // Once pickup date arrives,
      // the booking is considered active
      // until the owner manually completes it.
      return "Active";
    }

    return "Other";
  }

  // =========================
  // Group Bookings
  // =========================

  const groupedBookings = {
    Upcoming: [],
    Active: [],
    Pending: [],
    Completed: [],
    Cancelled: [],
    Rejected: [],
    Other: [],
  };

  bookings.forEach((booking) => {
    const category = getBookingCategory(booking);

    groupedBookings[category].push(booking);
  });

  // =========================
  // Statistics
  // =========================

  const pendingBookings =
    groupedBookings.Pending.length;

  const upcomingBookings =
    groupedBookings.Upcoming.length;

  const activeBookings =
    groupedBookings.Active.length;

  const completedBookings =
    groupedBookings.Completed.length;

  const cancelledBookings =
    groupedBookings.Cancelled.length;

  const rejectedBookings =
    groupedBookings.Rejected.length;

  // =========================
  // Booking Card
  // =========================

  function renderBookingCard(booking) {
    // =========================
    // Deleted Vehicle
    // =========================

    if (!booking.car) {
      return (
        <div
          key={booking.id}
          id={`booking-${booking.id}`}
          className={`bg-red-50 border border-red-200 rounded-3xl p-8 transition-all duration-500 ${
            highlightedBooking === booking.id
              ? "ring-4 ring-orange-200"
              : ""
          }`}
        >
          <h2 className="text-2xl font-bold text-red-700">
            Car No Longer Available
          </h2>

          <p className="text-gray-600 mt-3">
            This vehicle has been removed by its
            owner.
          </p>
        </div>
      );
    }

    const category = getBookingCategory(
      booking
    );

    return (
      <div
        id={`booking-${booking.id}`}
        key={booking.id}
        className={`rounded-3xl shadow-lg border p-8 transition-all duration-500 ${
          highlightedBooking === booking.id
            ? "bg-orange-50 border-orange-400 ring-4 ring-orange-200"
            : "bg-white border-gray-100"
        }`}
      >

        {/* =========================
            Vehicle Information
        ========================= */}

        <div className="flex flex-col md:flex-row md:justify-between gap-6">

          <div className="flex flex-col sm:flex-row gap-5 flex-1">

            <img
              src={booking.car.image}
              alt={`${booking.car.brand} ${booking.car.model}`}
              className="
                w-full
                sm:w-44
                h-52
                sm:h-28
                rounded-2xl
                object-cover
                flex-shrink-0
              "
            />

            <div>

              <h2 className="text-3xl font-bold">
                {booking.car.brand}{" "}
                {booking.car.model}
              </h2>

              <p className="text-gray-500 mt-2">
                {booking.car.vehicleType} •{" "}
                {booking.car.year}
              </p>

              <p className="text-gray-600 mt-2">
                📍 {booking.car.location}
              </p>

              <p className="text-gray-600 mt-2">
                ⚙ {booking.car.transmission} • 👥{" "}
                {booking.car.seats} Seats
              </p>

            </div>

          </div>

          {/* =========================
              Booking Status
          ========================= */}

          <div className="self-start">

            {category === "Pending" && (
              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                🟡 Pending
              </span>
            )}

            {category === "Upcoming" && (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                🟢 Upcoming
              </span>
            )}

            {category === "Active" && (
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                🚗 Active Rental
              </span>
            )}

            {category === "Completed" && (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                ✅ Completed
              </span>
            )}

            {category === "Rejected" && (
              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                🔴 Rejected
              </span>
            )}

            {category === "Cancelled" && (
              <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold">
                ⚫ Cancelled
              </span>
            )}

          </div>

        </div>

        <hr className="my-6" />

        {/* =========================
            Booking Details
        ========================= */}

        <div className="grid md:grid-cols-4 gap-6">

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
              ₱
              {Number(
                booking.totalPrice
              ).toLocaleString()}
            </h3>
          </div>

        </div>

        {/* =========================
            Pending Cancellation
        ========================= */}

        {booking.status === "Pending" && (
          <div className="mt-6">

            <button
              onClick={() =>
                cancelBooking(booking.id)
              }
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-5
                py-2
                rounded-xl
                font-semibold
                transition
              "
            >
              Cancel Booking
            </button>

          </div>
        )}

      </div>
    );
  }

  // =========================
  // Render Booking Section
  // =========================

  function renderSection(
    title,
    emoji,
    bookingList,
    emptyMessage
  ) {
    return (
      <section>

        <div className="flex items-center gap-3 mb-5">

          <h2 className="text-2xl font-bold text-gray-900">
            {emoji} {title}
          </h2>

          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
            {bookingList.length}
          </span>

        </div>

        {bookingList.length === 0 ? (

          <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center">

            <p className="text-gray-500">
              {emptyMessage}
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {bookingList.map(
              renderBookingCard
            )}

          </div>

        )}

      </section>
    );
  }

  const hasBookings = bookings.length > 0;

  return (
    <>
    <DashboardNavbar />
      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-6xl mx-auto px-6">

          {/* =========================
              Header
          ========================= */}

          <h1 className="text-4xl font-bold">
            My Bookings
          </h1>

          <p className="text-gray-500 mt-2">
            Track all of your booking requests
            and rental history.
          </p>

          {/* =========================
              Statistics
          ========================= */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">

            <div className="bg-yellow-50 rounded-2xl p-5 shadow">
              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                {pendingBookings}
              </h2>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 shadow">
              <p className="text-gray-500">
                Upcoming
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {upcomingBookings}
              </h2>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 shadow">
              <p className="text-gray-500">
                Active
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {activeBookings}
              </h2>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-5 shadow">
              <p className="text-gray-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                {completedBookings}
              </h2>
            </div>

            <div className="bg-gray-100 rounded-2xl p-5 shadow">
              <p className="text-gray-500">
                Cancelled
              </p>

              <h2 className="text-3xl font-bold text-gray-600 mt-2">
                {cancelledBookings}
              </h2>
            </div>

            <div className="bg-red-50 rounded-2xl p-5 shadow">
              <p className="text-gray-500">
                Rejected
              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {rejectedBookings}
              </h2>
            </div>

          </div>

          {/* =========================
              No Bookings
          ========================= */}

          {!hasBookings ? (

            <div className="bg-white rounded-3xl shadow mt-10 p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Bookings Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Start browsing cars and make your
                first booking.
              </p>

            </div>

          ) : (

            <div className="space-y-12 mt-12">

              {/* =========================
                  Upcoming
              ========================= */}

              {renderSection(
                "Upcoming",
                "📅",
                groupedBookings.Upcoming,
                "You don't have any upcoming rentals."
              )}

              {/* =========================
                  Active
              ========================= */}

              {renderSection(
                "Active Rentals",
                "🚗",
                groupedBookings.Active,
                "You don't have any active rentals."
              )}

              {/* =========================
                  Pending
              ========================= */}

              {renderSection(
                "Pending Requests",
                "🟡",
                groupedBookings.Pending,
                "You don't have any pending requests."
              )}

              {/* =========================
                  Completed
              ========================= */}

              {renderSection(
                "Booking History",
                "📚",
                groupedBookings.Completed,
                "You don't have any completed rentals yet."
              )}

              {/* =========================
                  Cancelled
              ========================= */}

              {renderSection(
                "Cancelled",
                "⚫",
                groupedBookings.Cancelled,
                "You don't have any cancelled bookings."
              )}

              {/* =========================
                  Rejected
              ========================= */}

              {renderSection(
                "Rejected",
                "🔴",
                groupedBookings.Rejected,
                "You don't have any rejected requests."
              )}

            </div>

          )}

        </div>

      </div>
    </>
  );
}

export default MyBookings;