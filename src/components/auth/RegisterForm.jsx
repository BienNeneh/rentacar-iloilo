import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (loading) return;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      // Save display name to Firebase Authentication
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Save additional user information to Firestore
      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          fullName,
          email,
          createdAt: serverTimestamp(),
        }
      );

    toast.success("Account created successfully!");

      // Optional: Clear the form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Optional later:
      // navigate("/dashboard");

    } catch (error) {
      console.error(error);

     if (error.code === "auth/email-already-in-use") {
  toast.error("This email is already registered.");
} else {
  toast.error(error.message);
}
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">
      <h2 className="text-4xl font-bold">
        Create Account
      </h2>

      <p className="text-gray-500 mt-3">
        Join the Iloilo community today.
      </p>

      <form
        onSubmit={handleRegister}
        className="mt-8 space-y-5"
      >
        <div>
          <label className="block mb-2 font-semibold">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Juan Dela Cruz"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            placeholder="juan@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-8 text-gray-500">
        Already have an account?

        <Link
          to="/login"
          className="text-blue-600 font-semibold ml-2"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;