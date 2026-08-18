import { FaCarSide } from "react-icons/fa";

function SplashScreen() {
  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-[#FFF8ED]
      "
    >
      <div className="flex flex-col items-center">

        {/* Logo */}

        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-3xl
            bg-orange-500
            shadow-2xl
            shadow-orange-200
          "
        >
          <FaCarSide className="text-5xl text-white" />
        </div>


        {/* Brand */}

        <h1
          className="
            mt-6
            text-3xl
            font-black
            tracking-tight
            text-[#2F2F2F]
          "
        >
          Rent<span className="text-orange-500">ACar</span>
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Iloilo Community Car Rental
        </p>


        {/* Loading Spinner */}

        <div className="mt-8">

          <div
            className="
              h-8
              w-8
              animate-spin
              rounded-full
              border-4
              border-orange-100
              border-t-orange-500
            "
          />

        </div>

      </div>
    </div>
  );
}

export default SplashScreen;