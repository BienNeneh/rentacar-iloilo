import { FaStar, FaUsers, FaCog } from "react-icons/fa";

function CarCard({ car }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={car.image}
        alt={car.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {car.name}
        </h2>

        <div className="flex items-center gap-2 mt-2 text-yellow-500">

          <FaStar />

          <span className="font-semibold">
            {car.rating}
          </span>

        </div>

        <div className="flex justify-between mt-5 text-gray-600">

          <div className="flex items-center gap-2">

            <FaCog />

            {car.transmission}

          </div>

          <div className="flex items-center gap-2">

            <FaUsers />

            {car.seats} Seats

          </div>

        </div>

        <div className="mt-6 flex justify-between items-center">

          <h3 className="text-3xl font-bold text-blue-600">

            ₱{car.price}

            <span className="text-base text-gray-500">
              /day
            </span>

          </h3>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">

            View Details

          </button>

        </div>

      </div>

    </div>
  );
}

export default CarCard;