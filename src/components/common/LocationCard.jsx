import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCarSide,
  FaMapMarkerAlt,
} from "react-icons/fa";

function LocationCard({ location, carCount }) {
  const hasCars = carCount > 0;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-orange-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >

      {/* =========================
          Image
      ========================= */}

      <div className="relative h-56 overflow-hidden">

        <img
          src={location.image}
          alt={location.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Image overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-black/5
            to-transparent
          "
        />

        {/* Location badge */}
        <div
          className="
            absolute
            left-4
            top-4
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white/95
            px-3
            py-1.5
            text-xs
            font-bold
            text-gray-800
            shadow-lg
            backdrop-blur
          "
        >
          <FaMapMarkerAlt className="text-orange-500" />
          Iloilo
        </div>

        {/* Availability badge */}
        <div
          className={`
            absolute
            bottom-4
            left-4
            inline-flex
            items-center
            gap-2
            rounded-full
            px-3
            py-1.5
            text-xs
            font-bold
            shadow-lg
            backdrop-blur
            ${
              hasCars
                ? "bg-white/95 text-green-700"
                : "bg-white/90 text-gray-500"
            }
          `}
        >
          <span
            className={`
              h-2
              w-2
              rounded-full
              ${
                hasCars
                  ? "bg-green-500"
                  : "bg-gray-400"
              }
            `}
          />

          {hasCars
            ? `${carCount} ${
                carCount === 1 ? "Car" : "Cars"
              } Available`
            : "No Cars Yet"}
        </div>

      </div>

      {/* =========================
          Content
      ========================= */}

      <div className="p-5 sm:p-6">

        <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {location.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Find vehicles available for rent from local
          owners in {location.name}.
        </p>

        {/* Availability information */}

        <div className="mt-5 flex items-center gap-2 text-sm font-medium">

          <FaCarSide
            className={
              hasCars
                ? "text-orange-500"
                : "text-gray-400"
            }
          />

          <span
            className={
              hasCars
                ? "text-gray-700"
                : "text-gray-400"
            }
          >
            {hasCars
              ? `${carCount} ${
                  carCount === 1
                    ? "vehicle"
                    : "vehicles"
                } ready to explore`
              : "Waiting for the first listing"}
          </span>

        </div>

        {/* Explore */}

        <Link
          to={`/list-car?location=${encodeURIComponent(
            location.name
          )}`}
          className="
            mt-6
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            bg-orange-50
            px-4
            py-3.5
            font-bold
            text-orange-600
            transition-all
            duration-300
            group-hover:bg-orange-500
            group-hover:text-white
          "
        >
          <span>Explore {location.name}</span>

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white
              text-orange-500
              shadow-sm
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            <FaArrowRight className="text-sm" />
          </span>

        </Link>

      </div>

    </div>
  );
}

export default LocationCard;