import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaCarSide,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

import heroRoadtrip from "../../assets/images/hero-roadtrip.png";

function Hero() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  function handleBecomeHost() {
    if (currentUser) {
      navigate("/add-car");
    } else {
      navigate("/signup");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#FFF8ED]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroRoadtrip}
          alt="Road Trip"
          draggable={false}
          className="
            w-full
            h-full
            object-cover
            object-[75%_50%]
            lg:object-[82%_40%]
            select-none
          "
        />
      </div>

      {/* Desktop Overlay */}
      <div
        className="
          hidden
          lg:block
          absolute
          inset-y-0
          left-0
          w-[42%]
          bg-gradient-to-r
          from-[#FFF8ED]
          via-[#FFF8ED]/80
          to-transparent
          z-10
        "
      />

      {/* Mobile Overlay */}
      <div
        className="
          lg:hidden
          absolute
          inset-0
          bg-gradient-to-b
          from-[#FFF8ED]/95
          via-[#FFF8ED]/55
          to-transparent
          z-10
        "
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-16">

        <div className="min-h-[720px] lg:min-h-[850px] flex items-center">

          <div className="max-w-3xl py-16 sm:py-20 lg:py-0">

            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/90
                backdrop-blur
                px-4
                py-2
                shadow-lg
                text-orange-600
                font-semibold
                text-sm
              "
            >
              <FaMapMarkerAlt />
              Community Powered in Iloilo
            </div>

            {/* Heading */}
            <h1
              className="
                mt-8
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-black
                leading-tight
                text-[#3A2A27]
              "
            >
              Every Journey

              <span className="block text-orange-500">
                Starts With
              </span>

              The Right Ride.
            </h1>

            {/* Description */}
            <p
              className="
                mt-6
                text-base
                sm:text-lg
                lg:text-xl
                leading-8
                text-[#5C463B]
              "
            >
              Discover trusted vehicles shared by your local community.
              Whether you're planning a beach getaway, a weekend road trip,
              or visiting family, your next adventure starts here.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              {/* Explore Cars */}
              <button
                onClick={() => navigate("/list-car")}
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  rounded-2xl
                  py-4
                  px-8
                  font-bold
                  shadow-xl
                  transition
                "
              >
                🚗 Explore Cars
              </button>

              {/* Become a Host */}
              <button
                onClick={handleBecomeHost}
                className="
                  bg-white
                  rounded-2xl
                  py-4
                  px-8
                  font-semibold
                  shadow-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  hover:shadow-2xl
                "
              >
                Become a Host
                <FaArrowRight />
              </button>

            </div>

            {/* Stats */}
            <div
              className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-3
                sm:gap-6
              "
            >

              {/* Cars */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-white/85
                  backdrop-blur-sm
                  rounded-2xl
                  px-4
                  py-3
                  sm:bg-transparent
                  sm:backdrop-blur-0
                  sm:px-0
                  sm:py-0
                "
              >
                <div
                  className="
                    w-11
                    h-11
                    sm:w-14
                    sm:h-14
                    rounded-full
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >
                  <FaCarSide className="text-orange-500 text-lg sm:text-xl" />
                </div>

                <div>
                  <h3
                    className="
                      text-xl
                      sm:text-2xl
                      lg:text-3xl
                      font-black
                      text-orange-500
                    "
                  >
                    100+
                  </h3>

                  <p className="text-sm sm:text-base text-[#5C463B]">
                    Cars Listed
                  </p>
                </div>
              </div>

              {/* Community */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-white/85
                  backdrop-blur-sm
                  rounded-2xl
                  px-4
                  py-3
                  sm:bg-transparent
                  sm:backdrop-blur-0
                  sm:px-0
                  sm:py-0
                "
              >
                <div
                  className="
                    w-11
                    h-11
                    sm:w-14
                    sm:h-14
                    rounded-full
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >
                  <FaUsers className="text-orange-500 text-lg sm:text-xl" />
                </div>

                <div>
                  <h3
                    className="
                      text-xl
                      sm:text-2xl
                      lg:text-3xl
                      font-black
                      text-orange-500
                    "
                  >
                    Local
                  </h3>

                  <p className="text-sm sm:text-base text-[#5C463B]">
                    Community
                  </p>
                </div>
              </div>

              {/* Safety */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-white/85
                  backdrop-blur-sm
                  rounded-2xl
                  px-4
                  py-3
                  sm:bg-transparent
                  sm:backdrop-blur-0
                  sm:px-0
                  sm:py-0
                "
              >
                <div
                  className="
                    w-11
                    h-11
                    sm:w-14
                    sm:h-14
                    rounded-full
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >
                  <FaShieldAlt className="text-orange-500 text-lg sm:text-xl" />
                </div>

                <div>
                  <h3
                    className="
                      text-xl
                      sm:text-2xl
                      lg:text-3xl
                      font-black
                      text-orange-500
                    "
                  >
                    Safe
                  </h3>

                  <p className="text-sm sm:text-base text-[#5C463B]">
                    Verified
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;