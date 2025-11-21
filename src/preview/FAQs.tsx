import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span
          className="text-lg font-medium text-[#023E8A]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {question}
        </span>
        {isOpen ? (
          <ChevronUpIcon size={20} className="flex-shrink-0 text-[#023E8A]" />
        ) : (
          <ChevronDownIcon size={20} className="flex-shrink-0 text-[#023E8A]" />
        )}
      </button>
      <div
        className={`mt-2 text-[#023E8A] ${isOpen ? "block" : "hidden"}`}
        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 200 }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default function FAQs() {
  const faqs = [
    {
      question: "What is the main purpose of X-STREAM?",
      answer:
        "X-STREAM is designed to provide real-time river monitoring and early alerts to help disaster responders and local communities prepare for and respond quickly to possible flooding or river-related hazards.",
    },
    {
      question: "How does X-STREAM monitor river conditions?",
      answer:
        "The system uses solar-powered buoys equipped with sensors that measure rainfall, wind speed, temperature, humidity and water level. These sensors collect and send the data in real time.",
    },
    {
      question: "How is the data from X-STREAM accessed?",
      answer:
        "All sensor readings are sent wirelessly to Firebase, where the data is stored and updated in real time. It is then displayed through the X-STREAM web and mobile application, allowing users to view river conditions, and receives alerts anytime.",
    },
    {
      question: "How does X-STREAM send alerts during emergencies?",
      answer:
        "When dangerous river conditions are detected, the system can automatically send SMS notifications, activate alarms and lights on the buoy, and display alerts on the web and mobile dashboard to warn the disaster responders and users.",
    },
    {
      question: "How does the X-STREAM buoy stay powered?",
      answer:
        "It uses a solar panel connected to a 12V 28Ah battery, allowing continuous operation even in remote river areas without electricity, ensuring data transmission day and night.",
    },
    {
      question:
        "What makes X-STREAM different from existing monitoring systems?",
      answer:
        "Unlike traditional manual systems, X-STREAM provides real-time monitoring and sends instant alerts, helping reduce response delays and improve disaster preparedness in flood-prone areas. It also uses solar power for sustainable operation and provides both web and mobile accessibility, making it practical and efficient for community-based monitoring.",
    },
    {
      question: "Can X-STREAM operate during storms or bad weather?",
      answer:
        "Yes! The system can function continuously for up to 33 hours even without sunlight, ensuring that monitoring and communication remain active during storms or cloudy weather.",
    },
    {
      question: "How can X-STREAM help local communities?",
      answer:
        "By providing early warnings and accurate river data, X-STREAM helps communities stay informed, prepare evacuation plans, and minimize loss of life and property during floods or sudden river surges.",
    },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2
            className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] sm:text-3xl md:text-5xl"
            // style={{ fontFamily: "'Playfair Display', serif" }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>
          {/* <p
            className="mx-auto max-w-2xl text-lg text-[#023E8A]"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 200 }}
          >
            Have questions about COASTELLA?
          </p> */}
          <p
            className="mx-auto max-w-7xl text-lg text-[#023E8A]"
            // style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 200 }}
          >
            We've gathered some of the most common inquiries to help you
            understand how our system works!
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
