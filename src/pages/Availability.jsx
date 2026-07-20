import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "../firebase/firebase";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

function Availability() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const [status, setStatus] = useState("available");
  const [availabilityType, setAvailabilityType] = useState("always");

  const [minRentalDays, setMinRentalDays] = useState(1);
  const [maxRentalDays, setMaxRentalDays] = useState(14);
  const [blockedDates, setBlockedDates] = useState([]);
  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  const fetchCar = async () => {
    try {
      const ref = doc(db, "cars", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const car = snap.data();

        setBrand(car.brand || "");
        setModel(car.model || "");

        setStatus(car.status || "available");
        setAvailabilityType(car.availabilityType || "always");

        setMinRentalDays(car.minRentalDays || 1);
        setMaxRentalDays(car.maxRentalDays || 14);
        setBlockedDates(car.blockedDates || []);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load availability.");
    }

    setLoading(false);
  };

  const saveAvailability = async () => {
   
    try {
      await updateDoc(doc(db, "cars", id), {
        status,
        availabilityType,
        minRentalDays,
        maxRentalDays,
        blockedDates,
      });

      alert("Availability updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    }
  };
 const toggleBlockedDate = (date) => {
    const formatted = date.toISOString().split("T")[0];

    if (blockedDates.includes(formatted)) {
        setBlockedDates(
            blockedDates.filter((d) => d !== formatted)
        );
    } else {
        setBlockedDates([
            ...blockedDates,
            formatted,
        ]);
    }
};
  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading...
      </div>
    );
  }
  console.log({
  minRentalDays,
  maxRentalDays,
});
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-6">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back
        </button>
<h1 className="text-4xl font-bold">
    🚗 Availability Management
</h1>

<p className="text-lg text-gray-700 mt-2">
    {brand} {model}
</p>

<p className="text-gray-500 mt-1">
    Manage when renters can book this vehicle.
</p>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

    <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
            Rental Status
        </p>

        <h2 className="text-2xl font-bold mt-2">
            {status === "available" ? "🟢 Available" : "🔴 Unavailable"}
        </h2>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
            Blocked Days
        </p>

        <h2 className="text-2xl font-bold mt-2 text-blue-600">
            {blockedDates.length}
        </h2>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-sm">
            Rental Duration
        </p>

        <h2 className="text-2xl font-bold mt-2">
            {minRentalDays} - {maxRentalDays} Days
        </h2>
    </div>

</div>
        
                {/* Rental Status */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow mt-10 p-8">
          <h2 className="text-2xl font-bold">
            Rental Status
          </h2>
        
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-xl p-4 mt-5"
          >
            <option value="available">
              Available
            </option>

            <option value="unavailable">
              Unavailable
            </option>
          </select>
        </div>
{/* Rental Duration */}
               
        <div className="bg-white rounded-2xl shadow mt-8 p-8">
          <h2 className="text-2xl font-bold mb-6">
    Rental Duration
</h2>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
             
            <div>
              <label className="block mb-2">
                Minimum Days
              </label>

              <input
                type="number"
                value={minRentalDays}
                onChange={(e) =>
                  setMinRentalDays(Number(e.target.value))
                }
                className="w-full border rounded-xl p-4"
              />
            </div>
           
            <div>
              <label className="block mb-2">
                Maximum Days
              </label>

              <input
                type="number"
                value={maxRentalDays}
                onChange={(e) =>
                  setMaxRentalDays(Number(e.target.value))
                }
                className="w-full border rounded-xl p-4"
              />
            </div>

          </div>
        </div>
        </div>


        

        {/* Availability Type */}

        <div className="bg-white rounded-2xl shadow mt-8 p-8">
          <h2 className="text-2xl font-bold">
            Availability Type
          </h2>

          <div className="mt-6 space-y-4">

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="availabilityType"
                checked={availabilityType === "always"}
                onChange={() => setAvailabilityType("always")}
              />

              Always Available
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="availabilityType"
                checked={availabilityType === "selected"}
                onChange={() => setAvailabilityType("selected")}
              />

              Available on Selected Dates
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="availabilityType"
                checked={availabilityType === "paused"}
                onChange={() => setAvailabilityType("paused")}
              />

              Temporarily Unavailable
            </label>

          </div>
        </div>
        <div className="bg-white rounded-2xl shadow mt-8 p-8">
    
    <h2 className="text-2xl font-bold">
    📅 Availability Calendar
</h2>

<p className="text-gray-500 mt-2">
    Select dates below to manage when your vehicle can or cannot be booked.
</p>



    <div className="mt-6">
         
   
   
    
  <div className="flex flex-wrap gap-6 mt-5 mb-6">

    <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
        <span className="text-sm text-gray-600">
            Available
        </span>
    </div>

    <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-red-500"></div>
        <span className="text-sm text-gray-600">
            Blocked
        </span>
    </div>

    <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
        <span className="text-sm text-gray-600">
            Today
        </span>
    </div>

</div>


<div className="flex justify-center py-8">

    <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
<div className="bg-gray-50 rounded-2xl p-6">
        <Calendar
            onClickDay={toggleBlockedDate}
            tileClassName={({ date }) => {
                const formatted =
                    date.toISOString().split("T")[0];

                return blockedDates.includes(formatted)
                    ? "blocked-date"
                    : null;
            }}
        />
        </div>
        </div>
         </div>
        <div className="mt-8">
<h3 className="text-xl font-semibold mb-2">
    Blocked Dates ({blockedDates.length})
</h3>
    
   {blockedDates.length === 0 ? (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">

        <h3 className="font-semibold text-green-700">
            Your calendar is completely open!
        </h3>

        <p className="text-green-600 mt-2">
            Click any date above to block it.
        </p>

    </div>
) : (
    <div className="space-y-3">

        {blockedDates
            .sort()
            .map((date) => (

                <div
                    key={date}
                    className="flex justify-between items-center bg-white border rounded-xl px-5 py-4 hover:shadow-md transition"
                >
                    <span>
                        {new Date(date).toLocaleDateString()}
                    </span>

                   <button
    onClick={() =>
        setBlockedDates(
            blockedDates.filter(d => d !== date)
        )
    }
    className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition"
>
    Remove
</button>
                </div>

            ))}

    </div>
)}
</div>
    </div>

</div>
        

        <button
          onClick={saveAvailability}
          className="mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default Availability;