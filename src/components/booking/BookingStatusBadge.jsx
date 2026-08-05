function BookingStatusBadge({ status }) {
  if (status === "Pending") {
    return (
      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
        🟡 Pending
      </span>
    );
  }

  if (status === "Approved") {
    return (
      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
        🟢 Approved
      </span>
    );
  }

  if (status === "Rejected") {
    return (
      <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
        🔴 Rejected
      </span>
    );
  }

  return null;
}

export default BookingStatusBadge;