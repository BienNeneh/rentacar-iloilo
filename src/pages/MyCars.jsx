import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import {
  FaMapMarkerAlt,
  FaCarSide,
  FaCog,
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function MyCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  // =========================================================
  // Fetch Owner's Cars
  // =========================================================

  useEffect(() => {
    async function fetchCars() {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(db, "cars"),
          where("ownerId", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);

        const carList = querySnapshot.docs.map((carDoc) => ({
          id: carDoc.id,
          ...carDoc.data(),
        }));

        setCars(carList);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load your vehicles.");
      }
    }

    fetchCars();
  }, []);

  // =========================================================
  // Delete Car
  // =========================================================

  async function deleteCar(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "cars", id));

      setCars((prevCars) =>
        prevCars.filter((car) => car.id !== id)
      );

      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  // =========================================================
  // Statistics
  // =========================================================

  const availableCars = cars.filter(
    (car) => (car.status || "available") === "available"
  ).length;

  const unavailableCars = cars.filter(
    (car) => (car.status || "available") !== "available"
  ).length;

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

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
              sm:py-8
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

            <div
              className="
                relative
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >

              {/* Hero Text */}

              <div className="max-w-2xl">

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

                  Owner Dashboard
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
                  My Vehicles
                </h1>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-relaxed
                    text-gray-700
                    sm:text-base
                  "
                >
                  Manage your vehicles, listings,
                  and availability from one place.
                </p>

              </div>

              {/* Add Vehicle */}

              <button
                onClick={() => navigate("/add-car")}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gray-900
                  px-6
                  py-3.5
                  font-bold
                  text-white
                  shadow-lg
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-gray-800
                  hover:shadow-xl
                  sm:w-auto
                "
              >
                <FaPlus />

                Add Vehicle
              </button>

            </div>
          </section>

          {/* =================================================
              STATS
          ================================================= */}

          {cars.length > 0 && (
            <section
              className="
                mt-6
                grid
                grid-cols-3
                gap-3
                sm:gap-4
              "
            >

              {/* Total */}

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
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
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
                    Total
                  </span>
                </div>

                <p
                  className="
                    mt-3
                    text-2xl
                    font-extrabold
                    text-gray-900
                    sm:text-3xl
                  "
                >
                  {cars.length}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Vehicles
                </p>
              </div>

              {/* Available */}

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
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
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
                    <FaCheckCircle />
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-500
                      sm:text-sm
                    "
                  >
                    Available
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
                  {availableCars}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Ready to rent
                </p>
              </div>

              {/* Unavailable */}

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
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
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
                    <FaExclamationCircle />
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-500
                      sm:text-sm
                    "
                  >
                    Unavailable
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
                  {unavailableCars}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Not available
                </p>
              </div>

            </section>
          )}

          {/* =================================================
              SECTION HEADER
          ================================================= */}

          {cars.length > 0 && (
            <div
              className="
                mt-8
                flex
                items-end
                justify-between
                gap-4
                sm:mt-10
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
                  Your Vehicles
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  {cars.length}{" "}
                  {cars.length === 1
                    ? "vehicle"
                    : "vehicles"}{" "}
                  in your listings.
                </p>

              </div>

              <button
                onClick={() =>
                  navigate("/add-car")
                }
                className="
                  hidden
                  items-center
                  gap-2
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                  font-bold
                  text-orange-600
                  transition
                  hover:bg-orange-50
                  sm:flex
                "
              >
                <FaPlus />

                Add another
              </button>

            </div>
          )}

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {cars.length === 0 ? (

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
                  py-12
                  text-center
                  sm:px-10
                  sm:py-16
                "
              >

                {/* Decorative Glow */}

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

                {/* Icon */}

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
                  No Vehicles Listed Yet
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
                  Start earning by listing your
                  first vehicle. It only takes a few
                  minutes to get started.
                </p>

                <button
                  onClick={() =>
                    navigate("/add-car")
                  }
                  className="
                    relative
                    mt-7
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-orange-500
                    to-orange-600
                    px-7
                    py-3.5
                    font-bold
                    text-white
                    shadow-lg
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:from-orange-600
                    hover:to-orange-700
                    hover:shadow-xl
                    sm:w-auto
                  "
                >
                  <FaPlus />

                  Add Your First Vehicle

                  <FaArrowRight
                    className="text-sm"
                  />
                </button>

              </div>
            </section>

          ) : (

            /* =================================================
               VEHICLE GRID
            ================================================= */

            <section
              className="
                mt-5
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                sm:gap-6
                xl:grid-cols-3
              "
            >

              {cars.map((car) => {

                const isAvailable =
                  (car.status || "available") ===
                  "available";

                return (
                  <article
                    key={car.id}
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

                    {/* Sunset Accent */}

                    <div
                      className="
                        absolute
                        inset-x-0
                        top-0
                        z-10
                        h-1
                        bg-gradient-to-r
                        from-orange-300
                        via-orange-400
                        to-amber-400
                      "
                    />

                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div
                      className="
                        relative
                        h-56
                        overflow-hidden
                        sm:h-52
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
                          from-black/55
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
                        <div
                          className={`
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            shadow-sm
                            backdrop-blur
                            ${
                              isAvailable
                                ? "bg-emerald-50/95 text-emerald-700"
                                : "bg-gray-100/95 text-gray-700"
                            }
                          `}
                        >
                          <span
                            className={`
                              h-2
                              w-2
                              rounded-full
                              ${
                                isAvailable
                                  ? "bg-emerald-500"
                                  : "bg-gray-500"
                              }
                            `}
                          />

                          {isAvailable
                            ? "Available"
                            : "Unavailable"}
                        </div>
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
                            mt-0.5
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

                      {/* Name */}

                      <h3
                        className="
                          truncate
                          text-2xl
                          font-extrabold
                          tracking-tight
                          text-gray-900
                        "
                      >
                        {car.brand} {car.model}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-medium
                          text-gray-500
                        "
                      >
                        {car.vehicleType}

                        <span
                          className="
                            mx-1
                            text-gray-300
                          "
                        >
                          •
                        </span>

                        {car.year}
                      </p>

                      {/* Details */}

                      <div className="mt-5 space-y-3">

                        {/* Location */}

                        <div
                          className="
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

                        {/* Transmission / Seats */}

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            text-sm
                            text-gray-500
                          "
                        >

                          <span
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-2.5
                            "
                          >
                            <FaCog
                              className="
                                shrink-0
                                text-orange-500
                              "
                            />

                            <span className="truncate">
                              {car.transmission}
                            </span>
                          </span>

                          <span
                            className="
                              flex
                              shrink-0
                              items-center
                              gap-2
                            "
                          >
                            <FaUsers
                              className="
                                text-orange-500
                              "
                            />

                            {car.seats} Seats
                          </span>

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

                      {/* =================================================
                          PRIMARY ACTION
                      ================================================= */}

                      <button
                        onClick={() =>
                          navigate(
                            `/manage-car/${car.id}`
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
                          px-4
                          py-3
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
                        <FaCog />

                        Manage Vehicle

                        <FaArrowRight
                          className="
                            ml-auto
                            text-xs
                          "
                        />
                      </button>

                      {/* =================================================
                          SECONDARY ACTIONS
                      ================================================= */}

                      <div
                        className="
                          mt-2.5
                          grid
                          grid-cols-2
                          gap-2.5
                        "
                      >

                        <button
                          onClick={() =>
                            navigate(
                              `/edit-car/${car.id}`
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-orange-100
                            bg-orange-50
                            px-3
                            py-3
                            text-sm
                            font-bold
                            text-orange-600
                            transition
                            hover:border-orange-200
                            hover:bg-orange-100
                          "
                        >
                          <FaEdit />

                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteCar(car.id)
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-red-100
                            bg-red-50
                            px-3
                            py-3
                            text-sm
                            font-bold
                            text-red-600
                            transition
                            hover:border-red-200
                            hover:bg-red-100
                          "
                        >
                          <FaTrash />

                          Delete
                        </button>

                      </div>

                    </div>
                  </article>
                );
              })}

            </section>
          )}

        </div>
      </main>
    </>
  );
}

export default MyCars;