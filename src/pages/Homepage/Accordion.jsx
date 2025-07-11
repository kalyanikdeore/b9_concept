import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const variants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export const AccordionItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-gray-700 w-full text-xs md:text-lg overflow-hidden rounded-lg"
      whileHover={{ scale: 1.02 }}
    >
      <button
        className="w-full flex justify-between items-center text-left p-4 bg-gray-600 text-white font-medium hover:bg-gray-800 transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </motion.span>
      </button>
      <motion.div
        className="overflow-hidden bg-gray-100 text-black"
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        exit="closed"
        variants={variants}
      >
        <div className="p-3">{faq.answer}</div>
      </motion.div>
    </motion.div>
  );
};

const Accordion = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/faqs");
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setFaqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <section className="py-10 bg-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>Loading FAQs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 bg-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-gray-200">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="text-center text-xl md:text-4xl font-bold p-6">
          Frequently Asked Questions
        </h3>
        {faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} faq={faq} />
            ))}
          </div>
        ) : (
          <p className="text-center">No FAQs found</p>
        )}
      </motion.div>
    </section>
  );
};

export default Accordion; // This is the crucial line that was missing
