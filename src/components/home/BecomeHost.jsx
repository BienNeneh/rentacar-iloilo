import { FaCheckCircle } from "react-icons/fa";
import hostBenefits from "../../data/hostBenefits";

function BecomeHost() {
  return (
    <section className="py-28">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="text-blue-600 font-semibold uppercase tracking-widest">
              Become a Host
            </span>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              Earn Money From Your Car
            </h2>

            <p className="text-gray-500 text-lg mt-6 leading-8">

              Your vehicle spends most of its time parked.

              Turn it into an income source by renting it safely
              to verified drivers across Iloilo Province.

            </p>

            <div className="mt-10 space-y-5">

              {hostBenefits.map((benefit, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4"
                >

                  <FaCheckCircle className="text-blue-600 text-xl" />

                  <span className="text-lg">
                    {benefit}
                  </span>

                </div>

              ))}

            </div>

            <button
              className="
                mt-12
                bg-blue-600
                text-white
                px-10
                py-4
                rounded-xl
                font-semibold
                hover:bg-blue-700
                transition
              "
            >
              Start Hosting Today
            </button>

          </div>

          {/* RIGHT */}

          <div>

            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80"
              alt="Host your car"
              className="
                rounded-3xl
                shadow-2xl
                hover:scale-105
                transition
                duration-500
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default BecomeHost;