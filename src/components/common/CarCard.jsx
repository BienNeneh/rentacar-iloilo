import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCog,
  FaArrowRight,
  FaMapMarkerAlt,
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
  const location = car.location || "Iloilo";
  const price = Number(car.price || 0).toLocaleString();

  return (
    <div
      className="
        group
        flex
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-orange-100
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >

      {/* =========================
          Image
      ========================= */}

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={title}
          className="
            h-60
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Image overlay */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-gradient-to-t
            from-black/50
            via-black/10
            to-transparent
            pointer-events-none
          "
        />

        {/* New Listing Badge */}
        <div className="absolute top-4 left-4">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/70
              bg-white/95
              px-3
              py-1.5
              text-xs
              font-bold
              text-orange-600
              shadow-md
              backdrop-blur
            "
          >
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            New Listing
          </span>

        </div>

        {/* Location */}
        <div
          className="
            absolute
            bottom-4
            left-4
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-white
          "
        >
          <FaMapMarkerAlt className="text-orange-300" />
          <span>{location}</span>
        </div>

      </div>

      {/* =========================
          Content
      ========================= */}

      <div className="flex flex-1 flex-col p-6">

        {/* Vehicle Name */}

        <div>

          <h2
            className="
              line-clamp-2
              text-2xl
              font-extrabold
              tracking-tight
              text-gray-900
            "
          >
            {title}
          </h2>

        </div>

        {/* =========================
            Vehicle Specifications
        ========================= */}

        <div className="mt-5 flex items-center gap-3">

          {/* Transmission */}

          <div
            className="
              flex
              min-w-0
              flex-1
              items-center
              gap-2
              rounded-xl
              bg-orange-50
              px-3
              py-2.5
              text-sm
              font-medium
              text-gray-700
            "
          >

            <FaCog className="shrink-0 text-orange-500" />

            <span className="whitespace-nowrap">
              {transmission}
            </span>

          </div>

          {/* Seats */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-xl
              bg-orange-50
              px-3
              py-2.5
              text-sm
              font-medium
              text-gray-700
            "
          >

            <FaUsers className="shrink-0 text-orange-500" />

            <span className="whitespace-nowrap">
              {seats} Seats
            </span>

          </div>

        </div>

        {/* =========================
            Divider
        ========================= */}

        <div className="mt-6 border-t border-orange-100" />

        {/* =========================
            Price + View Button
        ========================= */}

        <div
          className="
            mt-auto
            flex
            items-end
            justify-between
            gap-4
            pt-6
          "
        >

          {/* Price */}

          <div>

            <p className="text-3xl font-extrabold tracking-tight text-orange-500">
              ₱{price}
            </p>

            <p className="mt-1 text-sm font-medium text-gray-500">
              per day
            </p>

          </div>

          {/* View Button */}

          <Link
            to={`/car/${car.id}`}
            className="
              group/button
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-5
              py-3
              font-bold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-orange-600
              hover:shadow-lg
            "
          >

            <span>View</span>

            <FaArrowRight
              className="
                transition-transform
                duration-200
                group-hover/button:translate-x-1
              "
            />

          </Link>

        </div>

      </div>

    </div>
  );
}

export default CarCard;