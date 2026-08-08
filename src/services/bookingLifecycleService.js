import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

// =========================
// Get Approved Bookings
// =========================

async function getApprovedBookings() {
  const bookingsRef = collection(db, "bookings");

  const q = query(
    bookingsRef,
    where("status", "==", "Approved")
  );

  return await getDocs(q);
}

// =========================
// Analyze Booking Status
// =========================

function analyzeBookings(snapshot) {
  const today = new Date().toISOString().split("T")[0];

  console.log(`Found ${snapshot.size} approved booking(s).`);
  console.log(`Today's Date: ${today}`);

  snapshot.forEach((doc) => {
    const booking = doc.data();

    console.log("----------------------------");
    console.log("Booking ID:", doc.id);
    console.log("Car ID:", booking.carId);
    console.log("Pickup Date:", booking.pickupDate);
    console.log("Return Date:", booking.returnDate);
    console.log("Current Status:", booking.status);

    if (today < booking.pickupDate) {
      console.log("📅 Rental has not started yet.");
    } else if (today >= booking.pickupDate && today <= booking.returnDate) {
      console.log("🚗 Rental is currently ongoing.");
    } else {
      console.log("⏰ Return date has passed. Waiting for owner confirmation.");
    }
  });
}

// =========================
// Booking Lifecycle
// =========================

export async function runBookingLifecycle() {
  console.log("Running Booking Lifecycle Service...");

  try {
    const snapshot = await getApprovedBookings();

    analyzeBookings(snapshot);

  } catch (error) {
    console.error("Booking Lifecycle Error:", error);
  }
}