import testimonials from "../../data/testimonials";
import TestimonialCard from "../common/TestimonialCard";

function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          What Our Customers Say
        </h2>

        <p className="text-gray-500 text-center mt-4">
          Trusted by drivers and car owners across Iloilo Province.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;