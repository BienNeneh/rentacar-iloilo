import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

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

      setCars((prevCars) => prevCars.filter((car) => car.id !== id));

      alert("Car deleted!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-gray-100 p-10">
        <div className="flex justify-between items-center mb-10">

  <div>

    <h1 className="text-4xl font-bold">
      My Cars
    </h1>

    <p className="text-gray-500 mt-2">
      Manage all your listed vehicles.
    </p>

  </div>

  <button
    onClick={() => navigate("/add-car")}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
  >
    + Add New Car
  </button>

</div>

        {cars.length === 0 ? (

  <div className="bg-white rounded-3xl shadow-lg p-16 text-center mt-8">

    <div className="text-7xl mb-6">
      🚗
    </div>

    <h2 className="text-3xl font-bold">
      No Cars Listed Yet
    </h2>

    <p className="text-gray-500 mt-4 max-w-md mx-auto">
      Start earning by listing your first vehicle.
      It only takes a minute to get started.
    </p>

    <button
      onClick={() => navigate("/add-car")}
      className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition shadow-lg"
    >
      + Add Your First Car
    </button>

  </div>

) : (

  <div className="grid md:grid-cols-3 gap-6">

    {cars.map((car) => (

      <div
        key={car.id}
        className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
      >

        <img
          src={car.image}
          alt={car.brand}
          className="w-full h-52 object-cover"
        />

        <div className="p-6">

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            🟢 Available
          </div>

          <h2 className="text-2xl font-bold">
            {car.brand} {car.model}
          </h2>

          <div className="space-y-2 text-gray-600 mt-4">

            <p>📅 {car.year}</p>

            <p>⚙ {car.transmission}</p>

            <p>👥 {car.seats} Seats</p>

          </div>

          <p className="font-bold text-blue-600 text-xl mt-6">
            ₱{car.price}/day
          </p>

          <div className="grid grid-cols-3 gap-3 mt-6">

            <button
  onClick={() => navigate(`/manage-car/${car.id}`)}
  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition"
>
  ⚙ Manage
</button>

            <button
              onClick={() => navigate(`/edit-car/${car.id}`)}
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
      
    </>
  );
}

export default MyCars;


