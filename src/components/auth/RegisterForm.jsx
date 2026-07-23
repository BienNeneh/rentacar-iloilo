import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase/firebase";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";


function RegisterForm() 


{

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [fullName, setFullName] = useState("");

async function handleRegister(e)

{
  ;
  e.preventDefault();
  console.log("Register button clicked!");
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
  const userCredential =
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

// Save the user's display name to Firebase Authentication
await updateProfile(userCredential.user, {
  displayName: fullName,
});

// Save additional user data to Firestore
await setDoc(
  doc(db, "users", userCredential.user.uid),
  {
    fullName,
    email,
    createdAt: serverTimestamp(),
  }
);

alert("Account created successfully!");

await setDoc(
  doc(db, "users", userCredential.user.uid),
  {
    fullName,
    email,
    createdAt: serverTimestamp(),
  }
);

alert("Account created successfully!");

  } catch (error) {
  console.log(error.code);
  console.log(error.message);

  alert(error.code);
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
/>
        </div>
<button
  type="submit"
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
          Create Account
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