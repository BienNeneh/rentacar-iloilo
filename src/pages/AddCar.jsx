import { useState } from "react";
import { db, auth } from "../firebase/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import iloiloLocations from "../data/iloiloLocations";
import vehicleTypes from "../data/vehicleTypes";

import ImageUploader from "../components/upload/ImageUploader";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import {
  FaCarSide,
  FaMapMarkerAlt,
  FaUsers,
  FaCog,
  FaGasPump,
  FaMoneyBillWave,
  FaArrowLeft,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";

function AddCar() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [seats, setSeats] = useState("");
  const [transmission, setTransmission] =
    useState("Automatic");
  const [fuelType, setFuelType] =
    useState("Gasoline");
  const [price, setPrice] = useState("");
  const [description, setDescription] =
    useState("");
  const [image, setImage] = useState("");

  // =========================================================
  // Submit
  // =========================================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please log in first.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, "cars"), {
        location,
        vehicleType,
        brand,
        model,
        year,
        seats,
        transmission,
        fuelType,
        price,
        description,
        image,

        ownerId: auth.currentUser.uid,
        ownerEmail: auth.currentUser.email,

        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      setLocation("");
      setVehicleType("");
      setBrand("");
      setModel("");
      setYear("");
      setSeats("");
      setPrice("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <>
      <DashboardNavbar />

      <div
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => navigate("/my-cars")}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-xl
              px-3
              py-2
              text-sm
              font-semibold
              text-gray-600
              transition
              hover:bg-orange-50
              hover:text-orange-600
            "
          >
            <FaArrowLeft />

            Back to My Vehicles
          </button>

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
            {/* Decorative sunset glow */}

            <div
              className="
                absolute
                -right-10
                -top-16
                h-48
                w-48
                rounded-full
                bg-yellow-100/70
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-20
                right-1/3
                h-44
                w-44
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

                Owner Dashboard
              </span>

              <h1
                className="
                  mt-4
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  sm:text-4xl
                "
              >
                Add Your Vehicle
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
                Share your vehicle with travelers
                around Iloilo and start your next
                journey together.
              </p>

            </div>
          </section>

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <div
              className="
                mt-6
                overflow-hidden
                rounded-2xl
                border
                border-emerald-200
                bg-emerald-50
                p-5
                shadow-sm
              "
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-start gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-100
                      text-emerald-600
                    "
                  >
                    <FaCheckCircle />
                  </div>

                  <div>

                    <h3 className="font-bold text-emerald-800">
                      Vehicle added successfully!
                    </h3>

                    <p className="mt-1 text-sm text-emerald-700">
                      Your vehicle has been added to
                      your listings.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/my-cars")
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-emerald-600
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-emerald-700
                  "
                >
                  <FaCarSide />

                  View My Vehicles
                </button>

              </div>
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
          >

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <section
              className="
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-100
                      text-orange-600
                    "
                  >
                    <FaCarSide />
                  </div>

                  <div>

                    <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      Vehicle Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Tell travelers about your vehicle.
                    </p>

                  </div>

                </div>

              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">

                {/* Brand */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Car Brand
                  </label>

                  <input
                    type="text"
                    placeholder="Toyota"
                    value={brand}
                    onChange={(e) =>
                      setBrand(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                    required
                  />
                </div>

                {/* Model */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Car Model
                  </label>

                  <input
                    type="text"
                    placeholder="Vios"
                    value={model}
                    onChange={(e) =>
                      setModel(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                    required
                  />
                </div>

                {/* Location */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                    <FaMapMarkerAlt className="text-orange-500" />
                    Location
                  </label>

                  <select
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-gray-900
                      outline-none
                      transition
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                    required
                  >
                    <option value="">
                      Select Location
                    </option>

                    {iloiloLocations.map(
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

                {/* Vehicle Type */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Vehicle Type
                  </label>

                  <select
                    value={vehicleType}
                    onChange={(e) =>
                      setVehicleType(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-gray-900
                      outline-none
                      transition
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                    required
                  >
                    <option value="">
                      Select Vehicle Type
                    </option>

                    {vehicleTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Year
                  </label>

                  <input
                    type="text"
                    placeholder="2023"
                    value={year}
                    onChange={(e) =>
                      setYear(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                    required
                  />
                </div>

                {/* Seats */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                    <FaUsers className="text-orange-500" />
                    Seats
                  </label>

                  <input
                    type="number"
                    min="1"
                    placeholder="5"
                    value={seats}
                    onChange={(e) =>
                      setSeats(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                    required
                  />
                </div>

                {/* Transmission */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                    <FaCog className="text-orange-500" />
                    Transmission
                  </label>

                  <select
                    value={transmission}
                    onChange={(e) =>
                      setTransmission(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-gray-900
                      outline-none
                      transition
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                  >
                    <option>
                      Automatic
                    </option>

                    <option>
                      Manual
                    </option>
                  </select>
                </div>

                {/* Fuel */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                    <FaGasPump className="text-orange-500" />
                    Fuel Type
                  </label>

                  <select
                    value={fuelType}
                    onChange={(e) =>
                      setFuelType(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-gray-900
                      outline-none
                      transition
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                  >
                    <option>
                      Gasoline
                    </option>

                    <option>
                      Diesel
                    </option>

                    <option>
                      Hybrid
                    </option>

                    <option>
                      Electric
                    </option>
                  </select>
                </div>

              </div>
            </section>

            {/* =================================================
                PRICING
            ================================================= */}

            <section
              className="
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-100
                      text-amber-600
                    "
                  >
                    <FaMoneyBillWave />
                  </div>

                  <div>

                    <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      Rental Pricing
                    </h2>

                    <p className="text-sm text-gray-500">
                      Set the daily rate for your vehicle.
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-7">

                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Price Per Day
                </label>

                <div className="relative">

                  <span
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-lg
                      font-bold
                      text-orange-500
                    "
                  >
                    ₱
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="1500"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      py-3.5
                      pl-10
                      pr-4
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-orange-100
                    "
                    required
                  />

                </div>

                <p className="mt-2 text-xs text-gray-500">
                  This is the amount renters will see
                  as your daily rental rate.
                </p>

              </div>
            </section>

            {/* =================================================
                PHOTO
            ================================================= */}

            <section
              className="
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-100
                      text-orange-600
                    "
                  >
                    📸
                  </div>

                  <div>

                    <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      Vehicle Photo
                    </h2>

                    <p className="text-sm text-gray-500">
                      Give travelers a great first look
                      at your vehicle.
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-7">

                <ImageUploader
                  image={image}
                  setImage={setImage}
                />

              </div>
            </section>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <section
              className="
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-white
                shadow-sm
              "
            >

              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

                <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                  About Your Vehicle
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Tell renters what makes your vehicle
                  a great choice.
                </p>

              </div>

              <div className="p-5 sm:p-7">

                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Description
                </label>

                <textarea
                  rows="6"
                  placeholder="Tell renters about your vehicle, its condition, features, comfort, or anything else they should know..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="
                    w-full
                    resize-y
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-3.5
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

              </div>
            </section>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:justify-end
              "
            >

              <button
                type="button"
                onClick={() =>
                  navigate("/my-cars")
                }
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-6
                  py-4
                  font-bold
                  text-gray-700
                  shadow-sm
                  transition
                  hover:bg-gray-50
                  sm:w-auto
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
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
                  py-4
                  font-bold
                  text-white
                  shadow-lg
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:from-orange-600
                  hover:to-orange-700
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {loading ? (
                  "Saving Vehicle..."
                ) : (
                  <>
                    <FaPlus />

                    List My Vehicle
                  </>
                )}
              </button>

            </div>

          </form>

        </div>
      </div>
    </>
  );
}

export default AddCar;