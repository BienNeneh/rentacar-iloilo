import {
  FaCheckCircle,
  FaCar,
  FaStar,
  FaClock,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaCar className="text-blue-600" />,
    title: "Toyota Vios rented",
    description: "John Dela Cruz booked your Toyota Vios.",
    time: "2 hours ago",
  },
  {
    icon: <FaCheckCircle className="text-green-600" />,
    title: "Payment Received",
    description: "You received ₱1,500 from Maria Santos.",
    time: "Yesterday",
  },
  {
    icon: <FaStar className="text-yellow-500" />,
    title: "New Review",
    description: "Your Toyota Fortuner received a 5-star rating.",
    time: "2 days ago",
  },
  {
    icon: <FaClock className="text-purple-600" />,
    title: "Upcoming Booking",
    description: "Toyota Fortuner will be picked up tomorrow.",
    time: "Tomorrow",
  },
];

function RecentActivity() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="bg-white rounded-2xl shadow-md divide-y">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-5">
              <div className="text-3xl">
                {activity.icon}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {activity.title}
                </h3>

                <p className="text-gray-500">
                  {activity.description}
                </p>
              </div>
            </div>

            <span className="text-sm text-gray-400">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentActivity;