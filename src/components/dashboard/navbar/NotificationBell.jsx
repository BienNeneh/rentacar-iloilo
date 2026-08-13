import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
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

  // =========================
  // Real-Time Notification Listener
  // =========================

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationList = snapshot.docs.map(
          (notificationDoc) => ({
            id: notificationDoc.id,
            ...notificationDoc.data(),
          })
        );

        // Newest first
        notificationList.sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
        );

        setNotifications(notificationList);

        // Calculate unread notifications
        const unread = notificationList.filter(
          (notification) => !notification.isRead
        ).length;

        setUnreadCount(unread);
      },
      (error) => {
        console.error(
          "Notification listener error:",
          error
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

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

      return true;
    } catch (error) {
      console.error(
        "Mark notification as read error:",
        error
      );

      return false;
    }
  }

  // =========================
  // Toggle Notification Panel
  // =========================

  function toggleNotifications() {
    setShowNotifications((prev) => !prev);
  }

  return (
    <div className="relative">

      {/* Notification Button */}

      <button
        type="button"
        onClick={toggleNotifications}
        className="
          relative
          w-11
          h-11
          rounded-full
          bg-orange-50
          hover:bg-orange-100
          transition
          flex
          items-center
          justify-center
        "
      >
        <FaBell className="text-orange-500 text-lg" />

        {/* Unread Badge */}

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
      </button>

      {/* Notification Dropdown */}

      {showNotifications && (
        <NotificationDropdown
          notifications={notifications}
          markAsRead={markAsRead}
          onClose={() => setShowNotifications(false)}
        />
      )}

    </div>
  );
}

export default NotificationBell;