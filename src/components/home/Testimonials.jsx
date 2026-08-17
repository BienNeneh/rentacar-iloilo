function Testimonials() {
  const benefits = [
    {
      number: "01",
      title: "Built for Iloilo",
      description:
        "A community-focused car rental platform designed specifically for people looking for vehicles across Iloilo Province.",
    },
    {
      number: "02",
      title: "Choose From Local Cars",
      description:
        "Browse vehicles shared by car owners in the local community and find one that fits your trip and budget.",
    },
    {
      number: "03",
      title: "Simple Booking",
      description:
        "Find a vehicle, choose your dates, send a booking request, and coordinate directly with the car owner.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mx-auto max-w-3xl text-center">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-200
              bg-orange-50
              px-4
              py-2
              text-sm
              font-bold
              uppercase
              tracking-widest
              text-orange-600
            "
          >
            <span className="h-2 w-2 rounded-full bg-orange-500" />

            Why RentAcar?
          </div>

          <h2
            className="
              mt-6
              text-4xl
              font-extrabold
              tracking-tight
              text-[#2F2F2F]
              sm:text-5xl
            "
          >
            A Better Way to
            <span className="block text-orange-500">
              Rent a Car in Iloilo.
            </span>
          </h2>

          <p
            className="
              mt-5
              text-lg
              leading-8
              text-gray-500
            "
          >
            RentAcar connects renters with vehicle owners in the local
            community, making it easier to find a car for your next trip
            around Iloilo.
          </p>

        </div>

        {/* =========================
            BENEFITS
        ========================= */}

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="
                group
                rounded-3xl
                border
                border-gray-100
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >

              {/* Number */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-orange-50
                  text-sm
                  font-black
                  text-orange-500
                  transition
                  group-hover:bg-orange-500
                  group-hover:text-white
                "
              >
                {benefit.number}
              </div>

              {/* Title */}

              <h3
                className="
                  mt-6
                  text-2xl
                  font-bold
                  text-[#2F2F2F]
                "
              >
                {benefit.title}
              </h3>

              {/* Description */}

              <p
                className="
                  mt-4
                  leading-7
                  text-gray-500
                "
              >
                {benefit.description}
              </p>

            </div>
          ))}

        </div>

        {/* =========================
            BOTTOM MESSAGE
        ========================= */}

        <div
          className="
            mx-auto
            mt-14
            max-w-3xl
            text-center
          "
        >
          <p className="text-sm font-medium text-gray-400">
            More local vehicles and community members will be joining
            RentAcar as the platform grows.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;