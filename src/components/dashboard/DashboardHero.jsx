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
  FaCarSide,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";
function DashboardHero() {
  const { user, userProfile } = useAuth();

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


  return (
    <section className="max-w-7xl mx-auto px-8 mt-10">

      <div className="bg-gradient-to-r from-blue-700 to-sky-500 rounded-3xl text-white p-10 shadow-lg">

       <h1 className="text-5xl font-bold">
  Welcome Back, {userProfile?.fullName?.split(" ")[0] || "User"} 👋
</h1>

        <p className="mt-4 text-blue-100 text-lg">
          Here's what's happening with your vehicles today.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <FaCarSide className="text-3xl mb-3" />
<h2 className="text-3xl font-bold">
  {totalCars}
</h2>

            <p className="text-blue-100">
              Cars Listed
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <FaCalendarCheck className="text-3xl mb-3" />

            <h2 className="text-3xl font-bold">
              5
            </h2>

            <p className="text-blue-100">
              Pending Bookings
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <FaMoneyBillWave className="text-3xl mb-3" />

            <h2 className="text-3xl font-bold">
              ₱12,500
            </h2>

            <p className="text-blue-100">
              Earnings This Month
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardHero;