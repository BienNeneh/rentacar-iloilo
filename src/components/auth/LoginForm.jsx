import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

      <h2 className="text-4xl font-bold">
        Sign In
      </h2>

      <p className="text-gray-500 mt-3">
        Welcome back! Please sign in to continue.
      </p>

      <form className="mt-10 space-y-6">

        <div>

          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            placeholder="********"
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

        </div>

        <button
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            rounded-xl
            font-semibold
            transition
          "
        >
          Sign In
        </button>

      </form>

      <p className="text-center mt-8 text-gray-500">

        Don't have an account?

        <Link
          to="/register"
          className="text-blue-600 font-semibold ml-2"
        >
          Sign Up
        </Link>

      </p>

    </div>
  );
}

export default LoginForm;