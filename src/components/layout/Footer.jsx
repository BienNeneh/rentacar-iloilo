import {
  FaCar,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-3">

            <FaCar className="text-3xl text-blue-400" />

            <div>

              <h2 className="text-2xl font-bold">
                RentACar
              </h2>

              <p className="text-sm text-gray-400">
                Iloilo Province
              </p>

            </div>

          </div>

          <p className="mt-6 text-gray-400 leading-8">
            Connecting trusted car owners with verified
            renters across Iloilo Province.
          </p>

          <div className="flex gap-4 mt-6 text-2xl">

            <FaFacebook className="hover:text-blue-400 cursor-pointer transition" />

            <FaInstagram className="hover:text-pink-400 cursor-pointer transition" />

            <FaEnvelope className="hover:text-yellow-300 cursor-pointer transition" />

          </div>

        </div>

        {/* Platform */}

        <div>

          <h3 className="font-bold text-xl mb-6">
            Platform
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white cursor-pointer">
              Browse Cars
            </li>

            <li className="hover:text-white cursor-pointer">
              Become a Host
            </li>

            <li className="hover:text-white cursor-pointer">
              How It Works
            </li>

            <li className="hover:text-white cursor-pointer">
              FAQ
            </li>

          </ul>

        </div>

        {/* Areas */}

        <div>

          <h3 className="font-bold text-xl mb-6">
            Popular Areas
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>Iloilo City</li>

            <li>Pavia</li>

            <li>Oton</li>

            <li>Santa Barbara</li>

            <li>Leganes</li>

            <li>Cabatuan</li>

          </ul>

        </div>

        {/* Support */}

        <div>

          <h3 className="font-bold text-xl mb-6">
            Support
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white cursor-pointer">
              Contact Us
            </li>

            <li className="hover:text-white cursor-pointer">
              Privacy Policy
            </li>

            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>

            <li className="hover:text-white cursor-pointer">
              Help Center
            </li>

          </ul>

        </div>

      </div>

      <div className="border-t border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">
            © 2026 RentACar Iloilo. All Rights Reserved.
          </p>

          <p className="text-gray-500 mt-4 md:mt-0">
            Made with ❤️ in Iloilo Province
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;