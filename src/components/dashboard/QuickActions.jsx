import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUserEdit,
  FaArrowRight,
} from "react-icons/fa";

const actions = [
  {
    title: "Add New Car",
    description: "List another vehicle for rent.",
    icon: <FaPlusCircle />,
    color: "bg-blue-500",
  },
  {
    title: "Manage Bookings",
    description: "Approve or reject rental requests.",
    icon: <FaCalendarAlt />,
    color: "bg-green-500",
  },
  {
    title: "View Earnings",
    description: "Track your income and payouts.",
    icon: <FaMoneyBillWave />,
    color: "bg-yellow-500",
  },
  {
    title: "Edit Profile",
    description: "Update your account information.",
    icon: <FaUserEdit />,
    color: "bg-purple-500",
  },
];

function QuickActions() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <div
              className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mb-6`}
            >
              {action.icon}
            </div>

            <h3 className="text-xl font-bold">
              {action.title}
            </h3>

            <p className="text-gray-500 mt-2 mb-6">
              {action.description}
            </p>

            {action.title === "Add New Car" ? (
              <Link
                to="/add-car"
                className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Open
                <FaArrowRight />
              </Link>
            ) : (
              <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                Open
                <FaArrowRight />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;