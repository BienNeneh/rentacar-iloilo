import { useState } from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { FaArrowLeft } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // ==========================================
      // SIGN IN
      // ==========================================

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // ==========================================
      // EMAIL VERIFICATION CHECK
      // ==========================================

      if (!user.emailVerified) {
        /*
         * IMPORTANT:
         *
         * DO NOT sign the user out here.
         *
         * VerifyEmail.jsx needs the Firebase session
         * so it can reload the user and check whether
         * the email has been verified.
         */

        navigate("/verify-email", {
          replace: true,
          state: {
            email: user.email,
          },
        });

        return;
      }

      // ==========================================
      // VERIFIED USER
      // ==========================================

      toast.success("Welcome back!");

      navigate("/list-car", {
        replace: true,
      });

    } catch (error) {
      console.error("Login Error:", error);

      // ==========================================
      // FIREBASE LOGIN ERRORS
      // ==========================================

      if (
        error.code === "auth/invalid-credential"
      ) {
        toast.error(
          "Incorrect email or password."
        );

      } else if (
        error.code === "auth/user-not-found"
      ) {
        toast.error(
          "No account found with this email."
        );

      } else if (
        error.code === "auth/wrong-password"
      ) {
        toast.error(
          "Incorrect password."
        );

      } else if (
        error.code === "auth/too-many-requests"
      ) {
        toast.error(
          "Too many login attempts. Please try again later."
        );

      } else {
        toast.error(
          "Unable to sign in. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8ED] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* ==========================================
            BRAND
        ========================================== */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            Rent<span className="text-orange-500">ACar</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Iloilo Community Car Rental
          </p>

        </div>

        {/* ==========================================
            LOGIN CARD
        ========================================== */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-orange-100
          p-8
          sm:p-10
        ">

          {/* Back to Home */}

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              text-orange-500
              hover:text-orange-600
              font-medium
              mb-8
              transition
            "
          >
            <FaArrowLeft />
            Back to Home
          </Link>

          {/* Header */}

          <h2 className="
            text-4xl
            font-bold
            text-gray-900
          ">
            Welcome Back
          </h2>

          <p className="
            text-gray-500
            mt-3
          ">
            Sign in and get back on the road.
          </p>

          {/* ==========================================
              FORM
          ========================================== */}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-6"
          >

            {/* Email */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  border
                  border-gray-200
                  bg-gray-50
                  rounded-xl
                  px-4
                  py-4
                  outline-none
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-100
                  transition
                "
                required
              />

            </div>

            {/* Password */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  border
                  border-gray-200
                  bg-gray-50
                  rounded-xl
                  px-4
                  py-4
                  outline-none
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-100
                  transition
                "
                required
              />

            </div>

            {/* Forgot Password */}

            <div className="flex justify-end">

              <button
                type="button"
                className="
                  text-sm
                  text-orange-500
                  hover:text-orange-600
                  font-medium
                "
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full
                py-4
                rounded-xl
                font-semibold
                text-white
                transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl"
                }
              `}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

          {/* Register */}

          <div className="text-center mt-8">

            <p className="text-gray-500">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="
                inline-block
                mt-1
                text-orange-500
                hover:text-orange-600
                font-semibold
              "
            >
              Create one
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;