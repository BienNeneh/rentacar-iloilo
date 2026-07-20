import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {

  e.preventDefault();

  console.log("Signup button clicked!");

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created successfully!");

  } catch (error) {

    console.log(error);
    alert(error.message);

  }


  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 mb-8">
          Join RentCar today.
        </p>

        <form onSubmit={handleSignup}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-4 rounded-xl mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border p-4 rounded-xl mb-6"
          />

          <button
  type="button"
  onClick={() => console.log("BUTTON WORKS!")}
  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
>
  Create Account
</button>

        </form>

      </div>

    </div>

  );

}

export default Signup;