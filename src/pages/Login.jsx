import { useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(e) {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/list-car");

    } catch (error) {

      alert(error.message);

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
  <h1 className="text-3xl font-bold">
    Rent<span className="text-blue-600">ACar</span>
  </h1>
</div>
<Link
  to="/"
  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition"
>
  <FaArrowLeft />
  Back to Home
</Link>
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 mb-8">
          Login to your RentACar account.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border rounded-xl p-4 mb-6"
          />
<div className="flex justify-end mb-6">
  <button
    type="button"
    className="text-sm text-blue-600 hover:underline"
  >
    Forgot Password?
  </button>
</div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition"
          >
            Login
          </button>
<div className="text-center mt-6">
  <p className="text-gray-500">
    Don't have an account?
  </p>

  <Link
  to="/register"
  className="text-blue-600 hover:underline font-semibold"
>
  Create one
</Link>
</div>
        </form>

      </div>

    </div>

  );

}

export default Login;