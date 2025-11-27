import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Create a unique ID for ARIA controls
  const contentId = `faq-content-${question.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="text-lg font-semibold text-brand-dark">
        <button
          className="w-full flex justify-between items-center text-left"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span>{question}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="pt-4 text-gray-600 leading-relaxed">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FaqPage: React.FC = () => {
  const faqs = [
    {
      question: 'What is The Leaders First?',
      answer: 'The Leaders First is a highly vetted, private membership community for high-growth founders, entrepreneurs, and CEOs. We provide a trusted peer network, executive coaching, and exclusive resources to help leaders navigate the challenges of building a successful company.',
    },
    {
      question: 'Who is eligible to join?',
      answer: 'Membership is for founders or CEOs of companies with a minimum of 100 Cr in annual revenue, funding, or a previous successful exit. We primarily focus on leaders in Mumbai, Bangalore, or other Tier 1 cities.',
    },
    {
      question: 'What is the application process like?',
      answer: 'The application process is selective to maintain the quality of our community. It involves a written application followed by an interview. We have an acceptance rate of just 8% to ensure every member is a strong fit.',
    },
    {
      question: 'What are the membership fees?',
      answer: 'Membership fees are structured to be accessible for founders of high-growth companies. For specific details on pricing, please complete the initial application, and our membership team will be in touch.',
    },
    {
      question: 'How are Core Groups formed?',
      answer: 'Core Groups are carefully curated groups of 8 non-competing founders with similar-sized businesses. Each group is led by an executive facilitator to ensure productive, confidential discussions and peer support.',
    },
    {
      question: 'What is the time commitment?',
      answer: 'The primary commitment is participation in your monthly Core Group meeting. Beyond that, members are encouraged to engage with the digital community, attend events, and take advantage of perks as their schedule allows. The value you get is proportional to the effort you put in.',
    },
  ];

  return (
    <div className="animate-fade-in">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold text-brand-dark mb-4 font-serif">Frequently Asked Questions</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Everything you need to know about The Leaders First membership.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
