export function getBookingCategory(booking) {
  // Deleted vehicles go to archived history
  if (!booking.car) {
    return "Archived";
  }

  // Completed always goes to history
  if (booking.status === "Completed") {
    return "Completed";
  }

  // Cancelled bookings
  if (booking.status === "Cancelled") {
    return "Cancelled";
  }

  // Rejected bookings
  if (booking.status === "Rejected") {
    return "Rejected";
  }

  // Pending bookings
  if (booking.status === "Pending") {
    return "Pending";
  }

  // Approved bookings
  if (booking.status === "Approved") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pickupDate = new Date(
      `${booking.pickupDate}T00:00:00`
    );

    if (today < pickupDate) {
      return "Upcoming";
    }

    return "Active";
  }

  return "Other";
}