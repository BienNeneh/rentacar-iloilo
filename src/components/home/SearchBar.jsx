import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iloiloLocations from "../../data/iloiloLocations";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCar,
  FaCalendarAlt,
} from "react-icons/fa";

function SearchBar() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [vehicleType, setVehicleType] = useState("Any");

  function handleSearch() {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.append("location", location);
    }

    if (pickupDate) {
      params.append("pickup", pickupDate);
    }

    if (returnDate) {
      params.append("return", returnDate);
    }

    if (vehicleType !== "Any") {
      params.append("type", vehicleType);
    }

    navigate(`/list-car?${params.toString()}`);
  }

  return (
    <section className="relative -mt-14 md:-mt-24 z-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-orange-100 p-6 lg:p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
{/* Pickup Location */}
<div>
  <label className="block text-sm font-semibold text-gray-600 mb-2">
    Pickup Location
  </label>

  <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-orange-400 transition">

    <FaMapMarkerAlt className="text-orange-500" />

    <select
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full bg-transparent outline-none cursor-pointer"
    >
      <option value="">All Locations</option>

      {iloiloLocations.map((place) => (
        <option key={place} value={place}>
          {place}
        </option>
      ))}
    </select>

  </div>
</div>

            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Pickup Date
              </label>

              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-orange-400 transition">

                <FaCalendarAlt className="text-orange-500" />

                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />

              </div>
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Return Date
              </label>

              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-orange-400 transition">

                <FaCalendarAlt className="text-orange-500" />

                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />

              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Vehicle Type
              </label>

              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-4 focus-within:border-orange-400 transition">

                <FaCar className="text-orange-500" />

                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  <option>Any</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Pickup</option>
                  <option>Van</option>
                </select>

              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">

              <button
                onClick={handleSearch}
                className="w-full h-[60px] rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >

                <FaSearch />

                Search Cars

              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;