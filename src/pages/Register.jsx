import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 text-white items-center justify-center p-16">

        <div className="max-w-lg">

          <h1 className="text-6xl font-bold leading-tight">
            Join RentACar
          </h1>

          <p className="mt-8 text-xl text-blue-100 leading-9">
            Create an account and start renting or listing
            vehicles across Iloilo Province.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center justify-center bg-gray-100 p-8">

        <RegisterForm />

      </div>

    </div>
  );
}

export default Register;