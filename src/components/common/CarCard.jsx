import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCog,
  FaArrowRight,
} from "react-icons/fa";

function CarCard({ car }) {
  const image =
    car.image ||
    "https://placehold.co/600x400/F7F3EC/999999?text=No+Image";

  const title =
    `${car.brand || ""} ${car.model || ""}`.trim() ||
    "Unnamed Vehicle";

  const transmission = car.transmission || "Automatic";
  const seats = car.seats || "-";
  const price = Number(car.price || 0).toLocaleString();

  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={title}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4">

          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-orange-600 shadow">
            New Listing
          </span>

        </div>

      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
            {title}
          </h2>

          <div className="flex justify-between mt-6 text-gray-600">

            <div className="flex items-center gap-2">

              <FaCog className="text-orange-500" />

              <span>{transmission}</span>

            </div>

            <div className="flex items-center gap-2">

              <FaUsers className="text-orange-500" />

              <span>{seats} Seats</span>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-auto pt-8 flex justify-between items-end">

          <div>

            <p className="text-3xl font-bold text-orange-500">
              ₱{price}
            </p>

            <p className="text-sm text-gray-500">
              per day
            </p>

          </div>

          <Link
            to={`/car/${car.id}`}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            View

            <FaArrowRight />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default CarCard;