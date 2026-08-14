function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-orange-100
        bg-white
        p-8
        text-center
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* Decorative glow */}
      <div
        className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-orange-100/50
          blur-2xl
          transition-transform
          duration-500
          group-hover:scale-150
        "
      />

      {/* Icon */}

      <div
        className="
          relative
          mx-auto
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          border
          border-orange-200
          bg-orange-50
          shadow-sm
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:bg-orange-100
        "
      >
        <Icon
          className="
            text-4xl
            text-orange-500
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />
      </div>

      {/* Title */}

      <h3
        className="
          relative
          text-2xl
          font-extrabold
          tracking-tight
          text-gray-900
        "
      >
        {feature.title}
      </h3>

      {/* Description */}

      <p
        className="
          relative
          mt-4
          leading-7
          text-gray-500
        "
      >
        {feature.description}
      </p>

    </div>
  );
}

export default FeatureCard;