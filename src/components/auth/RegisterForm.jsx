import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { auth, db } from "../../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  reload,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  FaCar,
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowLeft,
  FaCheckCircle,
  FaRedo,
} from "react-icons/fa";

function RegisterForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [checkingVerification, setCheckingVerification] =
    useState(false);

  const [createdEmail, setCreatedEmail] = useState("");

  // =========================
  // Register
  // =========================

  async function handleRegister(e) {
    e.preventDefault();

    if (loading) return;

    // Basic validation
    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // =========================
      // Create Firebase Account
      // =========================

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const user = userCredential.user;

      // =========================
      // Save Display Name
      // =========================

      await updateProfile(user, {
        displayName: fullName.trim(),
      });

      // =========================
      // Save User to Firestore
      // =========================

      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: fullName.trim(),
          email: user.email,
          createdAt: serverTimestamp(),
        }
      );

      // =========================
      // Send Verification Email
      // =========================

      await sendEmailVerification(user);

      setCreatedEmail(user.email);
      setVerificationSent(true);

      toast.success("Verification email sent!");

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Your password is too weak.");
      } else {
        toast.error(
          error.message || "Something went wrong."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // Resend Verification Email
  // =========================

  async function resendVerificationEmail() {
    if (!auth.currentUser) {
      toast.error("Your session has expired. Please register again.");
      return;
    }

    if (resending) return;

    setResending(true);

    try {
      await sendEmailVerification(auth.currentUser);

      toast.success(
        "A new verification email has been sent!"
      );

    } catch (error) {
      console.error(
        "Resend Verification Error:",
        error
      );

      if (error.code === "auth/too-many-requests") {
        toast.error(
          "Too many requests. Please wait a moment before trying again."
        );
      } else {
        toast.error(
          "Unable to send verification email."
        );
      }
    } finally {
      setResending(false);
    }
  }

  // =========================
  // Check Verification
  // =========================

  async function checkVerification() {
    if (!auth.currentUser) {
      toast.error(
        "Your session has expired. Please sign in again."
      );
      return;
    }

    if (checkingVerification) return;

    setCheckingVerification(true);

    try {
      // Refresh Firebase user information
      await reload(auth.currentUser);

      if (auth.currentUser.emailVerified) {
        toast.success(
          "Email verified! Welcome to RentACar."
        );

        navigate("/list-car");
      } else {
        toast.error(
          "Your email is not verified yet. Please check your inbox."
        );
      }

    } catch (error) {
      console.error(
        "Verification Check Error:",
        error
      );

      toast.error(
        "Unable to check verification status."
      );
    } finally {
      setCheckingVerification(false);
    }
  }

  // =========================
  // Leave Registration
  // =========================

  async function handleBackToLogin() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }

    navigate("/login");
  }

  // =========================
  // Verification Screen
  // =========================

  if (verificationSent) {
    return (
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-orange-100 p-8 sm:p-10">

        {/* Icon */}

        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center">

            <FaEnvelope className="text-3xl text-orange-500" />

          </div>

        </div>

        {/* Heading */}

        <div className="text-center">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>

          <p className="mt-4 text-gray-500 leading-7">
            We've sent a verification link to:
          </p>

          <p className="mt-2 font-bold text-orange-600 break-all">
            {createdEmail}
          </p>

        </div>

        {/* Instructions */}

        <div className="mt-8 rounded-2xl bg-orange-50 border border-orange-100 p-5">

          <div className="flex gap-3">

            <FaCheckCircle className="text-orange-500 mt-1 shrink-0" />

            <div>

              <p className="font-semibold text-gray-800">
                Check your inbox
              </p>

              <p className="text-sm text-gray-600 mt-1 leading-6">
                Open the email from RentACar and click
                the verification link to verify your
                email address.
              </p>

            </div>

          </div>

        </div>

        {/* Check Button */}

        <button
          type="button"
          onClick={checkVerification}
          disabled={checkingVerification}
          className={`
            w-full
            mt-8
            py-4
            rounded-xl
            font-bold
            text-white
            transition
            shadow-lg
            ${
              checkingVerification
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }
          `}
        >
          {checkingVerification
            ? "Checking..."
            : "I've Verified My Email"}
        </button>

        {/* Resend */}

        <button
          type="button"
          onClick={resendVerificationEmail}
          disabled={resending}
          className="
            w-full
            mt-3
            py-3
            rounded-xl
            font-semibold
            text-orange-600
            bg-orange-50
            hover:bg-orange-100
            transition
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <FaRedo />

          {resending
            ? "Sending..."
            : "Resend Verification Email"}
        </button>

        {/* Back */}

        <button
          type="button"
          onClick={handleBackToLogin}
          className="
            w-full
            mt-6
            text-gray-500
            hover:text-gray-800
            font-medium
            transition
          "
        >
          ← Back to Login
        </button>

      </div>
    );
  }

  // =========================
  // Registration Form
  // =========================

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-orange-100 p-8 sm:p-10">

      {/* Header */}

      <div className="mb-8">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">

            <FaCar className="text-orange-500 text-lg" />

          </div>

          <div>

            <h1 className="text-xl font-extrabold text-gray-900">
              Rent<span className="text-orange-500">ACar</span>
            </h1>

            <p className="text-xs text-gray-400">
              Iloilo Community Car Rental
            </p>

          </div>

        </div>

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-orange-500
            hover:text-orange-600
            font-semibold
            text-sm
            transition
          "
        >
          <FaArrowLeft />
          Back to Home
        </Link>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-8">
          Create Your Account
        </h2>

        <p className="text-gray-500 mt-3">
          Join the Iloilo community and start your journey.
        </p>

      </div>

      {/* Form */}

      <form
        onSubmit={handleRegister}
        className="space-y-5"
      >

        {/* Full Name */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Full Name
          </label>

          <div className="relative">

            <FaUser
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Juan Dela Cruz"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-xl
                pl-11
                pr-4
                py-3.5
                outline-none
                focus:bg-white
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                transition
              "
              required
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </label>

          <div className="relative">

            <FaEnvelope
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="email"
              placeholder="juan@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-xl
                pl-11
                pr-4
                py-3.5
                outline-none
                focus:bg-white
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                transition
              "
              required
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>

          <div className="relative">

            <FaLock
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-xl
                pl-11
                pr-4
                py-3.5
                outline-none
                focus:bg-white
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                transition
              "
              required
            />

          </div>

        </div>

        {/* Confirm Password */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Confirm Password
          </label>

          <div className="relative">

            <FaLock
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-xl
                pl-11
                pr-4
                py-3.5
                outline-none
                focus:bg-white
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                transition
              "
              required
            />

          </div>

        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full
            py-4
            rounded-xl
            font-bold
            text-white
            transition
            shadow-lg
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5"
            }
          `}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

      {/* Login */}

      <p className="text-center mt-8 text-gray-500">

        Already have an account?

        <Link
          to="/login"
          className="
            text-orange-500
            hover:text-orange-600
            font-bold
            ml-2
          "
        >
          Sign In
        </Link>

      </p>

    </div>
  );
}

export default RegisterForm;