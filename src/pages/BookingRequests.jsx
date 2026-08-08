import { useEffect, useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import BookingStats from "../components/booking/BookingStats";
import BookingRequestCard from "../components/booking/BookingRequestCard";
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

function BookingRequests() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // =========================
  // Fetch Bookings
  // =========================

  async function fetchBookings() {
    try {
      const q = query(
        collection(db, "bookings"),
        where("ownerId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);

      const bookingList = await Promise.all(
        snapshot.docs.map(async (bookingDoc) => {
          const booking = bookingDoc.data();

          const carRef = doc(db, "cars", booking.carId);
          const carSnap = await getDoc(carRef);

          return {
            id: bookingDoc.id,
            ...booking,
            car: carSnap.exists() ? carSnap.data() : null,
          };
        })
      );

      setBookings(bookingList);

    } catch (error) {
      console.error(error);
    }
  }

  // =========================
  // Approve Booking
  // =========================

  async function approveBooking(id) {
    try {
      const booking = bookings.find((b) => b.id === id);

      if (!booking) return;

      await updateDoc(doc(db, "bookings", id), {
        status: "Approved",
      });

      await createNotification({
        userId: booking.renterId,
        type: "bookingApproved",
        title: "Booking Approved",
        subtitle: `${booking.car?.brand} ${booking.car?.model}`,
        message: "Your booking has been approved.",
        bookingId: booking.id,
        carId: booking.carId,
      });

      await fetchBookings();

    } catch (error) {
      console.error(error);
    }
  }

  // =========================
  // Reject Booking
  // =========================

  async function rejectBooking(id) {
    try {
      const booking = bookings.find((b) => b.id === id);

      if (!booking) return;

      await updateDoc(doc(db, "bookings", id), {
        status: "Rejected",
      });

      await createNotification({
        userId: booking.renterId,
        type: "bookingRejected",
        title: "Booking Rejected",
        subtitle: `${booking.car?.brand} ${booking.car?.model}`,
        message: "Unfortunately, your booking request was rejected.",
        bookingId: booking.id,
        carId: booking.carId,
      });

      await fetchBookings();

    } catch (error) {
      console.error(error);
    }
  }

  // =========================
  // Cancel Booking
  // =========================

  async function cancelBooking(id) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this approved booking?"
    );

    if (!confirmed) return;

    try {
      const booking = bookings.find((b) => b.id === id);

      if (!booking) return;

      await updateDoc(doc(db, "bookings", id), {
        status: "Cancelled",
      });

      await createNotification({
        userId: booking.renterId,
        type: "bookingCancelled",
        title: "Booking Cancelled",
        subtitle: `${booking.car?.brand} ${booking.car?.model}`,
        message: "The owner cancelled your booking.",
        bookingId: booking.id,
        carId: booking.carId,
      });

      await fetchBookings();

    } catch (error) {
      console.error(error);
    }
  }

  // =========================
  // Complete Booking
  // =========================

  async function completeBooking(id) {
    const confirmed = window.confirm(
      "Confirm that the vehicle has been returned and the rental is finished?"
    );

    if (!confirmed) return;

    try {
      const booking = bookings.find((b) => b.id === id);

      if (!booking) return;

      await updateDoc(doc(db, "bookings", id), {
        status: "Completed",
      });

      await fetchBookings();

    } catch (error) {
      console.error("Complete Booking Error:", error);
    }
  }

  // =========================
  // Statistics
  // =========================

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;

  // =========================
  // Active Bookings
  // =========================

  const activeBookings = bookings.filter(
    (booking) =>
      booking.car &&
      booking.status !== "Completed"
  );

  // =========================
  // Completed Bookings
  // =========================

  const completedBookings = bookings.filter(
    (booking) =>
      booking.car &&
      booking.status === "Completed"
  );

  // =========================
  // Deleted Vehicle Bookings
  // =========================

  const deletedBookings = bookings.filter(
    (booking) => !booking.car
  );

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold">
            Booking Requests
          </h1>

          <p className="text-gray-500 mt-2">
            Review booking requests for your vehicles.
          </p>

          {/* =========================
              Booking Statistics
          ========================= */}

          <BookingStats
            pending={pendingBookings}
            approved={approvedBookings}
            rejected={rejectedBookings}
          />

          {/* =========================
              Booking Content
          ========================= */}

          {activeBookings.length === 0 &&
          completedBookings.length === 0 &&
          deletedBookings.length === 0 ? (

            <div className="bg-white rounded-3xl shadow mt-10 p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Booking Requests
              </h2>

              <p className="text-gray-500 mt-3">
                Booking requests will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-8 mt-10">

              {/* =========================
                  Active Booking Requests
              ========================= */}

              {activeBookings.map((booking) => (

                <BookingRequestCard
                  key={booking.id}
                  booking={booking}
                  approveBooking={approveBooking}
                  rejectBooking={rejectBooking}
                  cancelBooking={cancelBooking}
                  completeBooking={completeBooking}
                />

              ))}

              {/* =========================
                  Completed Rentals
              ========================= */}

              {completedBookings.length > 0 && (

                <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6">

                  <h2 className="text-2xl font-bold text-blue-700">
                    📚 Completed Rentals
                  </h2>

                  <p className="text-blue-600 mt-2">
                    {completedBookings.length} completed rental(s).
                  </p>

                </div>

              )}

              {/* =========================
                  Deleted Vehicle Bookings
              ========================= */}

              {deletedBookings.length > 0 && (

                <div className="bg-gray-100 border border-gray-200 rounded-3xl p-6">

                  <h2 className="text-2xl font-bold text-gray-700">
                    🗑 Archived Bookings
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {deletedBookings.length} booking(s) belong to deleted vehicles.
                  </p>

                </div>

              )}

            </div>

          )}

        </div>

      </div>
    </>
  );
}

export default BookingRequests;