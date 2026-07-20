import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import {
    FaEdit,
    FaCalendarAlt,
    FaClipboardList,
    FaTrash,
} from "react-icons/fa";

const actions = [
    {
        id: "edit",
        title: "Edit Listing",
        description: "Update vehicle information",
        icon: <FaEdit className="text-3xl text-blue-600" />,
        bg: "hover:border-blue-500",
    },
    {
        id: "availability",
        title: "Availability",
        description: "Manage rental schedule",
        icon: <FaCalendarAlt className="text-3xl text-green-600" />,
        bg: "hover:border-green-500",
    },
    {
        id: "bookings",
        title: "Bookings",
        description: "View booking requests",
        icon: <FaClipboardList className="text-3xl text-yellow-500" />,
        bg: "hover:border-yellow-500",
    },
    {
        id: "delete",
        title: "Delete Listing",
        description: "Permanent action",
        icon: <FaTrash className="text-3xl text-red-600" />,
        bg: "hover:border-red-500",
    },
];

function OwnerActions({ car }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-car/${car.id}`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to permanently delete this listing?"
        );

        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "cars", car.id));

            alert("Listing deleted successfully!");

            navigate("/my-cars");
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    const handleAction = (id) => {
        switch (id) {
            case "edit":
                handleEdit();
                break;

           case "availability":
    navigate(`/availability/${car.id}`);
    break;

            case "bookings":
                console.log("Bookings clicked");
                break;

            case "delete":
                handleDelete();
                break;

            default:
                console.warn(`Unknown action: ${id}`);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8">
                ⚡ Quick Actions
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        onClick={() => handleAction(action.id)}
                        className={`
                            text-left
                            border-2
                            border-transparent
                            rounded-3xl
                            p-6
                            transition-all
                            duration-300
                            hover:shadow-xl
                            hover:-translate-y-2
                            ${action.bg}
                        `}
                    >
                        {action.icon}

                        <h3 className="font-bold text-xl mt-5">
                            {action.title}
                        </h3>

                        <p className="text-gray-500 mt-2">
                            {action.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default OwnerActions;