function BookingStatusBadge({ status }) {

  switch (status) {

    case "Pending":
      return (
        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
          🟡 Pending
        </span>
      );

    case "Approved":
      return (
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          🟢 Approved
        </span>
      );

    case "Rejected":
      return (
        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
          🔴 Rejected
        </span>
      );

    case "Cancelled":
      return (
        <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold">
          ⚫ Cancelled
        </span>
      );

    default:
      return null;

  }

}

export default BookingStatusBadge;