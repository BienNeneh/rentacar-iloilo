import faqs from "../../data/faqs";
import FAQItem from "../common/FAQItem";

function FAQ() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-500 text-center mt-4">
          Everything you need to know about renting or listing a vehicle.
        </p>

        <div className="mt-14 space-y-5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

export default FAQ;