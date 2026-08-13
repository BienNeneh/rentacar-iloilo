function BookingSection({
  title,
  emoji,
  bookings,
  renderBooking,
}) {
  if (bookings.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          {emoji} {title}
        </h2>

        <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
          {bookings.length}
        </span>
      </div>

      <div className="space-y-6">
        {bookings.map(renderBooking)}
      </div>
    </section>
  );
}

export default BookingSection;