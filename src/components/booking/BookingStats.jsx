import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaArrowUp,
} from "react-icons/fa";

function BookingStats({
  pending,
  approved,
  rejected,
  total,
  onStatusSelect,
}) {
  const stats = [
    {
      title: "Pending",
      value: pending,
      subtitle: "Awaiting your response",
      status: "Pending",
      icon: FaClock,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      valueColor: "text-orange-600",
      cardBg:
        "bg-gradient-to-br from-orange-50 via-white to-amber-50",
      borderColor: "border-orange-100",
      hoverColor: "hover:border-orange-200",
    },

    {
      title: "Approved",
      value: approved,
      subtitle: "Confirmed bookings",
      status: "Approved",
      icon: FaCheckCircle,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
      valueColor: "text-emerald-600",
      cardBg:
        "bg-gradient-to-br from-emerald-50 via-white to-green-50",
      borderColor: "border-emerald-100",
      hoverColor: "hover:border-emerald-200",
    },

    {
      title: "Rejected",
      value: rejected,
      subtitle: "Declined requests",
      status: "Rejected",
      icon: FaTimesCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      valueColor: "text-rose-600",
      cardBg:
        "bg-gradient-to-br from-rose-50 via-white to-pink-50",
      borderColor: "border-rose-100",
      hoverColor: "hover:border-rose-200",
    },

    {
      title: "Total Requests",
      value: total,
      subtitle: "All time requests",
      status: "All",
      icon: FaCalendarAlt,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      valueColor: "text-violet-700",
      cardBg:
        "bg-gradient-to-br from-violet-50 via-white to-purple-50",
      borderColor: "border-violet-100",
      hoverColor: "hover:border-violet-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-8 lg:grid-cols-4 lg:gap-5">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <button
            key={stat.title}
            type="button"
            onClick={() => onStatusSelect(stat.status)}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              ${stat.borderColor}
              ${stat.hoverColor}
              ${stat.cardBg}
              p-5
              text-left
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              focus:outline-none
              focus:ring-4
              focus:ring-purple-100
              active:scale-[0.98]
              sm:p-6
            `}
          >

            {/* Decorative glow */}

            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-white/50
                blur-2xl
                transition-transform
                duration-500
                group-hover:scale-150
              "
            />

            {/* Top row */}

            <div className="relative flex items-start justify-between gap-3">

              {/* Icon */}

              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  ${stat.iconBg}
                  ${stat.iconColor}
                  shadow-sm
                `}
              >
                <Icon className="text-xl" />
              </div>

              {/* Live indicator */}

              <div
                className="
                  hidden
                  items-center
                  gap-1
                  rounded-full
                  bg-white/70
                  px-2.5
                  py-1
                  text-xs
                  font-semibold
                  text-gray-500
                  sm:flex
                "
              >
                <FaArrowUp className="text-[10px]" />
                <span>Live</span>
              </div>

            </div>

            {/* Content */}

            <div className="relative mt-5">

              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <p
                className={`
                  mt-1
                  text-3xl
                  font-extrabold
                  tracking-tight
                  ${stat.valueColor}
                  sm:text-4xl
                `}
              >
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                {stat.subtitle}
              </p>

            </div>

          </button>
        );
      })}

    </div>
  );
}

export default BookingStats;