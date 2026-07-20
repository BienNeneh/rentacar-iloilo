import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaTag } from "react-icons/fa";

function ManageHeader({ car }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex justify-between items-center">

                <button
                    onClick={() => navigate("/my-cars")}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                >
                    <FaArrowLeft />
                    Back to My Cars
                </button>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
                    <FaCheckCircle />
                    Available
                </span>

            </div>

            <div className="mt-8 flex justify-between items-end">

                <div>

                    <h1 className="text-5xl font-extrabold">
                        {car.brand} {car.model}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your listing information
                    </p>

                </div>

                <div className="text-right">

                    <div className="flex items-center justify-end gap-2 text-blue-600">

                        <FaTag />

                        <span className="text-5xl font-bold">
                            ₱{Number(car.price).toLocaleString()}
                        </span>

                    </div>

                    <p className="text-gray-500 text-xl">
                        per day
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ManageHeader;