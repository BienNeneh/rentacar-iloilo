import locations from "../../data/locations";
import LocationCard from "../common/LocationCard";

function PopularLocations() {
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
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default PopularLocations;