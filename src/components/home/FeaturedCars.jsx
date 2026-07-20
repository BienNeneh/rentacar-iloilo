import cars from "../../data/cars";
import CarCard from "../common/CarCard";

function FeaturedCars() {
  return (
    <section className="py-28 bg-gray-100">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">

          Featured Vehicles

        </h2>

        <p className="text-center text-gray-500 mt-5 text-xl">

          Explore the most popular rentals this week.

        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {cars.map((car) => (

            <CarCard
              key={car.id}
              car={car}
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedCars;