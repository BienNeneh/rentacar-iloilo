import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          flex
          justify-between
          items-center
          p-6
          text-left
          font-semibold
          text-lg
        "
      >
        {faq.question}

        {open ? (
          <FaChevronUp className="text-blue-600" />
        ) : (
          <FaChevronDown className="text-blue-600" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-6 text-gray-600 leading-8">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default FAQItem;