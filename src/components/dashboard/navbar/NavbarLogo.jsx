import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";

function NavbarLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
        <FaCarSide className="text-orange-500 text-2xl" />
      </div>

      <div>
        <h1 className="text-xl md:text-2xl font-black text-[#3A2A27]">
          Rent<span className="text-orange-500">ACar</span>
        </h1>

        <p className="hidden sm:block text-xs text-gray-500">
          Iloilo Community Car Rental
        </p>
      </div>
    </Link>
  );
}

export default NavbarLogo;