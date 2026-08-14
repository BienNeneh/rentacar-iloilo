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
  const { user } = useAuth();

  function handleBecomeHost() {
    if (user) {
      navigate("/add-car");
    } else {
      navigate("/signup");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#FFF8ED]">

      {/* ==========================================
          BACKGROUND IMAGE
      ========================================== */}

      <div className="absolute inset-0">

        <img
          src={heroRoadtrip}
          alt="Road trip through Iloilo"
          draggable={false}
          className="
            w-full
            h-full
            object-cover
            object-[72%_50%]
            sm:object-[75%_50%]
            lg:object-[82%_40%]
            select-none
          "
        />

      </div>

      {/* ==========================================
          DESKTOP OVERLAY
      ========================================== */}

      <div
        className="
          hidden
          lg:block
          absolute
          inset-y-0
          left-0
          w-[48%]
          bg-gradient-to-r
          from-[#FFF8ED]
          via-[#FFF8ED]/90
          to-transparent
          z-10
        "
      />

      {/* ==========================================
          MOBILE OVERLAY
      ========================================== */}

      <div
        className="
          lg:hidden
          absolute
          inset-0
          bg-gradient-to-b
          from-[#FFF8ED]/95
          via-[#FFF8ED]/70
          via-[55%]
          to-[#FFF8ED]/20
          z-10
        "
      />

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div
        className="
          relative
          z-20
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          lg:px-16
        "
      >

        <div
          className="
            min-h-[900px]
            sm:min-h-[850px]
            lg:min-h-[850px]
            flex
            items-start
            lg:items-center
          "
        >

          <div
            className="
              w-full
              max-w-3xl
              pt-10
              sm:pt-16
              lg:pt-0
              pb-20
            "
          >

            {/* ==========================================
                BADGE
            ========================================== */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/95
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

            {/* ==========================================
                HEADING
            ========================================== */}

            <h1
              className="
                mt-6
                sm:mt-8
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-black
                leading-[1.08]
                text-[#3A2A27]
                max-w-2xl
              "
            >

              Every Journey

              <span className="block text-orange-500">
                Starts With
              </span>

              The Right Ride.

            </h1>

            {/* ==========================================
                DESCRIPTION
            ========================================== */}

            <p
              className="
                mt-5
                sm:mt-6
                text-base
                sm:text-lg
                lg:text-xl
                leading-7
                sm:leading-8
                text-[#5C463B]
                max-w-2xl
              "
            >
              Discover trusted vehicles shared by your local community.
              Whether you're planning a beach getaway, a weekend road trip,
              or visiting family, your next adventure starts here.
            </p>

            {/* ==========================================
                BUTTONS
            ========================================== */}

            <div
              className="
                mt-7
                sm:mt-8
                flex
                flex-col
                sm:flex-row
                gap-3
                sm:gap-4
                max-w-xl
              "
            >

              <button
                type="button"
                onClick={() => navigate("/list-car")}
                className="
                  w-full
                  sm:w-auto
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  rounded-2xl
                  py-4
                  px-8
                  font-bold
                  shadow-xl
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                🚗 Explore Cars
              </button>

              <button
                type="button"
                onClick={handleBecomeHost}
                className="
                  w-full
                  sm:w-auto
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

            {/* ==========================================
                STATS
            ========================================== */}

            <div
              className="
                mt-9
                sm:mt-12
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-4
                sm:gap-6
                max-w-2xl
              "
            >

              {/* Cars Listed */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-white/75
                  backdrop-blur-sm
                  rounded-2xl
                  p-3
                  sm:p-0
                  sm:bg-transparent
                  sm:backdrop-blur-0
                "
              >

                <div
                  className="
                    w-12
                    h-12
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
                      text-2xl
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

              {/* Local Community */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-white/75
                  backdrop-blur-sm
                  rounded-2xl
                  p-3
                  sm:p-0
                  sm:bg-transparent
                  sm:backdrop-blur-0
                "
              >

                <div
                  className="
                    w-12
                    h-12
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
                      text-2xl
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
                  bg-white/75
                  backdrop-blur-sm
                  rounded-2xl
                  p-3
                  sm:p-0
                  sm:bg-transparent
                  sm:backdrop-blur-0
                "
              >

                <div
                  className="
                    w-12
                    h-12
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
                      text-2xl
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