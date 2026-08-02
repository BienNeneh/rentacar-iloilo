import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCog,
  FaGasPump,
  FaUsers,
} from "react-icons/fa";

function CarInfo({ car }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">

      <h1 className="text-3xl md:text-5xl font-extrabold">
        {car.brand} {car.model}
      </h1>

      {/* Rating */}

      <div className="flex items-center gap-2 mt-4">

        <FaStar className="text-yellow-400" />

        <span className="font-semibold">
          5.0
        </span>

        <span className="text-gray-500">
          (0 Reviews)
        </span>

      </div>

      {/* Location */}

      <div className="flex items-center gap-2 text-gray-500 mt-2">

        <FaMapMarkerAlt className="text-red-500" />

        <span>{car.location}</span>

      </div>

      {/* Price */}

      <p className="text-4xl font-bold text-blue-600 mt-8">
        ₱{Number(car.price).toLocaleString()}
        <span className="text-2xl text-gray-600">
          /day
        </span>
      </p>

      <hr className="my-8" />

      <div className="space-y-6">

        <div className="flex justify-between">

          <div className="flex items-center gap-2">

            <FaCalendarAlt className="text-blue-500" />

            <span>Year</span>

          </div>

          <strong>{car.year}</strong>

        </div>

        <div className="flex justify-between">

          <div className="flex items-center gap-2">

            <FaCog className="text-blue-500" />

            <span>Transmission</span>

          </div>

          <strong>{car.transmission}</strong>

        </div>

        <div className="flex justify-between">

          <div className="flex items-center gap-2">

            <FaGasPump className="text-blue-500" />

            <span>Fuel Type</span>

          </div>

          <strong>{car.fuelType}</strong>

        </div>

        <div className="flex justify-between">

          <div className="flex items-center gap-2">

            <FaUsers className="text-blue-500" />

            <span>Seats</span>

          </div>

          <strong>{car.seats}</strong>

        </div>

      </div>

    </div>
  );
}

export default CarInfo;