/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import API_BASE_URL from "../config/coreApi";
import { AppContext } from "../context/AppContext";

// 🧩 FAQ Interface
export interface FAQData {
  id: number;
  attributes: {
    question: string;
    answer: string;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface FAQItemProps {
  question: string;
  answer: string;
}

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

interface Props {
  refresh?: boolean;
}

export default function FAQs({ refresh }: Props) {
  const { token } = useContext(AppContext)!;
  const [faqs, setFaqs] = useState<FAQData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch active FAQs
  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/active-faqs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();

      if (res.ok && data.data) {
        setFaqs(data.data);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [refresh]);

  if (loading) {
    return (
      <section className="w-full py-16 flex justify-center items-center">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
          Loading FAQs...
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] sm:text-3xl md:text-5xl">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mx-auto max-w-7xl text-lg text-[#023E8A]">
            We've gathered some of the most common inquiries to help you
            understand how our system works!
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.attributes.question}
              answer={faq.attributes.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
