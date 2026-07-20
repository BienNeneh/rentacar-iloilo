function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-8
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
        text-center
      "
    >
      <div
        className="
          w-20
          h-20
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          mx-auto
          mb-6
        "
      >
        <Icon className="text-4xl text-blue-600" />
      </div>

      <h3 className="text-2xl font-bold mb-4">
        {feature.title}
      </h3>

      <p className="text-gray-500 leading-7">
        {feature.description}
      </p>
    </div>
  );
}

export default FeatureCard;