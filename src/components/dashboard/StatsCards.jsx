import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";




import {
  FaCar,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaStar,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";



function StatsCards() {
  const navigate = useNavigate();
  const { user } = useAuth();

const [totalCars, setTotalCars] = useState(0);
useEffect(() => {
  async function fetchCars() {
    if (!user) return;

   const q = query(
  collection(db, "cars"),
  where("ownerId", "==", user.uid)
);

    const snapshot = await getDocs(q);

    setTotalCars(snapshot.size);
  }

  fetchCars();
}, [user]);

  const stats = [
  {
    title: "Total Cars",
    value: totalCars,
    icon: <FaCar />,
    color: "bg-blue-500",
  },
  {
    title: "Monthly Earnings",
    value: "₱18,500",
    icon: <FaMoneyBillWave />,
    color: "bg-green-500",
  },
  {
    title: "Bookings",
    value: "12",
    icon: <FaCalendarCheck />,
    color: "bg-purple-500",
  },
  {
    title: "Rating",
    value: "4.9",
    icon: <FaStar />,
    color: "bg-yellow-500",
  },
];
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">
        Dashboard Overview
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div
              className={`w-14 h-14 rounded-xl ${stat.color} text-white flex items-center justify-center text-2xl mb-5`}
            >
              {stat.icon}
            </div>

            <p className="text-gray-500">{stat.title}</p>

            <h3 className="text-3xl font-bold mt-2">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsCards;