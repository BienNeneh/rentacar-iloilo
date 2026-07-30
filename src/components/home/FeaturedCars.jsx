import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import CarCard from "../common/CarCard";

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedCars() {
      try {
        const carsRef = collection(db, "cars");

        const q = query(
          carsRef,
          orderBy("createdAt", "desc"),
          limit(4)
        );

        const snapshot = await getDocs(q);

        const carsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCars(carsData);
      } catch (error) {
        console.error("Error loading featured cars:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedCars();
  }, []);

  return (
    <section className="py-28 bg-[#FFF8ED]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-[#2F2F2F]">
            Featured Vehicles
          </h2>

          <p className="mt-5 text-xl text-gray-500">
            Discover the latest vehicles listed by our Iloilo community.
          </p>

        </div>

        {loading ? (

          <div className="py-24 text-center">

            <div className="w-12 h-12 mx-auto rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>

            <p className="mt-6 text-gray-500">
              Loading vehicles...
            </p>

          </div>

        ) : cars.length === 0 ? (

          <div className="py-24 text-center">

            <div className="text-6xl mb-4">
              🚗
            </div>

            <h3 className="text-2xl font-bold text-gray-700">
              No vehicles yet
            </h3>

            <p className="mt-3 text-gray-500">
              Be the first to list your car in the community.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {cars.map((car) => (

              <CarCard
                key={car.id}
                car={car}
              />

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default FeaturedCars;