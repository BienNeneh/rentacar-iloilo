import { FaUserCircle } from "react-icons/fa";

function HostCard({ ownerName, ownerEmail }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl mt-10 p-5 md:p-8">

      <h2 className="text-3xl font-bold mb-8">
        Host
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">

        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <FaUserCircle className="text-6xl text-blue-500" />
        </div>

        <div>

          <h3 className="text-2xl font-bold">
            {ownerName || "Car Owner"}
          </h3>

          <p className="text-gray-500 mt-1">
            ✔ Verified Host
          </p>

          <p className="text-gray-500">
            💬 Usually responds within 30 minutes
          </p>

          <p className="text-gray-500">
            📧 {ownerEmail || "Email unavailable"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default HostCard;