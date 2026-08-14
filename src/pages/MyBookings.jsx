import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import { db, auth } from "../firebase/firebase";
import { createNotification } from "../services/notificationService";

import BookingCard from "../components/booking/BookingCard";
import ArchivedBookingCard from "../components/booking/ArchivedBookingCard";
import BookingSection from "../components/booking/BookingSection";

import { getBookingCategory } from "../utils/bookingUtils";

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

import {
  FaClock,
  FaCarSide,
  FaCalendarAlt,
  FaHistory,
  FaSearch,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [highlightedBooking, setHighlightedBooking] =
    useState(null);

  // Search / Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const location = useLocation();

  // =========================================================
  // Fetch Bookings - Real Time
  // =========================================================

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "bookings"),
      where(
        "renterId",
        "==",
        auth.currentUser.uid
      )
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        try {
          const bookingList = await Promise.all(
            snapshot.docs.map(
              async (bookingDoc) => {
                const booking =
                  bookingDoc.data();

                const carRef = doc(
                  db,
                  "cars",
                  booking.carId
                );

                const carSnap =
                  await getDoc(carRef);

                return {
                  id: bookingDoc.id,
                  ...booking,
                  car: carSnap.exists()
                    ? carSnap.data()
                    : null,
                };
              }
            )
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

  // =========================================================
  // Notification Booking Highlight
  // =========================================================

  useEffect(() => {
    const bookingId =
      location.state?.bookingId;

    if (
      !bookingId ||
      bookings.length === 0
    ) {
      return;
    }

    const element =
      document.getElementById(
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
  // Cancel Booking
  // =========================================================

  async function cancelBooking(id) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      const booking = bookings.find(
        (booking) =>
          booking.id === id
      );

      if (!booking) {
        console.error(
          "Booking not found."
        );
        return;
      }

      await updateDoc(
        doc(db, "bookings", id),
        {
          status: "Cancelled",
        }
      );

      await createNotification({
        userId: booking.ownerId,
        type: "bookingCancelledByRenter",
        title: "Booking Cancelled",
        subtitle: `${
          booking.car?.brand || ""
        } ${
          booking.car?.model || ""
        }`,
        message: `${
          booking.renterName ||
          "A renter"
        } cancelled their booking.`,
        bookingId: booking.id,
        carId: booking.carId,
      });

      await fetchBookings();
    } catch (error) {
      console.error(
        "Cancel Booking Error:",
        error
      );
    }
  }

  // =========================================================
  // Fetch Bookings
  // =========================================================

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

      const snapshot =
        await getDocs(q);

      const bookingList =
        await Promise.all(
          snapshot.docs.map(
            async (bookingDoc) => {
              const booking =
                bookingDoc.data();

              const carRef = doc(
                db,
                "cars",
                booking.carId
              );

              const carSnap =
                await getDoc(carRef);

              return {
                id: bookingDoc.id,
                ...booking,
                car: carSnap.exists()
                  ? carSnap.data()
                  : null,
              };
            }
          )
        );

      setBookings(bookingList);
    } catch (error) {
      console.error(
        "Fetch Bookings Error:",
        error
      );
    }
  }

  // =========================================================
  // Get Booking Category
  // =========================================================

  function getCategory(booking) {
    return getBookingCategory(booking);
  }

  // =========================================================
  // Search + Filter
  // =========================================================

  const filteredBookings = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return bookings.filter((booking) => {
      const category =
        getCategory(booking);

      // -----------------------------------------------
      // Search
      // -----------------------------------------------

      const brand =
        booking.car?.brand || "";

      const model =
        booking.car?.model || "";

      const vehicleType =
        booking.car?.vehicleType || "";

      const location =
        booking.car?.location || "";

      const pickupDate =
        booking.pickupDate || "";

      const returnDate =
        booking.returnDate || "";

      const searchableText = `
        ${brand}
        ${model}
        ${vehicleType}
        ${location}
        ${pickupDate}
        ${returnDate}
        ${booking.status || ""}
      `.toLowerCase();

      const matchesSearch =
        search === "" ||
        searchableText.includes(search);

      if (!matchesSearch) {
        return false;
      }

      // -----------------------------------------------
      // Filter
      // -----------------------------------------------

      if (activeFilter === "All") {
        return true;
      }

      if (activeFilter === "Pending") {
        return category === "Pending";
      }

      if (activeFilter === "Active") {
        return category === "Active";
      }

      if (activeFilter === "Upcoming") {
        return category === "Upcoming";
      }

      if (activeFilter === "History") {
        return [
          "Completed",
          "Cancelled",
          "Rejected",
          "Archived",
        ].includes(category);
      }

      return true;
    });
  }, [
    bookings,
    searchTerm,
    activeFilter,
  ]);

  // =========================================================
  // Group Filtered Bookings
  // =========================================================

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

  filteredBookings.forEach(
    (booking) => {
      const category =
        getCategory(booking);

      if (
        groupedBookings[category]
      ) {
        groupedBookings[
          category
        ].push(booking);
      } else {
        groupedBookings.Other.push(
          booking
        );
      }
    }
  );

  // =========================================================
  // Booking Card
  // =========================================================

  function renderBookingCard(booking) {
    if (!booking.car) {
      return (
        <ArchivedBookingCard
          key={booking.id}
          booking={booking}
          highlightedBooking={
            highlightedBooking
          }
        />
      );
    }

    return (
      <BookingCard
        key={booking.id}
        booking={booking}
        cancelBooking={cancelBooking}
        highlightedBooking={
          highlightedBooking
        }
      />
    );
  }

  // =========================================================
  // Statistics
  // =========================================================

  const pendingCount =
    bookings.filter(
      (booking) =>
        getCategory(booking) ===
        "Pending"
    ).length;

  const activeCount =
    bookings.filter(
      (booking) =>
        getCategory(booking) ===
        "Active"
    ).length;

  const upcomingCount =
    bookings.filter(
      (booking) =>
        getCategory(booking) ===
        "Upcoming"
    ).length;

  const historyCount =
    bookings.filter((booking) =>
      [
        "Completed",
        "Cancelled",
        "Rejected",
        "Archived",
      ].includes(
        getCategory(booking)
      )
    ).length;

  const hasBookings =
    bookings.length > 0;

  const hasFilteredBookings =
    filteredBookings.length > 0;

  // =========================================================
  // Filter Options
  // =========================================================

  const filters = [
    {
      label: "All",
      count: bookings.length,
    },
    {
      label: "Pending",
      count: pendingCount,
    },
    {
      label: "Active",
      count: activeCount,
    },
    {
      label: "Upcoming",
      count: upcomingCount,
    },
    {
      label: "History",
      count: historyCount,
    },
  ];

  // =========================================================
  // Render
  // =========================================================

  return (
    <>
      <DashboardNavbar />

      <main
        className="
          min-h-screen
          bg-gradient-to-b
          from-orange-50
          via-amber-50/30
          to-gray-50
          py-6
          sm:py-8
          lg:py-10
        "
      >
        <div
          className="
            mx-auto
            max-w-6xl
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* =================================================
              HERO
          ================================================= */}

          <section
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-gradient-to-r
              from-orange-300
              via-orange-200
              to-amber-200
              px-6
              py-7
              shadow-sm
              sm:px-8
              sm:py-9
            "
          >

            {/* Sunset Glow */}

            <div
              className="
                absolute
                -right-12
                -top-16
                h-56
                w-56
                rounded-full
                bg-yellow-100/70
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-20
                left-1/3
                h-48
                w-48
                rounded-full
                bg-orange-400/20
                blur-3xl
              "
            />

            <div className="relative">

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/75
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-orange-700
                  backdrop-blur
                "
              >
                <FaCarSide />

                Your Journey
              </span>

              <h1
                className="
                  mt-3
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  sm:text-4xl
                "
              >
                My Bookings
              </h1>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-relaxed
                  text-gray-700
                  sm:text-base
                "
              >
                Keep track of your rental requests,
                upcoming trips, and travel history.
              </p>

            </div>
          </section>

          {/* =================================================
              STATS
          ================================================= */}

          {hasBookings && (
            <section
              className="
                mt-6
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-4
                sm:gap-4
              "
            >

              {/* Pending */}

              <div
                className="
                  rounded-2xl
                  border
                  border-amber-100
                  bg-white
                  p-4
                  shadow-sm
                  sm:p-5
                "
              >

                <div className="flex items-center gap-2">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-100
                      text-amber-600
                    "
                  >
                    <FaClock />
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-500
                      sm:text-sm
                    "
                  >
                    Pending
                  </span>

                </div>

                <p
                  className="
                    mt-3
                    text-2xl
                    font-extrabold
                    text-amber-600
                    sm:text-3xl
                  "
                >
                  {pendingCount}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Awaiting confirmation
                </p>

              </div>

              {/* Active */}

              <div
                className="
                  rounded-2xl
                  border
                  border-emerald-100
                  bg-white
                  p-4
                  shadow-sm
                  sm:p-5
                "
              >

                <div className="flex items-center gap-2">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-100
                      text-emerald-600
                    "
                  >
                    <FaCarSide />
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-500
                      sm:text-sm
                    "
                  >
                    Active
                  </span>

                </div>

                <p
                  className="
                    mt-3
                    text-2xl
                    font-extrabold
                    text-emerald-600
                    sm:text-3xl
                  "
                >
                  {activeCount}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Current rentals
                </p>

              </div>

              {/* Upcoming */}

              <div
                className="
                  rounded-2xl
                  border
                  border-orange-100
                  bg-white
                  p-4
                  shadow-sm
                  sm:p-5
                "
              >

                <div className="flex items-center gap-2">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-100
                      text-orange-600
                    "
                  >
                    <FaCalendarAlt />
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-500
                      sm:text-sm
                    "
                  >
                    Upcoming
                  </span>

                </div>

                <p
                  className="
                    mt-3
                    text-2xl
                    font-extrabold
                    text-orange-600
                    sm:text-3xl
                  "
                >
                  {upcomingCount}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Future rentals
                </p>

              </div>

              {/* History */}

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-sm
                  sm:p-5
                "
              >

                <div className="flex items-center gap-2">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-gray-100
                      text-gray-500
                    "
                  >
                    <FaHistory />
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-500
                      sm:text-sm
                    "
                  >
                    History
                  </span>

                </div>

                <p
                  className="
                    mt-3
                    text-2xl
                    font-extrabold
                    text-gray-700
                    sm:text-3xl
                  "
                >
                  {historyCount}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Past bookings
                </p>

              </div>

            </section>
          )}

          {/* =================================================
              SEARCH + FILTER
          ================================================= */}

          {hasBookings && (
            <section
              className="
                mt-6
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-white
                p-4
                shadow-sm
                sm:p-5
              "
            >

              {/* Search */}

              <div className="relative">

                <FaSearch
                  className="
                    pointer-events-none
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
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  placeholder="Search by car, location, vehicle type, or date..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    py-3.5
                    pl-11
                    pr-11
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-orange-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-orange-100
                  "
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchTerm("")
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-8
                      w-8
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      text-gray-400
                      transition
                      hover:bg-gray-200
                      hover:text-gray-700
                    "
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}

              </div>

              {/* Filters */}

              <div
                className="
                  mt-4
                  flex
                  gap-2
                  overflow-x-auto
                  pb-1
                "
              >

                {filters.map((filter) => {

                  const isActive =
                    activeFilter ===
                    filter.label;

                  return (
                    <button
                      key={filter.label}
                      type="button"
                      onClick={() =>
                        setActiveFilter(
                          filter.label
                        )
                      }
                      className={`
                        inline-flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-xl
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        transition-all
                        ${
                          isActive
                            ? "bg-orange-500 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                        }
                      `}
                    >
                      {filter.label}

                      <span
                        className={`
                          rounded-full
                          px-2
                          py-0.5
                          text-xs
                          ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-white text-gray-500"
                          }
                        `}
                      >
                        {filter.count}
                      </span>
                    </button>
                  );
                })}

              </div>

              {/* Search Result Info */}

              {(searchTerm ||
                activeFilter !== "All") && (
                <div
                  className="
                    mt-4
                    flex
                    flex-col
                    gap-2
                    text-sm
                    text-gray-500
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  <p>
                    Showing{" "}
                    <span className="font-bold text-gray-800">
                      {filteredBookings.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-gray-800">
                      {bookings.length}
                    </span>{" "}
                    bookings
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("All");
                    }}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      font-semibold
                      text-orange-600
                      hover:text-orange-700
                    "
                  >
                    <FaTimes />

                    Clear filters
                  </button>

                </div>
              )}

            </section>
          )}

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!hasBookings ? (

            <section
              className="
                mt-8
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div
                className="
                  relative
                  px-6
                  py-14
                  text-center
                  sm:px-10
                  sm:py-16
                "
              >

                <div
                  className="
                    absolute
                    left-1/2
                    top-0
                    h-40
                    w-40
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-orange-100
                    blur-3xl
                  "
                />

                <div
                  className="
                    relative
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-3xl
                    bg-orange-100
                    text-orange-600
                    shadow-sm
                  "
                >
                  <FaCarSide className="text-3xl" />
                </div>

                <h2
                  className="
                    mt-6
                    text-2xl
                    font-extrabold
                    text-gray-900
                    sm:text-3xl
                  "
                >
                  No Bookings Yet
                </h2>

                <p
                  className="
                    mx-auto
                    mt-3
                    max-w-md
                    text-sm
                    leading-relaxed
                    text-gray-500
                    sm:text-base
                  "
                >
                  Your next adventure is waiting.
                  Browse available vehicles and
                  make your first booking.
                </p>

              </div>
            </section>

          ) : !hasFilteredBookings ? (

            /* =================================================
               NO SEARCH RESULTS
            ================================================= */

            <section
              className="
                mt-8
                rounded-3xl
                border
                border-gray-100
                bg-white
                px-6
                py-12
                text-center
                shadow-sm
                sm:py-14
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-orange-100
                  text-orange-500
                "
              >
                <FaSearch className="text-2xl" />
              </div>

              <h2
                className="
                  mt-5
                  text-xl
                  font-extrabold
                  text-gray-900
                  sm:text-2xl
                "
              >
                No Matching Bookings
              </h2>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  leading-relaxed
                  text-gray-500
                "
              >
                We couldn't find a booking matching
                your search or selected filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-orange-500
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-orange-600
                "
              >
                <FaCheckCircle />

                Show All Bookings
              </button>

            </section>

          ) : (

            /* =================================================
               BOOKING SECTIONS
            ================================================= */

            <div
              className="
                mt-8
                space-y-12
                sm:mt-10
              "
            >

              {/* Pending */}

              {groupedBookings.Pending.length >
                0 && (
                <BookingSection
                  title="Waiting for Confirmation"
                  emoji="⏳"
                  bookings={
                    groupedBookings.Pending
                  }
                  renderBooking={
                    renderBookingCard
                  }
                />
              )}

              {/* Active */}

              {groupedBookings.Active.length >
                0 && (
                <BookingSection
                  title="Current Rentals"
                  emoji="🚗"
                  bookings={
                    groupedBookings.Active
                  }
                  renderBooking={
                    renderBookingCard
                  }
                />
              )}

              {/* Upcoming */}

              {groupedBookings.Upcoming.length >
                0 && (
                <BookingSection
                  title="Upcoming Rentals"
                  emoji="📅"
                  bookings={
                    groupedBookings.Upcoming
                  }
                  renderBooking={
                    renderBookingCard
                  }
                />
              )}

              {/* History */}

              {(
                groupedBookings.Completed
                  .length > 0 ||
                groupedBookings.Cancelled
                  .length > 0 ||
                groupedBookings.Rejected
                  .length > 0 ||
                groupedBookings.Archived
                  .length > 0
              ) && (

                <section>

                  <div
                    className="
                      mb-5
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gray-100
                        text-gray-500
                      "
                    >
                      <FaHistory />
                    </div>

                    <div>

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                      >

                        <h2
                          className="
                            text-2xl
                            font-extrabold
                            text-gray-900
                          "
                        >
                          Booking History
                        </h2>

                        <span
                          className="
                            rounded-full
                            bg-gray-200
                            px-3
                            py-1
                            text-sm
                            font-bold
                            text-gray-600
                          "
                        >
                          {historyCount}
                        </span>

                      </div>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-gray-500
                        "
                      >
                        Your completed and past
                        rental activity.
                      </p>

                    </div>

                  </div>

                  <div className="space-y-6">

                    {groupedBookings.Completed.map(
                      renderBookingCard
                    )}

                    {groupedBookings.Cancelled.map(
                      renderBookingCard
                    )}

                    {groupedBookings.Rejected.map(
                      renderBookingCard
                    )}

                    {groupedBookings.Archived.map(
                      renderBookingCard
                    )}

                  </div>

                </section>
              )}

            </div>
          )}

        </div>
      </main>
    </>
  );
}

export default MyBookings;