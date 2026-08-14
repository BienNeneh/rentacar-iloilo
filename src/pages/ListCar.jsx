import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaCarSide,
  FaCog,
  FaUsers,
  FaGasPump,
  FaArrowRight,
  FaTimes,
  FaSlidersH,
} from "react-icons/fa";

function ListCar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // =========================================================
  // URL SEARCH PARAMETERS
  // =========================================================

  const locationParam =
    searchParams.get("location");

  const vehicleTypeParam =
    searchParams.get("type");

  const pickupDate =
    searchParams.get("pickup");

  const returnDate =
    searchParams.get("return");

  // =========================================================
  // STATE
  // =========================================================

  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeType, setActiveType] =
    useState("All");

  const [selectedLocation, setSelectedLocation] =
    useState(locationParam || "");

  const [loading, setLoading] =
    useState(true);

  // =========================================================
  // FETCH CARS + BOOKINGS
  // =========================================================

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const carSnapshot =
          await getDocs(
            collection(db, "cars")
          );

        const bookingSnapshot =
          await getDocs(
            collection(db, "bookings")
          );

        const carList =
          carSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        const bookingList =
          bookingSnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setCars(carList);
        setBookings(bookingList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // =========================================================
  // RENTAL DAYS
  // =========================================================

  let rentalDays = null;

  if (pickupDate && returnDate) {
    const pickup =
      new Date(pickupDate);

    const returnD =
      new Date(returnDate);

    rentalDays = Math.ceil(
      (returnD - pickup) /
        (1000 * 60 * 60 * 24)
    );
  }

  // =========================================================
  // REQUESTED DATES
  // =========================================================

  let requestedDates = [];

  if (pickupDate && returnDate) {
    const current =
      new Date(pickupDate);

    const end =
      new Date(returnDate);

    while (current <= end) {
      requestedDates.push(
        current
          .toISOString()
          .split("T")[0]
      );

      current.setDate(
        current.getDate() + 1
      );
    }
  }

  // =========================================================
  // VEHICLE TYPES
  // =========================================================

  const vehicleTypes = useMemo(() => {
    const types = cars
      .map((car) => car.vehicleType)
      .filter(Boolean);

    return [
      "All",
      ...Array.from(
        new Set(types)
      ),
    ];
  }, [cars]);

  // =========================================================
  // LOCATIONS
  // =========================================================

  const locations = useMemo(() => {
    return Array.from(
      new Set(
        cars
          .map((car) => car.location)
          .filter(Boolean)
      )
    );
  }, [cars]);

  // =========================================================
  // FILTER CARS
  // =========================================================

  const filteredCars = useMemo(() => {
    const search =
      searchTerm
        .trim()
        .toLowerCase();

    return cars.filter((car) => {

      // -----------------------------------------------
      // Search
      // -----------------------------------------------

      const searchableText = `
        ${car.brand || ""}
        ${car.model || ""}
        ${car.vehicleType || ""}
        ${car.location || ""}
        ${car.transmission || ""}
        ${car.fuelType || ""}
      `.toLowerCase();

      const matchesSearch =
        search === "" ||
        searchableText.includes(
          search
        );

      // -----------------------------------------------
      // Location
      // -----------------------------------------------

      const matchesLocation =
        !selectedLocation ||
        car.location
          ?.toLowerCase() ===
          selectedLocation.toLowerCase();

      // -----------------------------------------------
      // Vehicle Type
      // -----------------------------------------------

      const matchesType =
        activeType === "All" ||
        car.vehicleType
          ?.toLowerCase() ===
          activeType.toLowerCase();

      // -----------------------------------------------
      // Availability Status
      // -----------------------------------------------

      const isAvailable =
        (car.status ||
          "available") ===
        "available";

      // -----------------------------------------------
      // Rental Duration
      // -----------------------------------------------

      const matchesRentalDuration =
        rentalDays === null ||
        (
          rentalDays >=
            (car.minRentalDays ||
              1) &&
          rentalDays <=
            (car.maxRentalDays ||
              365)
        );

      // -----------------------------------------------
      // Manual Blocked Dates
      // -----------------------------------------------

      const hasBlockedDatesOverlap =
        !car.blockedDates ||
        !requestedDates.some(
          (date) =>
            car.blockedDates.includes(
              date
            )
        );

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        isAvailable &&
        matchesRentalDuration &&
        hasBlockedDatesOverlap
      );
    });
  }, [
    cars,
    searchTerm,
    selectedLocation,
    activeType,
    rentalDays,
    requestedDates,
  ]);

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  function clearFilters() {
    setSearchTerm("");
    setActiveType("All");
    setSelectedLocation("");
  }

  const hasFilters =
    searchTerm ||
    activeType !== "All" ||
    selectedLocation;

  // =========================================================
  // RENDER
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
            max-w-7xl
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
              py-8
              shadow-sm
              sm:px-8
              sm:py-10
            "
          >

            {/* Glow */}

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

                Explore Iloilo
              </span>

              <h1
                className="
                  mt-3
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Find Your Ride
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
                Explore vehicles from local
                owners and find the perfect
                ride for your next trip.
              </p>

            </div>
          </section>

          {/* =================================================
              SEARCH + FILTER PANEL
          ================================================= */}

          <section
            className="
              relative
              z-10
              -mt-5
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-4
              shadow-lg
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
                placeholder="Search by brand, model, location..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  py-4
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
                flex-col
                gap-3
                lg:flex-row
                lg:items-center
              "
            >

              {/* Vehicle Type */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  overflow-x-auto
                  pb-1
                "
              >

                {vehicleTypes.map(
                  (type) => {

                    const isActive =
                      activeType ===
                      type;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setActiveType(
                            type
                          )
                        }
                        className={`
                          shrink-0
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
                        {type}
                      </button>
                    );
                  }
                )}

              </div>

              {/* Location */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  lg:ml-auto
                "
              >

                <FaMapMarkerAlt
                  className="
                    shrink-0
                    text-orange-500
                  "
                />

                <select
                  value={selectedLocation}
                  onChange={(e) =>
                    setSelectedLocation(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-3
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-700
                    outline-none
                    focus:border-orange-400
                    focus:ring-4
                    focus:ring-orange-100
                    sm:w-auto
                  "
                >

                  <option value="">
                    All Locations
                  </option>

                  {locations.map(
                    (location) => (
                      <option
                        key={location}
                        value={location}
                      >
                        {location}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Clear */}

              {hasFilters && (
                <button
                  type="button"
                  onClick={
                    clearFilters
                  }
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-bold
                    text-orange-600
                    transition
                    hover:bg-orange-50
                  "
                >
                  <FaTimes />

                  Clear
                </button>
              )}

            </div>

          </section>

          {/* =================================================
              RESULTS HEADER
          ================================================= */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  sm:text-3xl
                "
              >
                Available Vehicles
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                "
              >
                {loading
                  ? "Finding available vehicles..."
                  : `${filteredCars.length} ${
                      filteredCars.length ===
                      1
                        ? "vehicle"
                        : "vehicles"
                    } available`}
              </p>

            </div>

            {(pickupDate &&
              returnDate) && (
              <div
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-xl
                  bg-orange-50
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-orange-700
                "
              >
                📅{" "}
                {pickupDate} →{" "}
                {returnDate}
              </div>
            )}

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div
              className="
                mt-6
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      overflow-hidden
                      rounded-3xl
                      bg-white
                      shadow-sm
                    "
                  >

                    <div
                      className="
                        h-56
                        animate-pulse
                        bg-gray-200
                      "
                    />

                    <div className="p-6">

                      <div
                        className="
                          h-7
                          w-2/3
                          animate-pulse
                          rounded
                          bg-gray-200
                        "
                      />

                      <div
                        className="
                          mt-4
                          h-4
                          w-1/2
                          animate-pulse
                          rounded
                          bg-gray-100
                        "
                      />

                      <div
                        className="
                          mt-6
                          h-4
                          w-3/4
                          animate-pulse
                          rounded
                          bg-gray-100
                        "
                      />

                    </div>
                  </div>
                )
              )}

            </div>

          ) : filteredCars.length === 0 ? (

            /* =================================================
               NO RESULTS
            ================================================= */

            <section
              className="
                mt-6
                rounded-3xl
                border
                border-gray-100
                bg-white
                px-6
                py-14
                text-center
                shadow-sm
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-orange-100
                  text-orange-500
                "
              >
                <FaSearch className="text-3xl" />
              </div>

              <h2
                className="
                  mt-6
                  text-2xl
                  font-extrabold
                  text-gray-900
                "
              >
                No Vehicles Found
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-md
                  text-sm
                  leading-relaxed
                  text-gray-500
                "
              >
                Try changing your search or
                removing some filters to see
                more available vehicles.
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-orange-500
                  px-6
                  py-3
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-orange-600
                "
              >
                <FaTimes />

                Clear Filters
              </button>

            </section>

          ) : (

            /* =================================================
               CAR GRID
            ================================================= */

            <section
              className="
                mt-6
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {filteredCars.map(
                (car) => (

                  <article
                    key={car.id}
                    className="
                      group
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

                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div
                      className="
                        relative
                        h-56
                        overflow-hidden
                      "
                    >

                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      {/* Image Overlay */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/60
                          via-transparent
                          to-black/5
                        "
                      />

                      {/* Availability */}

                      <div
                        className="
                          absolute
                          left-4
                          top-4
                        "
                      >

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-emerald-50/95
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-emerald-700
                            shadow-sm
                            backdrop-blur
                          "
                        >

                          <span
                            className="
                              h-2
                              w-2
                              rounded-full
                              bg-emerald-500
                            "
                          />

                          Available
                        </span>

                      </div>

                      {/* Price */}

                      <div
                        className="
                          absolute
                          bottom-4
                          left-4
                        "
                      >

                        <p
                          className="
                            text-xs
                            font-medium
                            text-white/80
                          "
                        >
                          Daily rate
                        </p>

                        <p
                          className="
                            text-2xl
                            font-extrabold
                            text-white
                          "
                        >
                          ₱
                          {Number(
                            car.price
                          ).toLocaleString()}

                          <span
                            className="
                              text-sm
                              font-semibold
                              text-white/80
                            "
                          >
                            /day
                          </span>
                        </p>

                      </div>

                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="p-5 sm:p-6">

                      {/* Vehicle Name */}

                      <h2
                        className="
                          truncate
                          text-2xl
                          font-extrabold
                          tracking-tight
                          text-gray-900
                        "
                      >
                        {car.brand}{" "}
                        {car.model}
                      </h2>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-medium
                          text-gray-500
                        "
                      >
                        {car.vehicleType}

                        <span className="mx-1 text-gray-300">
                          •
                        </span>

                        {car.year}
                      </p>

                      {/* Rating */}

                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          gap-2
                          text-sm
                        "
                      >

                        <span
                          className="
                            font-bold
                            text-gray-800
                          "
                        >
                          ⭐ 5.0
                        </span>

                        <span
                          className="
                            text-gray-400
                          "
                        >
                          (0 Reviews)
                        </span>

                      </div>

                      {/* Location */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          gap-2.5
                          text-sm
                          text-gray-500
                        "
                      >

                        <FaMapMarkerAlt
                          className="
                            shrink-0
                            text-orange-500
                          "
                        />

                        <span className="truncate">
                          {car.location}
                        </span>

                      </div>

                      {/* Features */}

                      <div
                        className="
                          mt-4
                          grid
                          grid-cols-3
                          gap-2
                        "
                      >

                        <div
                          className="
                            rounded-xl
                            bg-gray-50
                            p-3
                            text-center
                          "
                        >

                          <FaCog
                            className="
                              mx-auto
                              text-orange-500
                            "
                          />

                          <p
                            className="
                              mt-1
                              truncate
                              text-xs
                              font-semibold
                              text-gray-600
                            "
                          >
                            {car.transmission}
                          </p>

                        </div>

                        <div
                          className="
                            rounded-xl
                            bg-gray-50
                            p-3
                            text-center
                          "
                        >

                          <FaUsers
                            className="
                              mx-auto
                              text-orange-500
                            "
                          />

                          <p
                            className="
                              mt-1
                              text-xs
                              font-semibold
                              text-gray-600
                            "
                          >
                            {car.seats}
                            {" "}Seats
                          </p>

                        </div>

                        <div
                          className="
                            rounded-xl
                            bg-gray-50
                            p-3
                            text-center
                          "
                        >

                          <FaGasPump
                            className="
                              mx-auto
                              text-orange-500
                            "
                          />

                          <p
                            className="
                              mt-1
                              truncate
                              text-xs
                              font-semibold
                              text-gray-600
                            "
                          >
                            {car.fuelType}
                          </p>

                        </div>

                      </div>

                      {/* Divider */}

                      <div
                        className="
                          my-5
                          h-px
                          bg-gray-100
                        "
                      />

                      {/* Action */}

                      <button
                        onClick={() =>
                          navigate(
                            `/car/${car.id}`
                          )
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-gray-900
                          px-5
                          py-3.5
                          font-bold
                          text-white
                          shadow-sm
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:bg-gray-800
                          hover:shadow-md
                        "
                      >
                        View Details

                        <FaArrowRight
                          className="
                            ml-auto
                            text-xs
                          "
                        />
                      </button>

                    </div>

                  </article>
                )
              )}

            </section>
          )}

        </div>
      </main>
    </>
  );
}

export default ListCar;