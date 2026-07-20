import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";

function TestimonialCard({ testimonial }) {
  return (
    <div
      className="
      relative
      bg-white
      rounded-3xl
      p-8
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      overflow-hidden
      "
    >
      {/* Quote Icon */}

      <FaQuoteLeft
        className="
        absolute
        top-6
        right-6
        text-blue-100
        text-5xl
      "
      />

      {/* User */}

      <div className="flex items-center gap-4">

        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="
            w-16
            h-16
            rounded-full
            object-cover
            border-4
            border-blue-100
          "
        />

        <div>

          <h3 className="font-bold text-lg flex items-center gap-2">

            {testimonial.name}

            <FaCheckCircle className="text-blue-500 text-sm" />

          </h3>

          <p className="text-gray-500">
            {testimonial.city}
          </p>

        </div>

      </div>

      {/* Stars */}

      <div className="flex mt-6 gap-1 text-yellow-400">

        {[...Array(testimonial.rating)].map((_, index) => (
          <FaStar key={index} />
        ))}

      </div>

      {/* Review */}

      <p
        className="
        mt-6
        text-gray-600
        leading-8
        italic
      "
      >
        "{testimonial.comment}"
      </p>

      {/* Bottom */}

      <div
        className="
        mt-8
        flex
        justify-between
        items-center
      "
      >

        <span
          className="
          bg-green-100
          text-green-700
          px-3
          py-1
          rounded-full
          text-sm
          font-semibold
        "
        >
          Verified Rental
        </span>

        <span className="text-gray-400 text-sm">

          {testimonial.date}

        </span>

      </div>
    </div>
  );
}

export default TestimonialCard;