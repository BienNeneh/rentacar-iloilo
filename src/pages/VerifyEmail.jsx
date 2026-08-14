import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  sendEmailVerification,
  reload,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

import {
  FaEnvelope,
  FaCheckCircle,
  FaRedo,
  FaArrowLeft,
} from "react-icons/fa";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  // ==========================================
  // GET USER EMAIL
  // ==========================================

  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser.email || "");
    } else if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  // ==========================================
  // CHECK EMAIL VERIFICATION
  // ==========================================

  async function handleCheckVerification() {
    const currentUser = auth.currentUser;

    // ------------------------------------------
    // NO CURRENT USER
    // ------------------------------------------

    if (!currentUser) {
      toast.error(
        "We couldn't find your account session. Please log in again.",
        {
          id: "verification-session-error",
        }
      );

      return;
    }

    if (checking) return;

    setChecking(true);

    try {
      // Refresh the Firebase user information
      await reload(currentUser);

      // ------------------------------------------
      // EMAIL NOT VERIFIED
      // ------------------------------------------

      if (!currentUser.emailVerified) {
        toast.error(
          "Your email hasn't been verified yet. Please click the verification link we sent to your inbox.",
          {
            id: "email-not-verified",
          }
        );

        return;
      }

      // ------------------------------------------
      // EMAIL VERIFIED
      // ------------------------------------------

      toast.success(
        "Your email has been verified successfully!",
        {
          id: "email-verified-success",
        }
      );

      // Give the success toast a moment to appear
      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 700);

    } catch (error) {
      console.error(
        "Verification Check Error:",
        error
      );

      toast.error(
        "Unable to check your verification status. Please try again.",
        {
          id: "verification-check-error",
        }
      );

    } finally {
      setChecking(false);
    }
  }

  // ==========================================
  // RESEND VERIFICATION EMAIL
  // ==========================================

  async function handleResendVerification() {
    const currentUser = auth.currentUser;

    // ------------------------------------------
    // NO CURRENT USER
    // ------------------------------------------

    if (!currentUser) {
      toast.error(
        "We couldn't find your account session. Please log in again.",
        {
          id: "resend-session-error",
        }
      );

      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      await sendEmailVerification(currentUser);

      toast.success(
        "Verification email sent again! Check your inbox or spam folder.",
        {
          id: "verification-email-sent",
        }
      );

    } catch (error) {
      console.error(
        "Resend Verification Error:",
        error
      );

      // Too many verification emails
      if (
        error.code ===
        "auth/too-many-requests"
      ) {
        toast.error(
          "Too many requests. Please wait a little before trying again.",
          {
            id: "verification-too-many-requests",
          }
        );

      } else {

        toast.error(
          "Unable to resend the verification email. Please try again.",
          {
            id: "verification-resend-error",
          }
        );
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="
      min-h-screen
      bg-[#FFF8ED]
      flex
      items-center
      justify-center
      px-6
      py-12
    ">

      <div className="w-full max-w-lg">

        {/* ==========================================
            VERIFICATION CARD
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

          {/* ==========================================
              ICON
          ========================================== */}

          <div className="flex justify-center mb-8">

            <div className="
              w-20
              h-20
              rounded-3xl
              bg-orange-100
              flex
              items-center
              justify-center
            ">

              <FaEnvelope
                className="
                  text-4xl
                  text-orange-500
                "
              />

            </div>

          </div>

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="text-center">

            <h1 className="
              text-4xl
              font-bold
              text-gray-900
            ">
              Verify Your Email
            </h1>

            <p className="
              text-gray-500
              mt-4
            ">
              We've sent a verification link to:
            </p>

            <p className="
              text-orange-500
              font-bold
              mt-2
              break-all
            ">
              {email || "your email address"}
            </p>

          </div>

          {/* ==========================================
              INFORMATION BOX
          ========================================== */}

          <div className="
            mt-8
            bg-orange-50
            border
            border-orange-100
            rounded-2xl
            p-5
          ">

            <div className="flex gap-4">

              <FaCheckCircle
                className="
                  text-orange-500
                  text-xl
                  mt-1
                  flex-shrink-0
                "
              />

              <div>

                <h2 className="
                  font-semibold
                  text-gray-900
                ">
                  Check your inbox
                </h2>

                <p className="
                  text-gray-600
                  mt-2
                  leading-7
                ">
                  Open the email from RentACar
                  and click the verification
                  link to verify your email address.
                </p>

                <p className="
                  text-sm
                  text-gray-500
                  mt-3
                ">
                  Don't see it? Check your spam
                  or junk folder.
                </p>

              </div>

            </div>

          </div>

          {/* ==========================================
              CHECK VERIFICATION BUTTON
          ========================================== */}

          <button
            type="button"
            onClick={handleCheckVerification}
            disabled={checking}
            className={`
              w-full
              mt-8
              py-4
              rounded-xl
              font-semibold
              text-white
              transition
              ${
                checking
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 shadow-lg"
              }
            `}
          >

            {checking
              ? "Checking..."
              : "I've Verified My Email"}

          </button>

          {/* ==========================================
              RESEND VERIFICATION
          ========================================== */}

          <button
            type="button"
            onClick={handleResendVerification}
            disabled={loading}
            className="
              w-full
              mt-3
              py-4
              rounded-xl
              font-semibold
              text-orange-500
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

            {loading
              ? "Sending..."
              : "Resend Verification Email"}

          </button>

          {/* ==========================================
              BACK TO LOGIN
          ========================================== */}

          <div className="
            text-center
            mt-8
          ">

            <Link
              to="/login"
              className="
                inline-flex
                items-center
                gap-2
                text-gray-500
                hover:text-orange-500
                transition
              "
            >

              <FaArrowLeft />

              Back to Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VerifyEmail;