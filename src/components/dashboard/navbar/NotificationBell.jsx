import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FaBell } from "react-icons/fa";

import { db } from "../../../firebase/firebase";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell({ user }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  // =========================
  // Fetch Notifications
  // =========================

  async function fetchNotifications() {
    try {
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const notificationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Newest first
      notificationList.sort(
        (a, b) =>
          (b.createdAt?.seconds || 0) -
          (a.createdAt?.seconds || 0)
      );

      setNotifications(notificationList);

      const unread = notificationList.filter(
        (notification) => !notification.isRead
      ).length;

      setUnreadCount(unread);

    } catch (error) {
      console.error(error);
    }
  }

  // =========================
  // Mark Notification as Read
  // =========================

  async function markAsRead(notificationId) {
  try {
    await updateDoc(
      doc(db, "notifications", notificationId),
      {
        isRead: true,
      }
    );

    await fetchNotifications();

    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
}

  // =========================
  // Toggle Notification Panel
  // =========================

  function toggleNotifications() {
    fetchNotifications();
    setShowNotifications((prev) => !prev);
  }

  return (
    <button
      onClick={toggleNotifications}
      className="relative w-11 h-11 rounded-full bg-orange-50 hover:bg-orange-100 transition flex items-center justify-center"
    >
      <FaBell className="text-orange-500 text-lg" />

      {unreadCount > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1
            w-5
            h-5
            rounded-full
            bg-red-500
            text-white
            text-xs
            font-bold
            flex
            items-center
            justify-center
          "
        >
          {unreadCount}
        </span>
      )}

      {showNotifications && (
        <NotificationDropdown
  notifications={notifications}
  markAsRead={markAsRead}
  onClose={() => setShowNotifications(false)}
/>
      )}
    </button>
  );
}

export default NotificationBell;