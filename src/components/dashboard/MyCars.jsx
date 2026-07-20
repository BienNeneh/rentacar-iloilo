import { FaCar, FaEdit, FaEye } from "react-icons/fa";

const cars = [
  {
    id: 1,
    name: "Toyota Vios",
    price: "₱1,500/day",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600",
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    price: "₱2,800/day",
    status: "Booked until July 18",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
  },
];

export default function MyCars() {
  return (
    <section className="max-w-7xl mx-auto mt-12 px-6">

      <h2 className="text-3xl font-bold mb-8">
        My Cars
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {cars.map((car) => (

          <div
            key={car.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >

            <img
              src={car.image}
              alt={car.name}
              className="h-60 w-full object-cover"
            />

            <div className="p-6">

              <div className="flex justify-between items-center">

                <h3 className="text-2xl font-bold">
                  {car.name}
                </h3>

                <FaCar
                  className="text-blue-600 text-2xl"
                />

              </div>

              <p className="text-gray-500 mt-2">
                {car.status}
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-6">
                {car.price}
              </p>

              <div className="flex gap-4 mt-8">

                <button
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex justify-center items-center gap-2"
                >
                  <FaEye />
                  View
                </button>

                <button
                  className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition flex justify-center items-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}