import {
  FaSearch,
  FaMapMarkerAlt,
  FaCar,
} from "react-icons/fa";

function SearchBar() {
  return (
    <section className="relative -mt-12 md:-mt-20 z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

            {/* Pickup Location */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Pickup Location
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 hover:border-blue-500 focus-within:border-blue-600 transition">

                <FaMapMarkerAlt className="text-blue-600 mr-3" />

                <input
                  type="text"
                  placeholder="City"
                  className="outline-none w-full"
                />

              </div>
            </div>

            {/* Pickup Date */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Pickup Date
              </label>

              <input
                type="date"
                className="border rounded-xl w-full px-4 py-3 hover:border-blue-500 focus:border-blue-600 transition"
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Return Date
              </label>

              <input
                type="date"
                className="border rounded-xl w-full px-4 py-3 hover:border-blue-500 focus:border-blue-600 transition"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Vehicle Type
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 hover:border-blue-500 focus-within:border-blue-600 transition">

                <FaCar className="text-blue-600 mr-3" />

                <select className="outline-none w-full bg-transparent">
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

              <button className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white w-full py-4 rounded-xl font-semibold flex justify-center items-center gap-3 shadow-lg hover:shadow-xl">

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