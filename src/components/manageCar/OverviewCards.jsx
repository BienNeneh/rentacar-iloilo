import {
    FaEye,
    FaHeart,
    FaCalendarAlt,
    FaMoneyBillWave,
} from "react-icons/fa";

const cards = [
    {
        title: "Views",
        value: "0",
        icon: <FaEye className="text-3xl text-blue-600" />,
    },
    {
        title: "Favorites",
        value: "0",
        icon: <FaHeart className="text-3xl text-red-500" />,
    },
    {
        title: "Bookings",
        value: "0",
        icon: <FaCalendarAlt className="text-3xl text-green-600" />,
    },
    {
        title: "Earnings",
        value: "₱0",
        icon: <FaMoneyBillWave className="text-3xl text-yellow-500" />,
    },
];

function OverviewCards() {

    return (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="bg-white rounded-3xl shadow-xl p-8"
                >

                    <div className="flex justify-between items-center">

                        {card.icon}

                        <span className="text-3xl font-bold">
                            {card.value}
                        </span>

                    </div>

                    <p className="text-gray-500 mt-5">
                        {card.title}
                    </p>

                </div>

            ))}

        </div>

    );
}

export default OverviewCards;