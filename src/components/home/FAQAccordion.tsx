'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  data?: FAQItem[];
  title?: string;
  subtitle?: string;
  noWrapper?: boolean;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "Where can I get spare parts for the equipment?",
    answer: "We keep a stock of essential spare parts for all the machinery to ensure efficient working of the equipment. We offer the best quality spare parts and offer prompt after-sales services to minimise downtime."
  },
  {
    question: "How do I clean my milk processing machine?",
    answer: "Our machines are specially designed to provide easy and hygienic cleaning because of its self-cleaning feature. It provides a consistent taste and quality of the product produced in every batch. But still, they should be cleaned with a detergent that is safe for food quality to maintain hygiene standards."
  },
  {
    question: "What are the shipping costs?",
    answer: "Shipping cost depends on the size of the equipment and the distance to deliver it. We provide calculated delivery costs considering all the factors of size and destination to deliver the equipment. In some cases, there might be no delivery cost if the distance is less towards destination and the requested order is less."
  },
  {
    question: "What is the lead time for delivery?",
    answer: "If the requested equipment and its quantity are already available in the stock, we dispatch it immediately. For large industries that want customised equipment, the delivery time may vary. All this information will already be mentioned in the quote."
  },
  {
    question: "What should I do if my milking machine breaks down?",
    answer: "In this situation, you should directly contact the customer support team. They will provide you with the technical support that will help troubleshoot this problem. These services ensure that your production is not affected and prevent downtime."
  },
  {
    question: "How can I maximise the life of my machinery?",
    answer: "To maximise the life of your machinery, you should ensure the proper maintenance of the machine parts to prevent them from premature damage. Ensuring regular maintenance keeps the equipment clean and ensures that it is operated according to the user manual. You should prevent overloading the equipment parts and lubricate the machinery regularly for proper working."
  },
  {
    question: "How often does the equipment need maintenance?",
    answer: "We sell a comprehensive range of equipment covering everything from milk production and processing to storage and packaging. We offer a milking machine, bulk milk coolers and processing plants for dairy products. You can buy dairy equipment online for quick delivery."
  },
  {
    question: "Do you cater to small-scale dairy farms or only large industries?",
    answer: "We provide a lot of flexibility to all the buyers. Our products are designed to be scalable according to the type of industry. It serves everything from small family-run organisations to large-scale industries."
  },
  {
    question: "Do your products meet food safety standards?",
    answer: "Yes, our products are made with great quality steel to provide the best grade food. There is no compromise when it comes to making high-quality food. Our equipment is also self-cleaning, which provides you with the best quality food without any residue from the previous batch."
  },
  {
    question: "Do you manufacture the equipment yourself?",
    answer: "Yes, we manufacture as well as export all the products of our industry. This helps us provide the most durable and high-quality products to our clients. It helps us to create connections with our clients directly without interference from any third party."
  },
  {
    question: "Do you offer installation and training services?",
    answer: "Yes, our experienced engineers are available for the installation of the equipment. They help install equipment in your industries and also provide guidance for its usage. Along with this, they provide proper training on the efficient operation of the equipment."
  },
  {
    question: "Is there a warranty for the equipment?",
    answer: "Yes, we offer a warranty period for all the equipment we provide. Warranty period may vary by product, but we offer a long-term warranty on all products. Our warranty covers defects in material and workmanship. It includes repairs and replacements for any issue in its functioning, but the warranty does not cover any damage from misuse or any other incident."
  },
  {
    question: "How can I request a quote for custom machinery?",
    answer: "You can fill a quote by filling out our contact form, emailing us or contacting our sales team directly from the website. You have to provide the technical drawing, required material and production volumes. It should include the desired timeline and budget, ensuring you research suppliers for warranty and support."
  },
  {
    question: "Do you sell used dairy machinery?",
    answer: "Yes, we offer professionally renovated high-quality dairy equipment. It can be an economical option and is thoroughly checked to provide high reliability. This equipment saves almost seventy per cent of the cost compared to new alternatives."
  }
];

export default function FAQAccordion({ data, title = "FAQ's", subtitle = "Frequently Asked Questions about our machinery and services.", noWrapper = false }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayFaqs = data || defaultFaqs;

  const content = (
    <>
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && <h2 className="text-3xl font-bold text-slate-900 mb-4 uppercase tracking-widest">{title}</h2>}
          {subtitle && <p className="text-slate-600">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          {displayFaqs.slice(0, Math.ceil(displayFaqs.length / 2)).map((faq, idx) => {
            const index = idx;
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#323373] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <button
                  className={`w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none transition-colors duration-300 ${isOpen ? 'bg-[#323373]' : 'bg-white'}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={`font-semibold text-lg pr-4 ${isOpen ? 'text-white' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 p-2 rounded-full transition-colors ${isOpen ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pt-4 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {displayFaqs.slice(Math.ceil(displayFaqs.length / 2)).map((faq, idx) => {
            const index = idx + Math.ceil(displayFaqs.length / 2);
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#323373] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <button
                  className={`w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none transition-colors duration-300 ${isOpen ? 'bg-[#323373]' : 'bg-white'}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={`font-semibold text-lg pr-4 ${isOpen ? 'text-white' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 p-2 rounded-full transition-colors ${isOpen ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pt-4 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  if (noWrapper) {
    return <div className="w-full">{content}</div>;
  }

  return (
    <section className="bg-white py-32 ">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {content}
      </div>
    </section>
  );
}
