import { useState } from "react";
import { db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase/firebase";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import iloiloLocations from "../data/iloiloLocations";
import vehicleTypes from "../data/vehicleTypes";
import ImageUploader from "../components/upload/ImageUploader";

function AddCar()  {
const [location, setLocation] = useState("");
const [vehicleType, setVehicleType] = useState("");
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [brand, setBrand] = useState("");
const [model, setModel] = useState("");
const [year, setYear] = useState("");
const [seats, setSeats] = useState("");
const [transmission, setTransmission] = useState("Automatic");
const [fuelType, setFuelType] = useState("Gasoline");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState("");

async function handleSubmit(e) {
  e.preventDefault();
  
  setLoading(true);
  setSuccess(false);

  try {
    await addDoc(collection(db, "cars"), {
      location,
      vehicleType,
      brand,
      model,
      year,
      seats,
      transmission,
      fuelType,
      price,
      description,
      image,

      ownerId: auth.currentUser.uid,
      ownerEmail: auth.currentUser.email,

      createdAt: serverTimestamp(),
    });

    setSuccess(true);
    setLocation(""); 
    setVehicleType("");
    setBrand("");
    setModel("");
    setYear("");
    setSeats("");
    setPrice("");
    setDescription("");
    setImage("");

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
          Add New Car
        </h1>

        <p className="text-gray-500 mb-10">
          Fill in your vehicle details below.
        </p>
<div className="bg-blue-100 p-4 rounded-xl mb-6">
  <p><strong>Brand:</strong> {brand}</p>
  <p><strong>Model:</strong> {model}</p>
  <p><strong>Year:</strong> {year}</p>
</div>
{success && (
  <div className="mb-6">

    <div className="rounded-xl bg-green-100 border border-green-400 p-4 text-green-700">
      ✅ Car added successfully!
    </div>

    <button
      onClick={() => navigate("/my-cars")}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
    >
      🚗 View My Cars
    </button>

  </div>
)}
        <form onSubmit={handleSubmit}>

          <div>
            <label className="block mb-2 font-semibold">
              Car Brand
            </label>

            <input
  type="text"
  placeholder="Toyota"
  value={brand}
  onChange={(e) => setBrand(e.target.value)}
  className="w-full border rounded-xl p-4"
/>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Car Model
            </label>

            <input
  type="text"
  placeholder="Vios"
  value={model}
  onChange={(e) => setModel(e.target.value)}
  className="w-full border rounded-xl p-4"
/>
          </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Location */}

    <div>
        <label className="block mb-2 font-semibold">
            Location
        </label>

        <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-xl p-4"
        >
            <option value="">Select Location</option>

            {iloiloLocations.map((location) => (
                <option key={location} value={location}>
                    {location}
                </option>
            ))}
        </select>
    </div>

    {/* Vehicle Type */}

    <div>
        <label className="block mb-2 font-semibold">
            Vehicle Type
        </label>

        <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full border rounded-xl p-4"
        >
            <option value="">Select Vehicle Type</option>

            {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    </div>

</div>
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold block mb-2">
                Year
              </label>

              <input
  type="text"
  placeholder="Year"
  value={year}
  onChange={(e) => setYear(e.target.value)}
  className="w-full border rounded-xl p-4"
/>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Seats
              </label>

              <input
  type="number"
  placeholder="5"
  value={seats}
  onChange={(e) => setSeats(e.target.value)}
  className="w-full border rounded-xl p-4"
/>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

  <div>
    <label className="block mb-2 font-semibold">
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
    <label className="block mb-2 font-semibold">
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

          <div>

            <label className="block mb-2 font-semibold">
              Price Per Day
            </label>

            <input
  type="number"
  placeholder="1500"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  className="w-full border rounded-xl p-4"
/>

          </div>

          <div>

            
             <div className="mt-8">

  
<div className="mt-8">

  <ImageUploader
    image={image}
    setImage={setImage}
  />

</div>


</div>
<label className="block mt-6 mb-2 font-semibold">
    Description
</label>
            <textarea
  rows="5"
  placeholder="Tell renters about your vehicle..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full border rounded-xl p-4"
/>

          </div>

       <div className="flex gap-4 mt-6">

  <button
    type="submit"
    disabled={loading}
    className="
      flex-1
      bg-blue-600
      hover:bg-blue-700
      disabled:bg-gray-400
      text-white
      py-4
      rounded-xl
      font-bold
      transition
    "
  >
    {loading ? "Saving..." : "💾 Save Car"}
  </button>

  <button
    type="button"
    onClick={() => navigate("/my-cars")}
    className="
      flex-1
      bg-gray-200
      hover:bg-gray-300
      text-gray-800
      py-4
      rounded-xl
      font-bold
      transition
    "
  >
    🚗 My Cars
  </button>

</div>

        </form>

      </div>
    </div>
  );
}

export default AddCar;