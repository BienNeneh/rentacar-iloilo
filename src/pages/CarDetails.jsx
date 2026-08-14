import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { db, auth } from "../firebase/firebase";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import CarGallery from "../components/car/CarGallery";
import CarFeatures from "../components/car/CarFeatures";
import BookingCard from "../components/car/BookingCard";
import HostCard from "../components/car/HostCard";
import CarDescription from "../components/car/CarDescription";
import FullscreenGallery from "../components/car/FullscreenGallery";

import toast from "react-hot-toast";
import { createNotification } from "../services/notificationService";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCarSide,
  FaUsers,
  FaCog,
  FaGasPump,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

function CarDetails() {
  const [unavailableDates, setUnavailableDates] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const [totalDays, setTotalDays] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  const [car, setCar] = useState(null);

  const [currentImage, setCurrentImage] = useState("");
  const [showGallery, setShowGallery] = useState(false);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [selectedRange, setSelectedRange] = useState(null);

  // =========================================================
  // Check if current user owns this vehicle
  // =========================================================

  const isOwner =
    auth.currentUser &&
    car &&
    auth.currentUser.uid === car.ownerId;

  // =========================================================
  // Fetch Car
  // =========================================================

  useEffect(() => {
    async function fetchCar() {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const carData = {
            id: docSnap.id,
            ...docSnap.data(),
          };

          setCar(carData);

          // Fetch approved bookings
          const bookingQuery = query(
            collection(db, "bookings"),
            where("carId", "==", id),
            where("status", "==", "Approved")
          );

          const bookingSnapshot = await getDocs(
            bookingQuery
          );

          const bookedDates = bookingSnapshot.docs.map(
            (bookingDoc) => ({
              id: bookingDoc.id,
              ...bookingDoc.data(),
            })
          );

          setUnavailableDates(bookedDates);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCar();
  }, [id]);

  // =========================================================
  // Calculate Rental
  // =========================================================

  useEffect(() => {
    if (!car) return;

    if (!pickupDate || !returnDate) {
      setTotalDays(0);
      setEstimatedTotal(0);
      return;
    }

    const pickup = new Date(pickupDate);
    const dropoff = new Date(returnDate);

    const diff = Math.ceil(
      (dropoff - pickup) /
        (1000 * 60 * 60 * 24)
    );

    if (diff > 0) {
      setTotalDays(diff);

      setEstimatedTotal(
        diff * Number(car.price || 0)
      );
    } else {
      setTotalDays(0);
      setEstimatedTotal(0);
    }
  }, [pickupDate, returnDate, car]);

  // =========================================================
  // Set First Image
  // =========================================================

  useEffect(() => {
    if (!car) return;

    if (car.images?.length > 0) {
      setCurrentImage(car.images[0]);
    } else if (car.image) {
      setCurrentImage(car.image);
    }
  }, [car]);

  // =========================================================
  // Loading
  // =========================================================

  if (!car) {
    return (
      <>
        <DashboardNavbar />

        <div className="min-h-screen bg-[#fff8ef] flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">
              🚗
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Loading vehicle...
            </h1>

            <p className="text-gray-500 mt-2">
              Preparing your ride.
            </p>
          </div>
        </div>
      </>
    );
  }

  // =========================================================
  // Images
  // =========================================================

  const images =
    car.images?.length > 0
      ? car.images
      : car.image
      ? [car.image]
      : [];

  const currentIndex =
    images.indexOf(currentImage);

  const nextImage = () => {
    if (images.length <= 1) return;

    const next =
      (currentIndex + 1) % images.length;

    setCurrentImage(images[next]);
  };

  const previousImage = () => {
    if (images.length <= 1) return;

    const previous =
      (currentIndex - 1 + images.length) %
      images.length;

    setCurrentImage(images[previous]);
  };

  // =========================================================
  // Request Booking
  // =========================================================

  const requestBooking = async () => {
    if (!auth.currentUser) {
      toast.error("Please login first.");
      return;
    }

    if (!pickupDate || !returnDate) {
      toast.error(
        "Please select your rental dates."
      );
      return;
    }

    try {
      // =====================================================
      // Check Approved Bookings
      // =====================================================

      const bookingQuery = query(
        collection(db, "bookings"),
        where("carId", "==", car.id),
        where("status", "==", "Approved")
      );

      const snapshot = await getDocs(
        bookingQuery
      );

      let hasConflict = false;

      snapshot.forEach((bookingDoc) => {
        const booking = bookingDoc.data();

        const existingPickup = new Date(
          booking.pickupDate
        );

        const existingReturn = new Date(
          booking.returnDate
        );

        const newPickup = new Date(
          pickupDate
        );

        const newReturn = new Date(
          returnDate
        );

        const overlaps =
          newPickup <= existingReturn &&
          newReturn >= existingPickup;

        if (overlaps) {
          hasConflict = true;
        }
      });

      if (hasConflict) {
        toast.error(
          "This vehicle is already booked for the selected dates."
        );

        return;
      }

      // =====================================================
      // Create Booking
      // =====================================================

      const bookingRef = await addDoc(
        collection(db, "bookings"),
        {
          carId: car.id,

          renterId: auth.currentUser.uid,

          renterEmail:
            auth.currentUser.email,

          renterName:
            auth.currentUser.displayName ||
            "Renter",

          ownerId: car.ownerId,

          ownerEmail: car.ownerEmail,

          pickupDate,
          returnDate,

          rentalDays: totalDays,

          totalPrice: estimatedTotal,

          status: "Pending",

          createdAt: serverTimestamp(),
        }
      );

      // =====================================================
      // Notify Owner
      // =====================================================

      await createNotification({
        userId: car.ownerId,

        type: "bookingRequested",

        title: "New Booking Request",

        subtitle: `${car.brand} ${car.model}`,

        message:
          "A renter has requested to book your vehicle.",

        bookingId: bookingRef.id,

        carId: car.id,
      });

      // =====================================================
      // Success
      // =====================================================

      toast.success(
        "Booking request sent!"
      );
    } catch (error) {
      console.error(
        "Booking Request Error:",
        error
      );

      toast.error(
        "Something went wrong."
      );
    }
  };

  return (
    <>
      <DashboardNavbar />

      <main className="min-h-screen bg-[#fff8ef]">

        {/* =================================================
            Sunset Header Glow
        ================================================= */}

        <div className="relative overflow-hidden">

          <div className="
            absolute
            inset-x-0
            top-0
            h-72
            bg-gradient-to-b
            from-orange-100
            via-pink-50
            to-transparent
            pointer-events-none
          " />

          <div className="
            relative
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            pt-6
            sm:pt-8
            lg:pt-10
            pb-12
          ">

            {/* =================================================
                Back Button
            ================================================= */}

            <button
              onClick={() =>
                navigate("/list-car")
              }
              className="
                inline-flex
                items-center
                gap-2
                text-orange-600
                hover:text-orange-700
                font-semibold
                mb-7
                transition
              "
            >
              <FaArrowLeft />

              Back to Browse Cars
            </button>

            {/* =================================================
                Main Vehicle Area
            ================================================= */}

            <div className="
              grid
              grid-cols-1
              xl:grid-cols-[1.15fr_0.85fr]
              gap-6
              lg:gap-8
              items-start
            ">

              {/* =================================================
                  Gallery
              ================================================= */}

              <div className="
                bg-white
                rounded-[2rem]
                p-3
                sm:p-4
                shadow-xl
                border
                border-orange-100
              ">

                <CarGallery
                  car={car}
                  images={images}
                  currentImage={currentImage}
                  setCurrentImage={
                    setCurrentImage
                  }
                  setShowGallery={
                    setShowGallery
                  }
                />

              </div>

              {/* =================================================
                  Vehicle Summary
              ================================================= */}

              <div className="
                bg-white
                rounded-[2rem]
                shadow-xl
                border
                border-orange-100
                overflow-hidden
              ">

                {/* Sunset Accent */}

                <div className="
                  h-2
                  bg-gradient-to-r
                  from-orange-400
                  via-pink-400
                  to-purple-400
                " />

                <div className="p-6 sm:p-8">

                  {/* Vehicle Type */}

                  <div className="
                    inline-flex
                    items-center
                    gap-2
                    bg-orange-50
                    text-orange-700
                    px-3
                    py-1.5
                    rounded-full
                    text-sm
                    font-semibold
                  ">
                    <FaCarSide />

                    {car.vehicleType ||
                      "Vehicle"}
                  </div>

                  {/* Name */}

                  <h1 className="
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-extrabold
                    text-gray-900
                    mt-4
                    tracking-tight
                  ">
                    {car.brand} {car.model}
                  </h1>

                  {/* Year */}

                  <p className="
                    text-gray-500
                    mt-2
                    font-medium
                  ">
                    {car.vehicleType ||
                      "Vehicle"}{" "}
                    <span className="mx-2">
                      •
                    </span>
                    {car.year || "—"}
                  </p>

                  {/* Location */}

                  <div className="
                    flex
                    items-center
                    gap-2
                    mt-5
                    text-gray-600
                  ">
                    <FaMapMarkerAlt className="text-orange-500" />

                    <span>
                      {car.location ||
                        "Iloilo"}
                    </span>
                  </div>

                  {/* Price */}

                  <div className="
                    mt-7
                    pt-6
                    border-t
                    border-gray-100
                  ">

                    <span className="
                      text-4xl
                      sm:text-5xl
                      font-extrabold
                      text-orange-600
                    ">
                      ₱
                      {Number(
                        car.price || 0
                      ).toLocaleString()}
                    </span>

                    <span className="
                      text-gray-500
                      ml-2
                      font-medium
                    ">
                      / day
                    </span>

                  </div>

                  {/* Vehicle Specs */}

                  <div className="
                    grid
                    grid-cols-2
                    gap-3
                    mt-7
                  ">

                    {/* Transmission */}

                    <div className="
                      rounded-2xl
                      bg-orange-50
                      border
                      border-orange-100
                      p-4
                    ">

                      <FaCog className="
                        text-orange-500
                        mb-2
                      " />

                      <p className="
                        text-xs
                        text-gray-500
                      ">
                        Transmission
                      </p>

                      <p className="
                        font-bold
                        text-gray-900
                        mt-1
                      ">
                        {car.transmission ||
                          "—"}
                      </p>

                    </div>

                    {/* Seats */}

                    <div className="
                      rounded-2xl
                      bg-pink-50
                      border
                      border-pink-100
                      p-4
                    ">

                      <FaUsers className="
                        text-pink-500
                        mb-2
                      " />

                      <p className="
                        text-xs
                        text-gray-500
                      ">
                        Seats
                      </p>

                      <p className="
                        font-bold
                        text-gray-900
                        mt-1
                      ">
                        {car.seats || "—"}
                      </p>

                    </div>

                    {/* Fuel */}

                    <div className="
                      rounded-2xl
                      bg-amber-50
                      border
                      border-amber-100
                      p-4
                    ">

                      <FaGasPump className="
                        text-amber-600
                        mb-2
                      " />

                      <p className="
                        text-xs
                        text-gray-500
                      ">
                        Fuel Type
                      </p>

                      <p className="
                        font-bold
                        text-gray-900
                        mt-1
                      ">
                        {car.fuelType ||
                          "—"}
                      </p>

                    </div>

                    {/* Year */}

                    <div className="
                      rounded-2xl
                      bg-purple-50
                      border
                      border-purple-100
                      p-4
                    ">

                      <FaCalendarAlt className="
                        text-purple-500
                        mb-2
                      " />

                      <p className="
                        text-xs
                        text-gray-500
                      ">
                        Year
                      </p>

                      <p className="
                        font-bold
                        text-gray-900
                        mt-1
                      ">
                        {car.year || "—"}
                      </p>

                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* =================================================
                Lower Content
            ================================================= */}

            <div className="
              grid
              grid-cols-1
              xl:grid-cols-[1fr_0.9fr]
              gap-6
              lg:gap-8
              mt-8
              items-start
            ">

              {/* =================================================
                  Left Column
              ================================================= */}

              <div className="space-y-6">

                {/* Features */}

                <section className="
                  bg-white
                  rounded-[2rem]
                  shadow-lg
                  border
                  border-orange-100
                  p-6
                  sm:p-8
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-6
                  ">

                    <div className="
                      w-11
                      h-11
                      rounded-2xl
                      bg-orange-100
                      text-orange-600
                      flex
                      items-center
                      justify-center
                      text-xl
                    ">
                      ✨
                    </div>

                    <div>
                      <h2 className="
                        text-2xl
                        font-bold
                        text-gray-900
                      ">
                        Features
                      </h2>

                      <p className="
                        text-sm
                        text-gray-500
                      ">
                        Everything included with
                        this vehicle.
                      </p>
                    </div>

                  </div>

                  <CarFeatures />

                </section>

                {/* Description */}

                <section className="
                  bg-white
                  rounded-[2rem]
                  shadow-lg
                  border
                  border-orange-100
                  p-6
                  sm:p-8
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  ">

                    <div className="
                      w-11
                      h-11
                      rounded-2xl
                      bg-pink-100
                      text-pink-600
                      flex
                      items-center
                      justify-center
                    ">
                      📖
                    </div>

                    <h2 className="
                      text-2xl
                      font-bold
                      text-gray-900
                    ">
                      About This Vehicle
                    </h2>

                  </div>

                  <CarDescription
                    description={
                      car.description
                    }
                  />

                </section>

                {/* Host */}

                <section className="
                  bg-white
                  rounded-[2rem]
                  shadow-lg
                  border
                  border-orange-100
                  p-6
                  sm:p-8
                ">

                  <HostCard
                    ownerName={
                      car.ownerName
                    }
                    ownerEmail={
                      car.ownerEmail
                    }
                  />

                </section>

              </div>

              {/* =================================================
                  Right Column - Booking
              ================================================= */}

              <div className="
                xl:sticky
                xl:top-24
              ">

                {isOwner ? (

                  <div className="
                    bg-white
                    rounded-[2rem]
                    shadow-xl
                    border
                    border-orange-100
                    overflow-hidden
                  ">

                    <div className="
                      h-2
                      bg-gradient-to-r
                      from-orange-400
                      via-pink-400
                      to-purple-400
                    " />

                    <div className="
                      p-6
                      sm:p-8
                    ">

                      <div className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                        text-2xl
                        mb-5
                      ">
                        🚗
                      </div>

                      <h2 className="
                        text-2xl
                        font-bold
                        text-gray-900
                      ">
                        Your Vehicle
                      </h2>

                      <p className="
                        text-gray-600
                        mt-3
                        leading-relaxed
                      ">
                        You own this listing.
                      </p>

                      <p className="
                        text-gray-500
                        mt-2
                        leading-relaxed
                      ">
                        You can't rent your own
                        vehicle, but you can manage
                        it from your vehicle dashboard.
                      </p>

                      <button
                        onClick={() =>
                          navigate(
                            `/manage-car/${car.id}`
                          )
                        }
                        className="
                          w-full
                          mt-6
                          bg-orange-500
                          hover:bg-orange-600
                          text-white
                          py-4
                          rounded-2xl
                          font-bold
                          transition
                          shadow-lg
                        "
                      >
                        Manage Vehicle
                      </button>

                    </div>

                  </div>

                ) : (

                  <div className="
                    bg-white
                    rounded-[2rem]
                    shadow-xl
                    border
                    border-orange-100
                    overflow-hidden
                  ">

                    <div className="
                      h-2
                      bg-gradient-to-r
                      from-orange-400
                      via-pink-400
                      to-purple-400
                    " />

                    <div className="
                      p-5
                      sm:p-7
                    ">

                      <div className="
                        flex
                        items-center
                        gap-3
                        mb-5
                      ">

                        <div className="
                          w-11
                          h-11
                          rounded-2xl
                          bg-orange-100
                          text-orange-600
                          flex
                          items-center
                          justify-center
                        ">
                          📅
                        </div>

                        <div>
                          <h2 className="
                            text-2xl
                            font-bold
                            text-gray-900
                          ">
                            Book This Car
                          </h2>

                          <p className="
                            text-sm
                            text-gray-500
                          ">
                            Choose your rental dates.
                          </p>
                        </div>

                      </div>

                      <BookingCard
                        car={car}
                        unavailableDates={
                          unavailableDates
                        }
                        selectedRange={
                          selectedRange
                        }
                        setSelectedRange={
                          setSelectedRange
                        }
                        pickupDate={
                          pickupDate
                        }
                        returnDate={
                          returnDate
                        }
                        setPickupDate={
                          setPickupDate
                        }
                        setReturnDate={
                          setReturnDate
                        }
                        totalDays={
                          totalDays
                        }
                        estimatedTotal={
                          estimatedTotal
                        }
                        requestBooking={
                          requestBooking
                        }
                      />

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>
        </div>

      </main>

      {/* =================================================
          Fullscreen Gallery
      ================================================= */}

      <FullscreenGallery
        showGallery={showGallery}
        setShowGallery={setShowGallery}
        currentImage={currentImage}
        images={images}
        currentIndex={currentIndex}
        previousImage={previousImage}
        nextImage={nextImage}
        car={car}
      />

    </>
  );
}

export default CarDetails;