import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

function EditCar() {
  const navigate = useNavigate();
const { id } = useParams();

const [loading, setLoading] = useState(false);

const [brand, setBrand] = useState("");
const [model, setModel] = useState("");
const [year, setYear] = useState("");
const [seats, setSeats] = useState("");
const [transmission, setTransmission] = useState("Automatic");
const [fuelType, setFuelType] = useState("Gasoline");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState("");
useEffect(() => {
    async function fetchCar() {
        try {
            const docRef = doc(db, "cars", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const car = docSnap.data();

                setBrand(car.brand || "");
                setModel(car.model || "");
                setYear(car.year || "");
                setSeats(car.seats || "");
                setTransmission(car.transmission || "Automatic");
                setFuelType(car.fuelType || "Gasoline");
                setPrice(car.price || "");
                setDescription(car.description || "");
                setImage(car.image || "");
            } else {
                alert("Car not found.");
                navigate("/my-cars");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to load car.");
        } finally {
            setFetching(false);
        }
    }

    fetchCar();
}, [id, navigate]);

async function handleSubmit(e) {
  e.preventDefault();

  setLoading(true);
if (!brand.trim() || !model.trim() || !price) {
    alert("Please fill in all required fields.");
    setLoading(false);
    return;
}

  try {

    await updateDoc(doc(db, "cars", id), {
      brand,
      model,
      year,
      seats,
      transmission,
      fuelType,
      price,
      description,
      image,
    });

    alert("Car updated successfully!");

    navigate("/my-cars");

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

  setLoading(false);
}
return (
  <div className="min-h-screen bg-gray-100 py-10">

    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">

      <h1 className="text-4xl font-bold mb-2">
    Edit {brand} {model}
</h1>

      <p className="text-gray-500 mb-10">
        Update your vehicle details.
      </p>

     <form onSubmit={handleSubmit}>

  {/* Brand */}
  <div>
    <label className="font-semibold block mb-2">
      Car Brand
    </label>

    <input
      type="text"
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      className="w-full border rounded-xl p-4"
    />
  </div>

  {/* Model */}
  <div className="mt-6">
    <label className="font-semibold block mb-2">
      Car Model
    </label>

    <input
      type="text"
      value={model}
      onChange={(e) => setModel(e.target.value)}
      className="w-full border rounded-xl p-4"
    />
  </div>

  {/* Year + Seats */}
  <div className="grid md:grid-cols-2 gap-6 mt-6">

    <div>
      <label className="font-semibold block mb-2">
        Year
      </label>

      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full border rounded-xl p-4"
      />
    </div>

    <div>
      <label className="font-semibold block mb-2">
        Seats
      </label>

      <input
        type="number"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
        className="w-full border rounded-xl p-4"
      />
    </div>

  </div>

  {/* Transmission + Fuel */}
  <div className="grid md:grid-cols-2 gap-6 mt-6">

    <div>
      <label className="font-semibold block mb-2">
        Transmission
      </label>

      <select
        value={transmission}
        onChange={(e) => setTransmission(e.target.value)}
        className="w-full border rounded-xl p-4"
      >
        <option>Automatic</option>
        <option>Manual</option>
      </select>
    </div>

    <div>
      <label className="font-semibold block mb-2">
        Fuel Type
      </label>

      <select
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
        className="w-full border rounded-xl p-4"
      >
        <option>Gasoline</option>
        <option>Diesel</option>
        <option>Hybrid</option>
        <option>Electric</option>
      </select>
    </div>

  </div>

  {/* Price */}
  <div className="mt-6">

    <label className="font-semibold block mb-2">
      Price Per Day
    </label>

    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

  </div>

  {/* Image */}
  <div className="mt-6">

    <label className="font-semibold block mb-2">
      Car Image URL
    </label>
     {image && (
    <img
        src={image}
        alt={`${brand} ${model}`}
        className="mt-4 w-full h-64 object-cover rounded-xl border"
    />
)}
    <input
      type="text"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

  </div>

  {/* Description */}
  <div className="mt-6">

    <label className="font-semibold block mb-2">
      Description
    </label>

    <textarea
      rows="5"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

  </div>

  {/* Buttons */}
  <div className="flex gap-4 mt-8">

   <button
  type="submit"
  disabled={loading}
  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold transition"
>
  {loading ? "Saving..." : "💾 Save Changes"}
</button>

    <button
      type="button"
      onClick={() => navigate("/my-cars")}
      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-xl font-bold transition"
    >
      Cancel
    </button>

  </div>

</form>

    </div>

  </div>
);
}
export default EditCar;