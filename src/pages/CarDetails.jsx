import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import {
    FaCalendarAlt,
    FaGasPump,
    FaUsers,
    FaCog,
    FaCheckCircle,
    FaMapMarkerAlt,
    FaUserCircle,
    FaStar,
    FaArrowLeft,
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
  // Fetch car from Firestore
  const isOwner =
  auth.currentUser &&
  car &&
  auth.currentUser.uid === car.ownerId;
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

        const bookingSnapshot = await getDocs(bookingQuery);

        const bookedDates = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUnavailableDates(bookedDates);
      }

    } catch (error) {
      console.error(error);
    }
  }

  fetchCar();
}, [id]);
useEffect(() => {

  if (!car) return;

  if (!pickupDate || !returnDate) {
    setTotalDays(0);
    setEstimatedTotal(0);
    return;
  }

  const pickup = new Date(pickupDate);
  const dropoff = new Date(returnDate);

  const diff =
    Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    setTotalDays(diff);
    setEstimatedTotal(diff * Number(car.price));
  } else {
    setTotalDays(0);
    setEstimatedTotal(0);
  }
}, [pickupDate, returnDate, car]);
  // Set first image
  useEffect(() => {
    if (!car) return;

    if (car.images?.length > 0) {
      setCurrentImage(car.images[0]);
    } else if (car.image) {
      setCurrentImage(car.image);
    }
  }, [car]);

  // Loading screen
  if (!car) {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-4xl font-bold">
                Loading...
            </h1>
        </div>
    );
}

  // Supports old "image" field and future "images" array
  const images =
    car.images?.length > 0
      ? car.images
      : car.image
      ? [car.image]
      : [];

  const currentIndex = images.indexOf(currentImage);

  const nextImage = () => {
    if (images.length <= 1) return;

    const next = (currentIndex + 1) % images.length;
    setCurrentImage(images[next]);
  };

  const previousImage = () => {
    if (images.length <= 1) return;

    const prev = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[prev]);
  };
  async function requestBooking() {
    console.log("Current User:", auth.currentUser);

    if (!auth.currentUser) {

        alert("Please login first.");

        return;

    }

    if (!pickupDate || !returnDate) {

        alert("Please select your rental dates.");

        return;

    }

    try {
// Check for approved bookings of this car
const bookingQuery = query(
  collection(db, "bookings"),
  where("carId", "==", car.id),
  where("status", "==", "Approved")
);

const snapshot = await getDocs(bookingQuery);

let hasConflict = false;

snapshot.forEach((doc) => {
  const booking = doc.data();

  const existingPickup = new Date(booking.pickupDate);
  const existingReturn = new Date(booking.returnDate);

  const newPickup = new Date(pickupDate);
  const newReturn = new Date(returnDate);

  const overlaps =
    newPickup <= existingReturn &&
    newReturn >= existingPickup;

  if (overlaps) {
    hasConflict = true;
  }
});

if (hasConflict) {
  alert("This vehicle is already booked for the selected dates.");
  return;
}
        await addDoc(
            collection(db, "bookings"),
            {
                carId: car.id,

                renterId: auth.currentUser.uid,
                renterEmail: auth.currentUser.email,

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

        alert("Booking request sent!");

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

}
  return (
    <>
    <DashboardNavbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <button
    onClick={() => navigate("/list-car")}
    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-8 transition"
>
  <FaArrowLeft />
  Back to Browse Cars
</button>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* LEFT */}
            <div>

              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold">
                  Photos
                </h2>

                <span className="bg-white px-4 py-2 rounded-full shadow text-gray-600">
                  📷 {currentIndex + 1} / {images.length}
                </span>
              </div>

            {currentImage && (
  <img
    src={currentImage}
    alt={`${car.brand} ${car.model}`}
    onClick={() => setShowGallery(true)}
    className="w-full h-[560px] object-cover rounded-3xl shadow-2xl cursor-pointer hover:scale-[1.02] duration-300"
  />
)}

              <div className="flex gap-4 mt-5 overflow-x-auto pb-2">

                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setCurrentImage(img)}
                    className={`w-28 h-20 rounded-2xl object-cover cursor-pointer transition-all duration-300

                    ${
                      currentImage === img
                        ? "ring-4 ring-blue-500 scale-105"
                        : "hover:scale-105 hover:shadow-xl"
                    }`}
                  />
                ))}

              </div>

            </div>

            {/* RIGHT */}
            <div className="bg-white rounded-3xl shadow-xl p-10">

            <h1 className="text-5xl font-extrabold">
    {car.brand} {car.model}
</h1>

<div className="flex items-center gap-2 mt-4">

    <FaStar className="text-yellow-400"/>

    <span className="font-semibold">
        5.0
    </span>

    <span className="text-gray-500">
        (0 Reviews)
    </span>

</div>

<div className="flex items-center gap-2 text-gray-500 mt-2">

    <FaMapMarkerAlt className="text-red-500"/>

    Iloilo City

</div>

<p className="text-5xl font-bold text-blue-600 mt-8">
    ₱{Number(car.price).toLocaleString()}
    <span className="text-2xl text-gray-500">
        /day
    </span>
</p>

<hr className="my-8"/>

