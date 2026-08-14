import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FFF8ED]">

      {/* =========================
          LEFT SIDE — SUNSET BRAND
      ========================= */}

      <div
        className="
          hidden
          lg:flex
          relative
          overflow-hidden
          items-center
          justify-center
          p-16
          bg-gradient-to-br
          from-orange-400
          via-orange-500
          to-amber-500
        "
      >

        {/* Decorative glow */}

        <div
          className="
            absolute
            -top-32
            -left-32
            w-96
            h-96
            rounded-full
            bg-yellow-200/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -right-40
            w-[32rem]
            h-[32rem]
            rounded-full
            bg-orange-300/30
            blur-3xl
          "
        />

        {/* Decorative sun */}

        <div
          className="
            absolute
            top-20
            right-20
            w-28
            h-28
            rounded-full
            bg-yellow-200/40
            blur-sm
          "
        />

        {/* Content */}

        <div className="relative z-10 max-w-xl text-white">

          <p
            className="
              uppercase
              tracking-[0.3em]
              text-sm
              font-bold
              text-orange-50
            "
          >
            ILOILO COMMUNITY CAR RENTAL
          </p>

          <h1
            className="
              mt-6
              text-6xl
              xl:text-7xl
              font-extrabold
              leading-[1.05]
            "
          >
            Join RentACar.
          </h1>

          <h2
            className="
              mt-3
              text-4xl
              xl:text-5xl
              font-bold
              text-orange-50
            "
          >
            Your next journey starts here.
          </h2>

          <p
            className="
              mt-8
              text-lg
              xl:text-xl
              text-orange-50
              leading-8
              max-w-lg
            "
          >
            Rent a vehicle from someone in your
            community, or turn your own car into
            an opportunity.
          </p>

          {/* Travel line */}

          <div className="mt-12 flex items-center gap-4">

            <div className="h-px w-16 bg-white/60" />

            <span className="text-sm font-semibold text-orange-50">
              Explore Iloilo. Your way.
            </span>

          </div>

          {/* Small visual road decoration */}

         

        </div>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div
        className="
          flex
          items-center
          justify-center
          bg-[#FFF8ED]
          p-6
          sm:p-10
          lg:p-12
          overflow-y-auto
        "
      >

        <div className="w-full max-w-lg">

          <RegisterForm />

        </div>

      </div>

    </div>
  );
}

export default Register;