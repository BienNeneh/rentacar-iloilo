import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import CarGallery from "../components/car/CarGallery";
import CarFeatures from "../components/car/CarFeatures";
import BookingCard from "../components/car/BookingCard";
import HostCard from "../components/car/HostCard";
import CarDescription from "../components/car/CarDescription";
import CarInfo from "../components/car/CarInfo";
import FullscreenGallery from "../components/car/FullscreenGallery";
import toast from "react-hot-toast";
import { createNotification } from "../services/notificationService";
import { FaArrowLeft } from "react-icons/fa";
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
 const requestBooking = async () => {
  if (!auth.currentUser) {
    toast.error("Please login first.");
    return;
  }

  if (!pickupDate || !returnDate) {
    toast.error("Please select your rental dates.");
    return;
  }

  try {
    // =========================
    // Check for Approved Bookings
    // =========================

    const bookingQuery = query(
      collection(db, "bookings"),
      where("carId", "==", car.id),
      where("status", "==", "Approved")
    );

    const snapshot = await getDocs(bookingQuery);

    let hasConflict = false;

    snapshot.forEach((bookingDoc) => {
      const booking = bookingDoc.data();

      const existingPickup = new Date(
        booking.pickupDate
      );

      const existingReturn = new Date(
        booking.returnDate
      );

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
      toast.error(
        "This vehicle is already booked for the selected dates."
      );

      return;
    }

    // =========================
    // Create Booking
    // =========================

    const bookingRef = await addDoc(
      collection(db, "bookings"),
      {
        carId: car.id,

        renterId: auth.currentUser.uid,
        renterEmail: auth.currentUser.email,
        renterName:
          auth.currentUser.displayName || "Renter",

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

    // =========================
    // Notify Vehicle Owner
    // =========================

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

    // =========================
    // Success
    // =========================

    toast.success("Booking request sent!");

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
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <button
    onClick={() => navigate("/list-car")}
    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-8 transition"
>
  <FaArrowLeft />
  Back to Browse Cars
</button>

        <div className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
xl:gap-10
">

            {/* LEFT */}
         


<CarGallery
  car={car}
  images={images}
  currentImage={currentImage}
  setCurrentImage={setCurrentImage}
  setShowGallery={setShowGallery}
/>

          

            {/* RIGHT */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">

               <CarInfo car={car} />

{/* FEATURES */}

<CarFeatures />

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

  <BookingCard
    car={car}
    unavailableDates={unavailableDates}
    selectedRange={selectedRange}
    setSelectedRange={setSelectedRange}
    pickupDate={pickupDate}
    returnDate={returnDate}
    setPickupDate={setPickupDate}
    setReturnDate={setReturnDate}
    totalDays={totalDays}
    estimatedTotal={estimatedTotal}
    requestBooking={requestBooking}
  />

)}

{/* DESCRIPTION */}

<CarDescription
  description={car.description}
/>

{/* OWNER */}

<HostCard
    ownerName={car.ownerName}
    ownerEmail={car.ownerEmail}
/>

</div> {/* RIGHT */}

</div> {/* GRID */}

</div> {/* max-w-7xl */}

</div> {/* min-h-screen */}

      {/* FULLSCREEN GALLERY */}
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