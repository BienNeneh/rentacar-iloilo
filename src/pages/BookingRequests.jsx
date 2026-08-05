import { useEffect, useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import BookingStats from "../components/booking/BookingStats";
import BookingRequestCard from "../components/booking/BookingRequestCard";
import { db, auth } from "../firebase/firebase";

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

  async function approveBooking(id) {
    try {
      await updateDoc(doc(db, "bookings", id), {
        status: "Approved",
      });

      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  }

  async function rejectBooking(id) {
    try {
      await updateDoc(doc(db, "bookings", id), {
        status: "Rejected",
      });

      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  }

  // Statistics
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;

  const activeBookings = bookings.filter(
    (booking) => booking.car
  );

  const deletedBookings = bookings.filter(
    (booking) => !booking.car
  );

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold">
            Booking Requests
          </h1>

          <p className="text-gray-500 mt-2">
            Review booking requests for your vehicles.
          </p>

          <BookingStats
            pending={pendingBookings}
            approved={approvedBookings}
            rejected={rejectedBookings}
          />

          {activeBookings.length === 0 &&
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

              {activeBookings.map((booking) => (

                <BookingRequestCard
                  key={booking.id}
                  booking={booking}
                  approveBooking={approveBooking}
                  rejectBooking={rejectBooking}
                />

              ))}

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