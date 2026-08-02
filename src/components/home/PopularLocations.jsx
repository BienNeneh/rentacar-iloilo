import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import locations from "../../data/locations";
import LocationCard from "../common/LocationCard";

function PopularLocations() {
  const [carCounts, setCarCounts] = useState({});

  useEffect(() => {
    async function fetchCars() {
      try {
        const snapshot = await getDocs(collection(db, "cars"));

        const counts = {};

        snapshot.docs.forEach((doc) => {
          const car = doc.data();

          if (car.location) {
            counts[car.location] = (counts[car.location] || 0) + 1;
          }
        });

        setCarCounts(counts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCars();
  }, []);

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">
          Explore Iloilo Province
        </h2>

        <p className="text-center text-gray-500 mt-5 text-xl">
          Browse available vehicles from trusted owners across Iloilo's municipalities.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              carCount={carCounts[location.name] || 0}
            />
          ))}

        </div>
      </div>
    </section>
  );
}

export default PopularLocations;