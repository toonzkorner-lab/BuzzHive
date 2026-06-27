import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Do I need an ID to purchase products?",
      answer: "Yes. You must be 21 years of age or older to purchase any vape, tobacco, or hemp products. A valid, government-issued photo ID is strictly required for all purchases."
    },
    {
      question: "What is THC-A?",
      answer: "THC-A (Tetrahydrocannabinolic acid) is a naturally occurring cannabinoid found in raw cannabis and hemp plants. When heated (like when smoked or vaporized), it converts into Delta-9 THC. Our THC-A products are hemp-derived and comply with state and federal regulations."
    },
    {
      question: "What is your return policy?",
      answer: "All sales on flower, vapes, and opened products are final due to health and safety regulations. Defective hardware may be exchanged within 24 hours of purchase in its original packaging with a valid receipt."
    },
    {
      question: "Do you sell authentic brands?",
      answer: "Absolutely. We pride ourselves on only carrying 100% authentic, high-quality products sourced directly from trusted manufacturers and verified distributors."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section mt-16 animate-fade-up">
      <div className="container" style={{maxWidth: '800px'}}>
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3 className="text-xl font-bold">{faq.question}</h3>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
