import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCarSide,
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

function LoginForm() {
  return (
    <div
      className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-3xl
        border
        border-orange-100
        bg-white
        p-7
        shadow-2xl
        sm:p-10
      "
    >

      {/* Decorative glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-orange-100
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-40
          w-40
          rounded-full
          bg-amber-100
          blur-3xl
        "
      />

      <div className="relative">

        {/* =========================
            Logo
        ========================= */}

        <Link
          to="/"
          className="inline-flex items-center gap-3"
        >

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-orange-50
              text-orange-500
            "
          >
            <FaCarSide className="text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Rent<span className="text-orange-500">ACar</span>
            </h1>

            <p className="text-[10px] font-medium text-gray-400">
              Iloilo Community Car Rental
            </p>
          </div>

        </Link>

        {/* =========================
            Back
        ========================= */}

        <Link
          to="/"
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-gray-500
            transition
            hover:text-orange-500
          "
        >
          <FaArrowLeft className="text-xs" />
          Back to Home
        </Link>

        {/* =========================
            Heading
        ========================= */}

        <div className="mt-10">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-200
              bg-orange-50
              px-3
              py-1.5
              text-xs
              font-bold
              text-orange-600
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Welcome back
          </div>

          <h2
            className="
              mt-4
              text-4xl
              font-extrabold
              tracking-tight
              text-gray-900
            "
          >
            Ready for your
            <span className="block text-orange-500">
              next ride?
            </span>
          </h2>

          <p className="mt-3 text-gray-500">
            Sign in to continue exploring vehicles
            across Iloilo.
          </p>

        </div>

        {/* =========================
            Form
        ========================= */}

        <form className="mt-8 space-y-5">

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <div className="relative">

              <FaEnvelope
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-orange-400
                "
              />

              <input
                type="email"
                placeholder="you@example.com"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  py-3.5
                  pl-11
                  pr-4
                  text-gray-800
                  outline-none
                  transition
                  focus:border-orange-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-orange-100
                "
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="
                  text-sm
                  font-semibold
                  text-orange-500
                  hover:text-orange-600
                "
              >
                Forgot password?
              </Link>

            </div>

            <div className="relative">

              <FaLock
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-orange-400
                "
              />

              <input
                type="password"
                placeholder="Enter your password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  py-3.5
                  pl-11
                  pr-4
                  text-gray-800
                  outline-none
                  transition
                  focus:border-orange-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-orange-100
                "
              />

            </div>

          </div>

          {/* Login */}

          <button
            type="submit"
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-orange-500
              py-4
              font-bold
              text-white
              shadow-lg
              shadow-orange-200
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-orange-600
              hover:shadow-xl
            "
          >
            <span>
              Sign In
            </span>

            <FaArrowRight
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </button>

        </form>

        {/* =========================
            Register
        ========================= */}

        <div className="mt-8 border-t border-gray-100 pt-7 text-center">

          <p className="text-sm text-gray-500">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="
              mt-2
              inline-flex
              items-center
              gap-2
              font-bold
              text-orange-500
              transition
              hover:text-orange-600
            "
          >
            Create your account
            <FaArrowRight className="text-xs" />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default LoginForm;