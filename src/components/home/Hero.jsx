import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaCarSide,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

import heroRoadtrip from "../../assets/images/Jeepney.jpg";

function Hero() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // =========================================================
  // BECOME A HOST
  // =========================================================

  function handleBecomeHost() {
    if (currentUser) {
      navigate("/add-car");
    } else {
      navigate("/register");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#FFF8ED]">

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="absolute inset-0">

        <img
          src={heroRoadtrip}
          alt="Philippine road at sunset"
          draggable={false}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-[50%_72%]
            select-none
          "
        />

        {/* Overall image protection */}
        <div className="absolute inset-0 bg-black/10" />


        {/* =================================================
            DESKTOP OVERLAY
        ================================================= */}

        <div
          className="
            absolute
            inset-y-0
            left-0
            hidden
            w-[62%]
            bg-gradient-to-r
            from-[#FFF8ED]
            via-[#FFF8ED]/90
            to-transparent
            lg:block
          "
        />


        {/* =================================================
            MOBILE OVERLAY

            Keeps the background visible while making
            the text readable.
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#FFF8ED]/75
            via-[#FFF8ED]/40
            to-black/10
            lg:hidden
          "
        />

      </div>


      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          max-w-7xl
          px-6
          lg:px-16
        "
      >

        <div
          className="
            flex
            min-h-[760px]
            items-center
            lg:min-h-[850px]
          "
        >

          <div
            className="
              w-full
              max-w-3xl
              py-16
              sm:py-20
              lg:py-0
            "
          >


            {/* =================================================
                LOCATION BADGE
            ================================================= */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/90
                px-4
                py-2
                text-sm
                font-semibold
                text-orange-600
                shadow-lg
                backdrop-blur-md
              "
            >
              <FaMapMarkerAlt />

              Community Powered in Iloilo
            </div>


            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <h1
              className="
                mt-7
                max-w-3xl
                text-4xl
                font-black
                leading-[1.05]
                tracking-tight
                text-[#3A2A27]

                sm:text-5xl

                lg:mt-8
                lg:text-7xl
              "
            >
              Every Journey

              <span className="block text-orange-500">
                Starts With
              </span>

              The Right Ride.
            </h1>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-[#4F3B33]

                sm:text-lg
                sm:leading-8

                lg:text-xl
              "
            >
              Discover vehicles shared by your local community.
              Whether you're planning a beach getaway, a weekend
              road trip, or visiting family, your next adventure
              starts here.
            </p>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-4
                sm:flex-row
              "
            >

              {/* =================================================
                  EXPLORE CARS
              ================================================= */}

              <button
                type="button"
                onClick={() => navigate("/list-car")}
                className="
                  rounded-2xl
                  bg-orange-500
                  px-8
                  py-4
                  font-bold
                  text-white
                  shadow-xl
                  transition
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-orange-600
                  hover:shadow-2xl
                "
              >
                🚗 Explore Cars
              </button>


              {/* =================================================
                  BECOME A HOST
              ================================================= */}

              <button
                type="button"
                onClick={handleBecomeHost}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-white/90
                  px-8
                  py-4
                  font-semibold
                  text-[#3A2A27]
                  shadow-xl
                  backdrop-blur-md
                  transition
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-white
                  hover:shadow-2xl
                "
              >
                Become a Host

                <FaArrowRight />
              </button>

            </div>


            {/* =================================================
                STATS
            ================================================= */}

            <div
              className="
                mt-10
                grid
                grid-cols-1
                gap-3

                sm:grid-cols-3
                sm:gap-4

                lg:max-w-[650px]
              "
            >

              {/* =================================================
                  LOCAL LISTINGS
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/50
                  bg-white/70
                  px-4
                  py-3
                  shadow-lg
                  backdrop-blur-md

                  sm:px-4

                  lg:bg-white/80
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-100/90

                    sm:h-14
                    sm:w-14
                  "
                >
                  <FaCarSide
                    className="
                      text-lg
                      text-orange-500

                      sm:text-xl
                    "
                  />
                </div>

                <div>

                  <h3
                    className="
                      text-xl
                      font-black
                      text-orange-500

                      sm:text-2xl
                      lg:text-3xl
                    "
                  >
                    Local
                  </h3>

                  <p className="text-sm text-[#5C463B] sm:text-base">
                    Car Listings
                  </p>

                </div>

              </div>


              {/* =================================================
                  COMMUNITY
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/50
                  bg-white/70
                  px-4
                  py-3
                  shadow-lg
                  backdrop-blur-md

                  lg:bg-white/80
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-100/90

                    sm:h-14
                    sm:w-14
                  "
                >
                  <FaUsers
                    className="
                      text-lg
                      text-orange-500

                      sm:text-xl
                    "
                  />
                </div>

                <div>

                  <h3
                    className="
                      text-xl
                      font-black
                      text-orange-500

                      sm:text-2xl
                      lg:text-3xl
                    "
                  >
                    Local
                  </h3>

                  <p className="text-sm text-[#5C463B] sm:text-base">
                    Community
                  </p>

                </div>

              </div>


              {/* =================================================
                  ILOILO COMMUNITY
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/50
                  bg-white/70
                  px-4
                  py-3
                  shadow-lg
                  backdrop-blur-md

                  lg:bg-white/80
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-100/90

                    sm:h-14
                    sm:w-14
                  "
                >
                  <FaShieldAlt
                    className="
                      text-lg
                      text-orange-500

                      sm:text-xl
                    "
                  />
                </div>

                <div>

                  <h3
                    className="
                      text-xl
                      font-black
                      text-orange-500

                      sm:text-2xl
                      lg:text-3xl
                    "
                  >
                    Iloilo
                  </h3>

                  <p className="text-sm text-[#5C463B] sm:text-base">
                    Community Powered
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