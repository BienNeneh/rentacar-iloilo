import features from "../../data/features";
import FeatureCard from "../common/FeatureCard";

function WhyChooseUs() {
  return (
    <section className="py-28 bg-gray-50">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">
          Why Choose RentACar?
        </h2>

        <p className="text-xl text-gray-500 text-center mt-6 max-w-3xl mx-auto">
          The safest and easiest way to rent vehicles from trusted owners
          across Iloilo Province.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;