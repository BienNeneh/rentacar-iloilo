import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function createNotification({
  userId,
  type,
  title,
  subtitle = "",
  message,
  bookingId = null,
  carId = null,
}) {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      type,
      title,
      subtitle,
      message,
      bookingId,
      carId,
      isRead: false,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Notification Created");

  } catch (error) {
    console.error("Notification Error:", error);
  }
}