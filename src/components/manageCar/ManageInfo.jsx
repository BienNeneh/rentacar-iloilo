import {
    FaCalendarAlt,
    FaGasPump,
    FaUsers,
    FaCog,
    FaMoneyBillWave,
    FaFileAlt,
} from "react-icons/fa";

function ManageInfo({ car }) {

    return (
<div className="bg-white rounded-3xl shadow-xl p-8">

    <h2 className="text-3xl font-bold mb-8">
        🚗 Vehicle Details
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

        <InfoRow
            icon={<FaCalendarAlt className="text-blue-500" />}
            label="Year"
            value={car.year}
        />

        <InfoRow
            icon={<FaCog className="text-purple-500" />}
            label="Transmission"
            value={car.transmission}
        />

        <InfoRow
            icon={<FaGasPump className="text-green-500" />}
            label="Fuel"
            value={car.fuelType}
        />

        <InfoRow
            icon={<FaUsers className="text-orange-500" />}
            label="Seats"
            value={car.seats}
        />

        <InfoRow
            icon={<FaMoneyBillWave className="text-emerald-500" />}
            label="Price"
            value={`₱${car.price}/day`}
        />

    </div>

  <div className="mt-10">
    <h3 className="flex items-center gap-3 text-xl font-semibold mb-4">
        <FaFileAlt />
        Description
    </h3>

    <div className="bg-gray-50 rounded-2xl p-6">
        <p className="text-gray-700 leading-8">
            {car.description}
        </p>
    </div>
</div>

</div>
    );

}
function InfoRow({ icon, label, value }) {

    return (

        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">

            <div className="flex items-center gap-3">

                {icon}

                <span className="font-semibold">
                    {label}
                </span>

            </div>

            <span className="text-lg font-bold text-gray-800">
    {value}
</span>

        </div>

    );

}

export default ManageInfo;