import {
  FaSearch,
  FaMapMarkerAlt,
  FaCar,
} from "react-icons/fa";

function SearchBar() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="grid md:grid-cols-5 gap-5">

            {/* Location */}

            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Pickup Location
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <FaMapMarkerAlt className="text-blue-600 mr-3" />

                <input
                  type="text"
                  placeholder="City"
                  className="outline-none w-full"
                />

              </div>

            </div>

            {/* Pickup */}

            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Pickup Date
              </label>

              <input
                type="date"
                className="border rounded-xl w-full px-4 py-3"
              />
            </div>

            {/* Return */}

            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Return Date
              </label>

              <input
                type="date"
                className="border rounded-xl w-full px-4 py-3"
              />
            </div>

            {/* Vehicle */}

            <div>

              <label className="font-semibold text-gray-700 mb-2 block">
                Vehicle Type
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <FaCar className="text-blue-600 mr-3" />

                <select className="outline-none w-full">

                  <option>Any</option>

                  <option>Sedan</option>

                  <option>SUV</option>

                  <option>Pickup</option>

                  <option>Van</option>

                </select>

              </div>

            </div>

            {/* Search */}

            <div className="flex items-end">

              <button className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-4 rounded-xl font-semibold flex justify-center items-center gap-3">

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