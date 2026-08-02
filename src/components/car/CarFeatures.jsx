import { FaCheckCircle } from "react-icons/fa";

function CarFeatures() {
  return (
    <>
      <h2 className="text-2xl font-bold mt-10 mb-5">
        Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-500" />
          Air Conditioning
        </div>

        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-500" />
          Bluetooth
        </div>

        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-500" />
          USB Charging
        </div>

        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-500" />
          Reverse Camera
        </div>

      </div>
    </>
  );
}

export default CarFeatures;