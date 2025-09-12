import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

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
        className={`mt-2 text-[#023E8A] ${isOpen ? 'block' : 'hidden'}`}
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
      question: 'What exactly is COASTELLA?',
      answer:
        "COASTELLA stands for 'Coastal Observation and Alert System for Tracking Environment, Levels of water, Location, and Analytics.' It is a solar-powered, IoT-based buoy system equipped with sensors to monitor coastal conditions and detect signs of natural disasters. It provides real-time updates through a web and mobile platform, helping authorities deliver timely alerts.",
    },
    {
      question: 'What types of natural disasters can COASTELLA detect?',
      answer:
        'COASTELLA has the capability to detect some of the severe threats such as tsunamis, tropical cyclones and storm surges. Its sensors monitor key parameters like rainfall, temperature, air and water pressure, wind speed, wave pattern and water levels. That is how we can be prepared before nature surprises us!',
    },
    {
      question:
        'How does COASTELLA help during disasters like typhoons or storm surges?',
      answer:
        'In the event of a disaster, COASTELLA becomes very useful in providing disaster monitoring authorities including the City Disaster Risk Reduction and Management Department of Caloocan and Navotas with real time data of water levels, wave activity and other coastal conditions. By providing early and reliable information, they can issue timely alerts and mobilize responders quickly to provide assistance to the communities as early as possible.',
    },
    {
      question: 'How does COASTELLA send alerts and updates?',
      answer:
        'Data is being gathered via the sensors of the COASTELLA buoy and sent directly to the Firebase database. This data can then be accessed by authorized personnel through the web and mobile interface of the system in order to check the situation in real time and issue timely alerts and updates as needed.',
    },
    {
      question: 'Who can access the data collected by COASTELLA?',
      answer:
        'It is only authorized to the City Disaster Risk Reduction and Management Department of Caloocan and Navotas that have access to the data of COASTELLA. This is to make sure that information is managed securely and only applied to create timely alerts and coordinate rapid responses in case of an Emergency.',
    },
    {
      question: 'How is COASTELLA different from existing warning systems?',
      answer:
        'COASTELLA is characterized by the fact that it provides real-time and automatic surveillance with the help of its IoT-enabled network of buoys and sensors. As compared to the existing warning systems which may be based on manual detection or delayed information, COASTELLA updates in real time. It is solar-powered so it can operate continuously providing updates via web and mobile apps, which can respond more quickly.',
    },
    {
      question: 'What inspired you to create COASTELLA?',
      answer:
        'The inspiration behind the creation of COASTELLA stems from the critical need to validate data sourced from news outlets and other information channels regarding disaster preparedness in the Philippines. Our goal was to develop a system that provides real-time data and early alerts, helping authorities respond quickly and keep everyone safe.',
    },
    {
      question: 'Is there a mobile application for COASTELLA?',
      answer:
        'Yes! COASTELLA comes with an easy-to-use mobile application that allows authorized personnel to access real-time data and alerts on the go. This way, they can stay informed and ready to respond, no matter where they are.',
    },
    {
      question: 'What happens if the solar power is insufficient?',
      answer:
        'COASTELLA has a 12V 28Ah lead-acid battery with a safe 80 percent usable capacity to store excess solar energy. This enables the system to maintain approximately 33 hours of operation in case of limited sunlight.',
    },
    {
      question:
        'Does Coastella require constant internet connection to function?',
      answer:
        'No. The buoy sends data to a receiver by means of radio frequency (10-15 km range) without the internet. The system side only requires internet connectivity to send data to a Firebase database that authorized employees can then monitor and have access to real-time data and notifications.',
    },
  ];

  return (
    <section className="w-full bg-white py-16  outline-1 outline-[#959ea5] rounded-lg">
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
