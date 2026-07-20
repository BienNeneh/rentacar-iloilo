import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white">
      <div className="max-w-7xl mx-auto px-8 py-28 flex flex-col items-center text-center">

        <span className="bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
          🚗 Iloilo's Community Car Rental Platform
        </span>

        <h1 className="text-6xl font-bold leading-tight max-w-4xl">
          Find Your
          <span className="text-yellow-300"> Perfect Ride </span>
          Anytime, Anywhere
        </h1>

        <p className="mt-8 text-xl text-blue-100 max-w-2xl">
          Rent trusted vehicles directly from car owners near you.
          Safe, affordable, and available whenever you need them.
        </p>

        <div className="mt-10 flex gap-5">
<button
  onClick={() => {
    alert("Button clicked!");
    navigate("/list-car");
  }}
  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
>
  Browse Cars
</button>

          <button className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition">
            List Your Car
          </button>

        </div>

      </div>
    </section>
  );
}

export default Hero;