import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function LocationCard({ location, carCount }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">

      <div className="overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {location.name}
        </h2>

       <p className="text-gray-500 mt-2">
  🚗 {carCount === 0
    ? "No cars yet"
    : `${carCount} ${carCount === 1 ? "Car" : "Cars"} Available`}
</p>

        <p className="text-sm text-gray-400 mt-2">
          Serving renters across {location.name}
        </p>

        <Link
  to={`/list-car?location=${encodeURIComponent(location.name)}`}
  className="
    mt-6
    text-blue-600
    font-semibold
    flex
    items-center
    gap-2
    hover:gap-4
    transition-all
  "
>
  Explore
  <FaArrowRight />
</Link>

      </div>

    </div>
  );
}

export default LocationCard;