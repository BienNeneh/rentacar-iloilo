import { useEffect, useMemo, useRef, useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import BookingStats from "../components/booking/BookingStats";
import BookingRequestCard from "../components/booking/BookingRequestCard";
import { db, auth } from "../firebase/firebase";
import { useLocation } from "react-router-dom";
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

import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaCar,
  FaSortAmountDown,
  FaTimes,
} from "react-icons/fa";

function BookingRequests() {
  const handleStatusSelect = (status) => {
  setStatusFilter(status);

  setTimeout(() => {
    bookingsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
};
  const location = useLocation();
  const bookingsSectionRef = useRef(null);
  const [highlightedBooking, setHighlightedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  // =========================================================
  // Filters
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // =========================================================
  // Fetch Bookings
  // =========================================================

  useEffect(() => {
    fetchBookings();
  }, [location.state?.bookingId]);

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

  // =========================================================
  // Notification Booking Highlight
  // =========================================================

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

  // =========================================================
  // Approve Booking
  // =========================================================

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

  // =========================================================
  // Reject Booking
  // =========================================================

  async function rejectBooking(id) {
    try {
      const booking = bookings.find((b) => b.id === id);

      if (!booking) return;

      await updateDoc(doc(db, "bookings", id), {
        status: "Rejected",
      });

      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === id
            ? { ...b, status: "Rejected" }
            : b
        )
      );

      await createNotification({
        userId: booking.renterId,
        type: "bookingRejected",
        title: "Booking Rejected",
        subtitle: `${booking.car?.brand} ${booking.car?.model}`,
        message:
          "Unfortunately, your booking request was rejected.",
        bookingId: booking.id,
        carId: booking.carId,
      });
    } catch (error) {
      console.error("Reject Booking Error:", error);
    }
  }

  // =========================================================
  // Cancel Booking
  // =========================================================

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

  // =========================================================
  // Complete Booking
  // =========================================================

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

      await createNotification({
        userId: booking.renterId,
        type: "rentalCompleted",
        title: "Rental Completed",
        subtitle: `${booking.car?.brand || ""} ${
          booking.car?.model || ""
        }`,
        message:
          "Your rental has been marked as completed.",
        bookingId: booking.id,
        carId: booking.carId,
      });

      await fetchBookings();
    } catch (error) {
      console.error("Complete Booking Error:", error);
    }
  }

  // =========================================================
  // Statistics
  // =========================================================

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;

  // =========================================================
  // Available Vehicles
  // =========================================================

  const vehicleOptions = useMemo(() => {
    const vehicles = bookings
      .filter((booking) => booking.car)
      .map(
        (booking) =>
          `${booking.car.brand} ${booking.car.model}`
      );

    return [...new Set(vehicles)].sort();
  }, [bookings]);

  // =========================================================
  // Filter + Search + Sort
  // =========================================================

  const filteredBookings = useMemo(() => {
    let result = bookings.filter((booking) => booking.car);

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((booking) => {
        const renterName =
          booking.renterName?.toLowerCase() || "";

        const renterEmail =
          booking.renterEmail?.toLowerCase() || "";

        const brand =
          booking.car?.brand?.toLowerCase() || "";

        const model =
          booking.car?.model?.toLowerCase() || "";

        return (
          renterName.includes(search) ||
          renterEmail.includes(search) ||
          brand.includes(search) ||
          model.includes(search)
        );
      });
    }

    // Status
    if (statusFilter !== "All") {
      result = result.filter(
        (booking) => booking.status === statusFilter
      );
    }

    // Vehicle
    if (vehicleFilter !== "All") {
      result = result.filter((booking) => {
        const vehicle =
          `${booking.car?.brand || ""} ${
            booking.car?.model || ""
          }`;

        return vehicle === vehicleFilter;
      });
    }

    // Date range
    if (startDate) {
      result = result.filter(
        (booking) => booking.pickupDate >= startDate
      );
    }

    if (endDate) {
      result = result.filter(
        (booking) => booking.pickupDate <= endDate
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(
        a.createdAt?.seconds
          ? a.createdAt.seconds * 1000
          : a.pickupDate
      );

      const dateB = new Date(
        b.createdAt?.seconds
          ? b.createdAt.seconds * 1000
          : b.pickupDate
      );

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [
    bookings,
    searchTerm,
    statusFilter,
    vehicleFilter,
    startDate,
    endDate,
    sortOrder,
  ]);

  // =========================================================
  // Filtered Status Lists
  // =========================================================

  const activeBookings = filteredBookings.filter(
    (booking) =>
      booking.status === "Pending" ||
      booking.status === "Approved"
  );

  const rejectedBookingsList = filteredBookings.filter(
    (booking) => booking.status === "Rejected"
  );

  const cancelledBookings = filteredBookings.filter(
    (booking) => booking.status === "Cancelled"
  );

  const completedBookings = filteredBookings.filter(
    (booking) => booking.status === "Completed"
  );

  // =========================================================
  // Clear Filters
  // =========================================================

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setVehicleFilter("All");
    setStartDate("");
    setEndDate("");
    setSortOrder("newest");
  };

  const hasFilters =
    searchTerm ||
    statusFilter !== "All" ||
    vehicleFilter !== "All" ||
    startDate ||
    endDate;

  // =========================================================
  // Booking Card
  // =========================================================

  const renderBooking = (booking) => (
    <div
      key={booking.id}
      id={`booking-${booking.id}`}
      className={`rounded-3xl transition-all duration-500 ${
        highlightedBooking === booking.id
          ? "ring-4 ring-orange-400 bg-orange-50 p-1"
          : ""
      }`}
    >
      <BookingRequestCard
        booking={booking}
        approveBooking={approveBooking}
        rejectBooking={rejectBooking}
        cancelBooking={cancelBooking}
        completeBooking={completeBooking}
      />
    </div>
  );

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-gray-50 to-purple-50/30 py-8 sm:py-10">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          {/* =====================================================
              HERO
          ===================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-gradient-to-r
              from-orange-300
              via-pink-300
              to-purple-400
              px-6
              py-7
              sm:px-8
              sm:py-8
              shadow-sm
            "
          >
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute bottom-[-70px] right-40 h-40 w-40 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="absolute -left-10 bottom-[-80px] h-40 w-40 rounded-full bg-purple-300/30 blur-3xl" />

            <div className="relative max-w-2xl">
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-white/70
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-purple-700
                  backdrop-blur
                "
              >
                Owner Dashboard
              </span>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Booking Requests
              </h1>

              <p className="mt-2 text-sm text-gray-700 sm:text-base">
                Review and manage booking requests for your
                vehicles.
              </p>
            </div>
          </div>

          {/* =====================================================
              STATISTICS
          ===================================================== */}

        <BookingStats
  pending={pendingBookings}
  approved={approvedBookings}
  rejected={rejectedBookings}
  total={bookings.length}
  onStatusSelect={handleStatusSelect}
/>

          {/* =====================================================
              SEARCH + FILTER BAR
          ===================================================== */}

          <div
            className="
              mt-6
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-4
              shadow-sm
            "
          >
            <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">

              {/* Search */}
              <div className="relative">
                <FaSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder="Search renter, email, or car model..."
                  className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    transition
                    focus:border-purple-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-purple-100
                  "
                />
              </div>

              {/* Status */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="
                    h-12
                    w-full
                    appearance-none
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    pr-10
                    text-sm
                    outline-none
                    focus:border-purple-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-purple-100
                  "
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Vehicle */}
              <div className="relative">
                <select
                  value={vehicleFilter}
                  onChange={(e) =>
                    setVehicleFilter(e.target.value)
                  }
                  className="
                    h-12
                    w-full
                    appearance-none
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    pr-10
                    text-sm
                    outline-none
                    focus:border-purple-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-purple-100
                  "
                >
                  <option value="All">All Vehicles</option>

                  {vehicleOptions.map((vehicle) => (
                    <option
                      key={vehicle}
                      value={vehicle}
                    >
                      {vehicle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                  className="
                    h-12
                    min-w-0
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-3
                    text-xs
                    outline-none
                    focus:border-purple-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-purple-100
                  "
                />

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                  className="
                    h-12
                    min-w-0
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-3
                    text-xs
                    outline-none
                    focus:border-purple-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-purple-100
                  "
                />
              </div>

              {/* Clear */}
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasFilters}
                className="
                  h-12
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  text-sm
                  font-semibold
                  text-gray-600
                  transition
                  hover:border-gray-300
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Clear
              </button>
            </div>
          </div>

          {/* =====================================================
              STATUS TABS + SORT
          ===================================================== */}

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex gap-2 overflow-x-auto pb-1">

              {[
                ["All", "All Requests", bookings.length],
                ["Pending", "Pending", pendingBookings],
                ["Approved", "Approved", approvedBookings],
                ["Rejected", "Rejected", rejectedBookings],
              ].map(([value, label, count]) => {
                const active = statusFilter === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStatusFilter(value)}
                    className={`
                      flex
                      shrink-0
                      items-center
                      gap-2
                      rounded-full
                      border
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition
                      ${
                        active
                          ? "border-purple-200 bg-purple-100 text-purple-700 shadow-sm"
                          : "border-gray-200 bg-white text-gray-500 hover:border-purple-200 hover:bg-purple-50"
                      }
                    `}
                  >
                    {label}

                    <span
                      className={`
                        rounded-full
                        px-2
                        py-0.5
                        text-xs
                        ${
                          active
                            ? "bg-white text-purple-700"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">

              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 shadow-sm">
                <FaSortAmountDown className="text-gray-400" />

                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value)
                  }
                  className="
                    h-11
                    bg-transparent
                    text-sm
                    font-semibold
                    text-gray-600
                    outline-none
                  "
                >
                  <option value="newest">
                    Newest First
                  </option>

                  <option value="oldest">
                    Oldest First
                  </option>
                </select>
              </div>

            </div>
          </div>
<div ref={bookingsSectionRef} className="scroll-mt-6" />
          {/* =====================================================
              ACTIVE BOOKINGS
          ===================================================== */}

          {activeBookings.length > 0 && (
            <section className="mt-8">

             
               <div className="mb-4">
  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">

    <span
      className={`
        mr-2
        inline-block
        h-3
        w-3
        rounded-full
        ${
          statusFilter === "Pending"
            ? "bg-orange-400"
            : statusFilter === "Approved"
            ? "bg-emerald-400"
            : "bg-gradient-to-r from-orange-400 to-pink-500"
        }
      `}
    />

    {statusFilter === "Pending"
      ? "Pending Booking Requests"
      : statusFilter === "Approved"
      ? "Approved Bookings"
      : "Active Booking Requests"}

  </h2>

  <p className="mt-1 text-sm text-gray-500">
    {statusFilter === "Pending"
      ? `${activeBookings.length} pending booking(s) awaiting your response.`
      : statusFilter === "Approved"
      ? `${activeBookings.length} approved booking(s).`
      : "Pending requests and approved rentals."}
  </p>
</div>
          

              <div className="space-y-5">
                {activeBookings.map(renderBooking)}
              </div>
            </section>
          )}

          {/* =====================================================
              REJECTED BOOKINGS
          ===================================================== */}

          {rejectedBookingsList.length > 0 && (
            <section className="mt-10">

              <div className="mb-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-red-700 sm:text-3xl">
                  <span className="mr-2 inline-block h-3 w-3 rounded-full bg-gradient-to-r from-red-400 to-pink-500" />
                  Rejected Bookings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {rejectedBookingsList.length} rejected
                  booking(s).
                </p>
              </div>

              <div className="space-y-5">
                {rejectedBookingsList.map(renderBooking)}
              </div>
            </section>
          )}

          {/* =====================================================
              CANCELLED BOOKINGS
          ===================================================== */}

          {cancelledBookings.length > 0 && (
            <section className="mt-10">

              <div className="mb-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-700 sm:text-3xl">
                  <span className="mr-2 inline-block h-3 w-3 rounded-full bg-gray-400" />
                  Cancelled Bookings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {cancelledBookings.length} cancelled
                  booking(s).
                </p>
              </div>

              <div className="space-y-5">
                {cancelledBookings.map(renderBooking)}
              </div>
            </section>
          )}

          {/* =====================================================
              COMPLETED RENTALS
          ===================================================== */}

          {completedBookings.length > 0 && (
            <section className="mt-10">

              <div className="mb-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-purple-700 sm:text-3xl">
                  <span className="mr-2 inline-block h-3 w-3 rounded-full bg-gradient-to-r from-violet-400 to-purple-500" />
                  Completed Rentals
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {completedBookings.length} completed
                  rental(s).
                </p>
              </div>

              <div className="space-y-5">
                {completedBookings.map(renderBooking)}
              </div>
            </section>
          )}

          {/* =====================================================
              NO RESULTS
          ===================================================== */}

          {filteredBookings.length === 0 && (
            <div
              className="
                mt-8
                rounded-3xl
                border
                border-gray-100
                bg-white
                p-10
                text-center
                shadow-sm
              "
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                {hasFilters ? (
                  <FaSearch className="text-xl" />
                ) : (
                  <FaCalendarAlt className="text-xl" />
                )}
              </div>

              <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
                {hasFilters
                  ? "No matching bookings"
                  : "No Booking Requests"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                {hasFilters
                  ? "Try changing your search or filters to find the booking you're looking for."
                  : "Booking requests will appear here."}
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-purple-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-purple-700
                  "
                >
                  <FaTimes />
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* =====================================================
              DELETED VEHICLE BOOKINGS
          ===================================================== */}

          {bookings.some((booking) => !booking.car) && (
            <section className="mt-10">

              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-2xl font-extrabold text-gray-700">
                  🗑 Archived Bookings
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {
                    bookings.filter(
                      (booking) => !booking.car
                    ).length
                  }{" "}
                  booking(s) belong to deleted vehicles.
                </p>
              </div>

            </section>
          )}

        </div>
      </div>
    </>
  );
}

export default BookingRequests;