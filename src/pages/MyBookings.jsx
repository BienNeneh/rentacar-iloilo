import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { db, auth } from "../firebase/firebase";
import { createNotification } from "../services/notificationService";
import BookingCard from "../components/booking/BookingCard";
import ArchivedBookingCard from "../components/booking/ArchivedBookingCard";
import { getBookingCategory } from "../utils/bookingUtils";
import BookingSection from "../components/booking/BookingSection";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [highlightedBooking, setHighlightedBooking] = useState(null);

  const location = useLocation();

  // =========================
  // Fetch Bookings
  // =========================

 useEffect(() => {
  if (!auth.currentUser) return;

  const q = query(
    collection(db, "bookings"),
    where("renterId", "==", auth.currentUser.uid)
  );

  const unsubscribe = onSnapshot(
    q,
    async (snapshot) => {
      try {
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
        console.error(
          "Real-time Booking Update Error:",
          error
        );
      }
    },
    (error) => {
      console.error(
        "Booking Listener Error:",
        error
      );
    }
  );

  return () => unsubscribe();
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
   type: "bookingCancelledByRenter",
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
  Archived: [],
  Other: [],
};

  bookings.forEach((booking) => {
    const category = getBookingCategory(booking);

    groupedBookings[category].push(booking);
  });


  // =========================
  // Booking Card
  // =========================

function renderBookingCard(booking) {
  if (!booking.car) {
    return (
      <ArchivedBookingCard
        key={booking.id}
        booking={booking}
        highlightedBooking={highlightedBooking}
      />
    );
  }

  return (
    <BookingCard
      key={booking.id}
      booking={booking}
      cancelBooking={cancelBooking}
      highlightedBooking={highlightedBooking}
    />
  );
}

  // =========================
  // Render Booking Section
  // =========================


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
    Waiting for Confirmation
========================= */}

<BookingSection
  title="Waiting for Confirmation"
  emoji="⏳"
  bookings={groupedBookings.Pending}
  renderBooking={renderBookingCard}
/>

{/* =========================
    Current Rentals
========================= */}

<BookingSection
  title="Current Rentals"
  emoji="🚗"
  bookings={groupedBookings.Active}
  renderBooking={renderBookingCard}
/>

{/* =========================
    Upcoming Rentals
========================= */}

<BookingSection
  title="Upcoming Rentals"
  emoji="📅"
  bookings={groupedBookings.Upcoming}
  renderBooking={renderBookingCard}
/>

  {/* =========================
      Booking History
  ========================= */}

  {(
    groupedBookings.Completed.length > 0 ||
    groupedBookings.Cancelled.length > 0 ||
    groupedBookings.Rejected.length > 0 ||
    groupedBookings.Archived.length > 0
  ) && (
    <section>

      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          📚 Booking History
        </h2>

        <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
          {
            groupedBookings.Completed.length +
            groupedBookings.Cancelled.length +
            groupedBookings.Rejected.length +
            groupedBookings.Archived.length
          }
        </span>
      </div>

      <div className="space-y-6">

        {groupedBookings.Completed.map(renderBookingCard)}

        {groupedBookings.Cancelled.map(renderBookingCard)}

        {groupedBookings.Rejected.map(renderBookingCard)}

        {groupedBookings.Archived.map(renderBookingCard)}

      </div>

    </section>
  )}

</div>
          )}

        </div>

      </div>
    </>
  );
}

export default MyBookings;