import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import hostBenefits from "../../data/hostBenefits";

function BecomeHost() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-24 sm:py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* =========================
              LEFT
          ========================= */}

          <div>

            {/* Label */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-orange-200
                bg-orange-50
                px-4
                py-2
                text-sm
                font-bold
                uppercase
                tracking-widest
                text-orange-600
              "
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />

              Become a Host
            </div>

            {/* Heading */}

            <h2
              className="
                mt-6
                text-4xl
                font-extrabold
                leading-tight
                tracking-tight
                text-[#2F2F2F]
                sm:text-5xl
              "
            >
              Turn Your Car Into
              <span className="block text-orange-500">
                Extra Income.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-6
                max-w-xl
                text-lg
                leading-8
                text-gray-500
              "
            >
              Your vehicle spends most of its time parked.
              Put it to work by sharing it with trusted
              renters across Iloilo Province.
            </p>

            {/* =========================
                Benefits
            ========================= */}

            <div className="mt-9 space-y-5">

              {hostBenefits.map((benefit, index) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-orange-50
                    "
                  >
                    <FaCheckCircle className="text-orange-500" />
                  </div>

                  <span
                    className="
                      text-base
                      font-medium
                      text-gray-700
                      sm:text-lg
                    "
                  >
                    {benefit}
                  </span>

                </div>

              ))}

            </div>

            {/* =========================
                CTA
            ========================= */}

            <button
              onClick={() => navigate("/add-car")}
              className="
                group
                mt-10
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-orange-500
                px-7
                py-4
                font-bold
                text-white
                shadow-lg
                shadow-orange-200
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-orange-600
                hover:shadow-xl
              "
            >
              <span>
                Start Hosting Today
              </span>

              <FaArrowRight
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>

            <p className="mt-4 text-sm text-gray-400">
              List your vehicle and start accepting rental requests.
            </p>

          </div>

          {/* =========================
              RIGHT — IMAGE
          ========================= */}

          <div className="relative">

            {/* Decorative background */}

            <div
              className="
                absolute
                -right-4
                -top-4
                h-32
                w-32
                rounded-full
                bg-orange-200/50
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-6
                -left-6
                h-32
                w-32
                rounded-full
                bg-amber-100
                blur-2xl
              "
            />

            {/* Image */}

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-orange-100
                shadow-2xl
              "
            >

              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80"
                alt="Host your car"
                className="
                  h-[420px]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                  sm:h-[500px]
                "
              />

              {/* Image gradient */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-transparent
                "
              />

              {/* Floating message */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6
                  rounded-2xl
                  border
                  border-white/30
                  bg-white/90
                  p-4
                  shadow-xl
                  backdrop-blur
                  sm:left-8
                  sm:right-auto
                  sm:max-w-xs
                "
              >

                <p className="text-sm font-semibold text-orange-600">
                  🚗 Your car could be earning
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Share your vehicle with renters
                  in your community.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default BecomeHost;