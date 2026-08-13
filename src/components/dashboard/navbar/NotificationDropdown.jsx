import { useNavigate } from "react-router-dom";
import { getNotificationIcon } from "../../../utils/notificationIcon";
import { formatTimeAgo } from "../../../utils/formatTimeAgo";

function NotificationDropdown({
  notifications,
  markAsRead,
  onClose,
}) {
  const navigate = useNavigate();

  // =========================
  // Notification Date Group
  // =========================

  function getNotificationGroup(createdAt) {
    if (!createdAt) {
      return "OLDER";
    }

    const notificationDate = createdAt.toDate
      ? createdAt.toDate()
      : new Date(createdAt);

    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const date = new Date(
      notificationDate.getFullYear(),
      notificationDate.getMonth(),
      notificationDate.getDate()
    );

    if (date.getTime() === today.getTime()) {
      return "TODAY";
    }

    if (date.getTime() === yesterday.getTime()) {
      return "YESTERDAY";
    }

    return "OLDER";
  }

  // =========================
  // Handle Notification Click
  // =========================

  async function handleNotificationClick(notification) {
    try {
      // Mark notification as read first
      await markAsRead(notification.id);

      // Close notification dropdown
      if (onClose) {
        onClose();
      }

      // =========================
      // Navigate Based on Type
      // =========================

      switch (notification.type) {

        // =========================
        // Renter Notifications
        // =========================

        case "bookingApproved":
        case "bookingRejected":
        case "bookingCancelled":
        case "rentalCompleted":
          navigate("/my-bookings", {
            state: {
              bookingId: notification.bookingId,
            },
          });
          break;

        case "bookingCancelledByRenter":
          navigate("/booking-requests", {
            state: {
              bookingId: notification.bookingId,
            },
          });
          break;

        // =========================
        // Owner Notifications
        // =========================

        case "bookingRequested":
          navigate("/booking-requests", {
            state: {
              bookingId: notification.bookingId,
            },
          });
          break;

        // =========================
        // Unknown Notification
        // =========================

        default:
          console.log(
            "No navigation destination for notification type:",
            notification.type
          );
      }

    } catch (error) {
      console.error(
        "Notification click error:",
        error
      );
    }
  }

  // =========================
  // Group Notifications
  // =========================

  const groupedNotifications = {
    TODAY: [],
    YESTERDAY: [],
    OLDER: [],
  };

  notifications.forEach((notification) => {
    const group = getNotificationGroup(
      notification.createdAt
    );

    groupedNotifications[group].push(notification);
  });

  return (
    <div
      className="
        fixed
        top-[70px]
        left-2
        right-2
        w-auto
        max-w-none
        max-h-[70vh]
        overflow-y-auto
        bg-white
        rounded-2xl
        shadow-2xl
        border
        border-gray-200
        z-[100]

        lg:absolute
        lg:top-12
        lg:right-0
        lg:left-auto
        lg:w-96
        lg:max-w-96
        lg:max-h-[75vh]
      "
    >

      {/* =========================
          Header
      ========================= */}

      <div className="sticky top-0 z-10 px-5 py-4 border-b bg-white">
        <h2 className="text-lg font-bold text-gray-900">
          Notifications
        </h2>
      </div>

      {/* =========================
          Empty State
      ========================= */}

      {notifications.length === 0 ? (

        <div className="p-8 text-center text-gray-500">
          No notifications yet.
        </div>

      ) : (

        ["TODAY", "YESTERDAY", "OLDER"].map(
          (group) => {

            if (
              groupedNotifications[group].length === 0
            ) {
              return null;
            }

            return (
              <div key={group}>

                {/* =========================
                    Group Header
                ========================= */}

                <div className="px-5 py-3 bg-gray-50 border-b">
                  <p className="text-xs font-bold text-gray-500 tracking-wider">
                    {group}
                  </p>
                </div>

                {/* =========================
                    Notifications
                ========================= */}

                {groupedNotifications[group].map(
                  (notification) => (

                    <div
                      key={notification.id}
                      onClick={() =>
                        handleNotificationClick(
                          notification
                        )
                      }
                      className={`flex items-start gap-4 px-5 py-4 border-b cursor-pointer transition ${
                        notification.isRead
                          ? "bg-white hover:bg-gray-50"
                          : "bg-orange-50 hover:bg-orange-100"
                      }`}
                    >

                      {/* =========================
                          Notification Icon
                      ========================= */}

                      <div className="text-xl flex-shrink-0 mt-1">
                        {getNotificationIcon(
                          notification.type,
                          notification.isRead
                        )}
                      </div>

                      {/* =========================
                          Notification Content
                      ========================= */}

                      <div className="flex-1 text-left min-w-0">

                        {/* Title */}

                        <h3
                          className={`${
                            notification.isRead
                              ? "font-medium text-gray-500"
                              : "font-bold text-gray-900"
                          }`}
                        >
                          {notification.title}
                        </h3>

                        {/* Subtitle */}

                        {notification.subtitle && (
                          <p className="text-sm font-semibold text-orange-500 mt-1">
                            {notification.subtitle}
                          </p>
                        )}

                        {/* Message */}

                        {notification.message && (
                          <p
                            className={`text-sm mt-1 ${
                              notification.isRead
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.message}
                          </p>
                        )}

                        {/* Time */}

                        <p className="text-xs text-gray-400 mt-2">
                          {formatTimeAgo(
                            notification.createdAt
                          )}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>
            );
          }
        )

      )}

    </div>
  );
}

export default NotificationDropdown;