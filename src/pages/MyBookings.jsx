import { useEffect, useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { db, auth } from "../firebase/firebase";

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const q = query(
        collection(db, "bookings"),
        where("renterId", "==", auth.currentUser.uid)
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

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold">
            My Bookings
          </h1>

          <p className="text-gray-500 mt-2">
            Track all of your booking requests.
          </p>

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-yellow-50 rounded-2xl p-6 shadow">
              <h2 className="text-gray-500">
                Pending
              </h2>

              <h1 className="text-4xl font-bold text-yellow-600 mt-2">
                {pendingBookings}
              </h1>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 shadow">
              <h2 className="text-gray-500">
                Approved
              </h2>

              <h1 className="text-4xl font-bold text-green-600 mt-2">
                {approvedBookings}
              </h1>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 shadow">
              <h2 className="text-gray-500">
                Rejected
              </h2>

              <h1 className="text-4xl font-bold text-red-600 mt-2">
                {rejectedBookings}
              </h1>
            </div>

          </div>

          {bookings.length === 0 ? (

            <div className="bg-white rounded-3xl shadow mt-10 p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Bookings Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Start browsing cars and make your first booking.
              </p>

            </div>

          ) : (

            <div className="space-y-8 mt-10">

              {bookings.map((booking) => {

                if (!booking.car) {
                  return (
                    <div
                      key={booking.id}
                      className="bg-red-50 border border-red-200 rounded-3xl p-8"
                    >
                      <h2 className="text-2xl font-bold text-red-700">
                        Car No Longer Available
                      </h2>

                      <p className="text-gray-600 mt-3">
                        This vehicle has been removed by its owner.
                      </p>
                    </div>
                  );
                }

                return (

                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
                  >

                    <div className="flex justify-between items-start">

                      <div className="flex gap-6">

                        <img
                          src={booking.car.image}
                          alt={booking.car.brand}
                          className="w-44 h-28 rounded-2xl object-cover"
                        />

                        <div>

                          <h2 className="text-3xl font-bold">
                            {booking.car.brand} {booking.car.model}
                          </h2>

                          <p className="text-gray-500 mt-2">
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

                      <div>

                        {booking.status === "Pending" && (
                          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                            🟡 Pending
                          </span>
                        )}

                        {booking.status === "Approved" && (
                          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                            🟢 Approved
                          </span>
                        )}

                        {booking.status === "Rejected" && (
                          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                            🔴 Rejected
                          </span>
                        )}

                      </div>

                    </div>

                    <hr className="my-6" />

                    <div className="grid md:grid-cols-4 gap-6">

                      <div>
                        <p className="text-gray-500">Pickup</p>
                        <h3 className="font-bold mt-1">
                          {booking.pickupDate}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-500">Return</p>
                        <h3 className="font-bold mt-1">
                          {booking.returnDate}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-500">Rental Days</p>
                        <h3 className="font-bold mt-1">
                          {booking.rentalDays}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-500">Total</p>
                        <h3 className="font-bold text-blue-600 mt-1">
                          ₱{Number(booking.totalPrice).toLocaleString()}
                        </h3>
                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

      </div>

    </>
  );
}

export default MyBookings;