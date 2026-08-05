function BookingStats({
  pending,
  approved,
  rejected,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">

      <div className="bg-yellow-50 rounded-2xl p-6 shadow">

        <h2 className="text-gray-500">
          Pending
        </h2>

        <h1 className="text-4xl font-bold text-yellow-600 mt-2">
          {pending}
        </h1>

      </div>

      <div className="bg-green-50 rounded-2xl p-6 shadow">

        <h2 className="text-gray-500">
          Approved
        </h2>

        <h1 className="text-4xl font-bold text-green-600 mt-2">
          {approved}
        </h1>

      </div>

      <div className="bg-red-50 rounded-2xl p-6 shadow">

        <h2 className="text-gray-500">
          Rejected
        </h2>

        <h1 className="text-4xl font-bold text-red-600 mt-2">
          {rejected}
        </h1>

      </div>

    </div>
  );
}

export default BookingStats;