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
            counts[car.location] =
              (counts[car.location] || 0) + 1;
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
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-orange-50 py-20 sm:py-24 lg:py-28">

      {/* Decorative sunset glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm backdrop-blur">
            <span>📍</span>
            Explore Iloilo
          </div>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Discover Your Next
            <span className="block text-orange-500">
              Ride Across Iloilo
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Browse vehicles from trusted local owners across
            Iloilo's cities and municipalities.
          </p>

        </div>

        {/* Location Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-7">

          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              carCount={carCounts[location.name] || 0}
            />
          ))}

        </div>

        {/* Bottom message */}
        <div className="mt-12 text-center">

          <p className="text-sm text-gray-500">
            More destinations across Iloilo coming soon.
          </p>

        </div>

      </div>
    </section>
  );
}

export default PopularLocations;