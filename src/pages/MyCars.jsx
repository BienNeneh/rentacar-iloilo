import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import {
  FaMapMarkerAlt,
  FaCarSide,
  FaCog,
  FaUsers,
} from "react-icons/fa";

function MyCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCars() {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "cars"),
        where("ownerId", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);

      const carList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCars(carList);
    }

    fetchCars();
  }, []);

  async function deleteCar(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "cars", id));

      setCars((prevCars) =>
        prevCars.filter((car) => car.id !== id)
      );

      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-gray-100 py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* =========================
              Page Header
          ========================= */}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10">

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                My Cars
              </h1>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Manage all your listed vehicles.
              </p>
            </div>

            <button
              onClick={() => navigate("/add-car")}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
            >
              + Add New Car
            </button>

          </div>

          {/* =========================
              No Cars
          ========================= */}

          {cars.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-lg px-6 py-10 sm:px-10 sm:py-14 lg:p-16 text-center">

              <div className="text-6xl sm:text-7xl mb-5 sm:mb-6">
                🚗
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                No Cars Listed Yet
              </h2>

              <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                Start earning by listing your first vehicle.
                It only takes a minute to get started.
              </p>

              <button
                onClick={() => navigate("/add-car")}
                className="w-full sm:w-auto mt-7 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition shadow-lg"
              >
                + Add Your First Car
              </button>

            </div>

          ) : (

            /* =========================
                Car Grid
            ========================= */

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

              {cars.map((car) => (

                <div
                  key={car.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >

                  {/* Car Image */}

                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-52 sm:h-48 lg:h-52 object-cover"
                  />

                  <div className="p-5 sm:p-6">

                    {/* Status */}

                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                        (car.status || "available") === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          (car.status || "available") === "available"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />

                      {(car.status || "available") === "available"
                        ? "Available"
                        : "Unavailable"}

                    </div>

                    {/* Car Name */}

                    <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-gray-900 break-words">
                      {car.brand} {car.model}
                    </h2>

                    {/* Car Information */}

                    <div className="mt-4 space-y-3">

                      <div className="flex items-start gap-2 text-gray-500">
                        <FaCarSide className="text-blue-500 mt-1 shrink-0" />

                        <span className="break-words">
                          {car.vehicleType} • {car.year}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-gray-600">
                        <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" />

                        <span className="break-words">
                          {car.location}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 text-gray-600">

                        <div className="flex items-center gap-2 min-w-0">
                          <FaCog className="text-gray-500 shrink-0" />

                          <span className="truncate">
                            {car.transmission}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <FaUsers className="text-gray-500" />

                          <span>
                            {car.seats} Seats
                          </span>
                        </div>

                      </div>

                    </div>

                    {/* Price */}

                    <p className="mt-6">

                      <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                        ₱{Number(car.price).toLocaleString()}
                      </span>

                      <span className="text-gray-500 font-medium">
                        /day
                      </span>

                    </p>

                    {/* Actions */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-6">

                      <button
                        onClick={() =>
                          navigate(`/manage-car/${car.id}`)
                        }
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition"
                      >
                        ⚙ Manage
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/edit-car/${car.id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        ✏ Edit
                      </button>

                      <button
                        onClick={() => deleteCar(car.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>
    </>
  );
}

export default MyCars;