<div className="space-y-6">

    <div className="flex justify-between">

        <div className="flex items-center gap-3">

            <FaCalendarAlt className="text-blue-500"/>

            Year

        </div>

        <strong>{car.year}</strong>

    </div>

    <div className="flex justify-between">

        <div className="flex items-center gap-3">

            <FaCog className="text-blue-500"/>

            Transmission

        </div>

        <strong>{car.transmission}</strong>

    </div>

    <div className="flex justify-between">

        <div className="flex items-center gap-3">

            <FaGasPump className="text-blue-500"/>

            Fuel Type

        </div>

        <strong>{car.fuelType}</strong>

    </div>

    <div className="flex justify-between">

        <div className="flex items-center gap-3">

            <FaUsers className="text-blue-500"/>

            Seats

        </div>

        <strong>{car.seats}</strong>

    </div>

              </div>


{/* FEATURES */}
<h2 className="text-2xl font-bold mt-10 mb-5">
    Features
</h2>

<div className="grid grid-cols-2 gap-4">

    <div className="flex items-center gap-3">
        <FaCheckCircle className="text-green-500" />
        Air Conditioning
    </div>

    <div className="flex items-center gap-3">
        <FaCheckCircle className="text-green-500" />
        Bluetooth
    </div>

    <div className="flex items-center gap-3">
        <FaCheckCircle className="text-green-500" />
        USB Charging
    </div>

    <div className="flex items-center gap-3">
        <FaCheckCircle className="text-green-500" />
        Reverse Camera
    </div>

</div>

{isOwner ? (

    <div className="mt-10 border border-blue-200 rounded-2xl p-6 bg-blue-50">

        <h2 className="text-2xl font-bold text-blue-700">
            🚗 Your Vehicle
        </h2>

        <p className="mt-4 text-gray-700">
            You own this listing.
        </p>

        <p className="text-gray-500 mt-2">
            You can't rent your own vehicle, but you can manage it below.
        </p>

    </div>

) : (

<div className="mt-10 border rounded-2xl p-6 bg-gray-50">

    <h2 className="text-2xl font-bold mb-6">
        📅 Book This Car
    </h2>
{unavailableDates.length > 0 && (
  <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">

    <h3 className="font-bold text-red-600 mb-3">
      🚫 Unavailable Dates
    </h3>

    <div className="space-y-2">

      {unavailableDates.map((booking) => (
        <div
          key={booking.id}
          className="flex justify-between bg-white rounded-lg p-3"
        >
          <span>
            {booking.pickupDate}
          </span>

          <span>
            →
          </span>

          <span>
            {booking.returnDate}
          </span>
        </div>
      ))}

    </div>

  </div>
)}
    <div className="space-y-5">

        <div>
            <label className="font-semibold block mb-2">
                Pickup Date
            </label>

           <input
    type="date"
    value={pickupDate}
    onChange={(e) => setPickupDate(e.target.value)}
    min={new Date().toISOString().split("T")[0]}
    className="w-full border rounded-xl p-3"
/>
        </div>

        <div>
            <label className="font-semibold block mb-2">
                Return Date
            </label>

          <input
    type="date"
    value={returnDate}
    onChange={(e) => setReturnDate(e.target.value)}
    min={pickupDate || new Date().toISOString().split("T")[0]}
    className="w-full border rounded-xl p-3"
/>
        </div>

        <div className="flex justify-between text-lg">
            <span>Rental Duration</span>
            <strong>{totalDays} Days</strong>
        </div>

        <div className="flex justify-between text-xl font-bold">
            <span>Estimated Total</span>
            <span className="text-blue-600">
                ₱{estimatedTotal.toLocaleString()}
            </span>
        </div>

        <button
            onClick={requestBooking}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
        >
            Request Booking
        </button>

    </div>

</div>

)}
             

            </div>

          </div>

    {/* DESCRIPTION */}
<div className="bg-white rounded-3xl shadow-xl mt-10 p-8">

    <h2 className="text-3xl font-bold mb-6">
        Description
    </h2>

    <p className="text-gray-600 leading-8 text-lg">
        {car.description || "No description available."}
    </p>

</div>

{/* OWNER */}
<div className="bg-white rounded-3xl shadow-xl mt-10 p-8">

    <h2 className="text-3xl font-bold mb-8">
        Host
    </h2>

    <div className="flex items-center gap-6">

        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <FaUserCircle className="text-6xl text-blue-500" />
        </div>

        <div>
            <h3 className="text-2xl font-bold">
                {car.ownerName || "Car Owner"}
            </h3>

            <p className="text-gray-500 mt-1">
                ✔ Verified Host
            </p>

            <p className="text-gray-500">
                💬 Usually responds within 30 minutes
            </p>

            <p className="text-gray-500">
                📧 {car.ownerEmail || "Email unavailable"}
            </p>
        </div>

    </div>

</div>

</div> {/* max-w-7xl */}

</div> {/* min-h-screen */}

      {/* FULLSCREEN GALLERY */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

          <button
            onClick={previousImage}
            className="absolute left-8 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-blue-400 transition"
          >
            ❮
          </button>

          <button
            onClick={nextImage}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-blue-400 transition"
          >
            ❯
          </button>

          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-8 right-8 text-white text-5xl hover:text-gray-300"
          >
            ✕
          </button>

          {currentImage && (
  <img
    src={currentImage}
    alt={`${car.brand} ${car.model}`}
    onClick={(e) => e.stopPropagation()}
    className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
  />
)}

        </div>
      )}
    </>
  );

}
export default CarDetails;