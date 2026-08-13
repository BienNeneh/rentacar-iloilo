import {
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaCommentDots,
  FaMoneyBillWave,
  FaStar,
  FaBell,
} from "react-icons/fa";

export function getNotificationIcon(type, isRead) {
  const color = isRead ? "text-gray-400" : "";

  switch (type) {
    case "bookingApproved":
      return (
        <FaCheckCircle
          className={isRead ? color : "text-green-500"}
        />
      );

    case "bookingRejected":
      return (
        <FaTimesCircle
          className={isRead ? color : "text-red-500"}
        />
      );

   case "bookingCancelled":
case "bookingCancelledByRenter":
  return (
    <FaBan
      className={isRead ? color : "text-orange-500"}
    />
  );
case "rentalCompleted":
  return (
    <FaCheckCircle
      className={isRead ? color : "text-green-500"}
    />
  );
    case "newMessage":
      return (
        <FaCommentDots
          className={isRead ? color : "text-blue-500"}
        />
      );

    case "paymentReceived":
      return (
        <FaMoneyBillWave
          className={isRead ? color : "text-emerald-500"}
        />
      );

    case "reviewReceived":
      return (
        <FaStar
          className={isRead ? color : "text-yellow-500"}
        />
      );

    default:
      return (
        <FaBell
          className={isRead ? color : "text-gray-500"}
        />
      );
  }
}