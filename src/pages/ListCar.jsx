import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
function ListCar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

const location = searchParams.get("location");
const vehicleType = searchParams.get("type");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const snapshot = await getDocs(collection(db, "cars"));

        const carList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCars(carList);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCars();
  }, []);
const filteredCars = cars.filter((car) => {
  const matchesLocation =
    !location ||
    car.location?.toLowerCase() === location.toLowerCase();

  const matchesType =
    !vehicleType ||
    car.vehicleType?.toLowerCase() === vehicleType.toLowerCase();

  const isAvailable =
    car.status !== "unavailable";

  return (
    matchesLocation &&
    matchesType &&
    isAvailable
  );
});
  return (
    
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-10">Browse Cars</h1>

        {filteredCars.length === 0 ? (
          <h2 className="text-gray-500 text-xl">
            No cars available.
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold">
                    {car.brand} {car.model}
                  </h2>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-400">⭐</span>

                    <span className="font-semibold">
                      5.0
                    </span>

                    <span className="text-gray-500">
                      (0 Reviews)
                    </span>
                  </div>
<div className="flex items-center gap-2 mt-3 text-gray-500">
  <span>📍</span>
  <span>{car.location}</span>
</div>
                  <div className="mt-2 space-y-3 text-gray-600">
                    <div>
                      🚘 {car.transmission}
                    </div>

                    <div>
                      👥 {car.seats} Seats
                    </div>

                    <div>
                      ⛽ {car.fuelType}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">
                        ₱{Number(car.price).toLocaleString()}
                      </p>

                      <p className="text-gray-500">
                        per day
                      </p>
                    </div>

                  <button
    onClick={() => navigate(`/car/${car.id}`)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
>
    View Details
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListCar;