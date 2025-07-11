import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "antd";
import "leaflet/dist/leaflet.css";
import MeetTheTeam from "./MeetTheTeam";
import VisionMission from "./VisionMssion";
import OurLocations from "./OurLocations";
import ValuesSection from "./ValuesSection";
import WhyChooseUs from "./WhyChooseUs";

// FAQ Accordion Component
const FAQAccordion = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{faq.question}</span>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t bg-gray-50"
        >
          <p className="text-gray-600">{faq.answer}</p>
        </motion.div>
      )}
    </div>
  );
};

// About Company Component
const AboutCompany = () => {
  const [aboutSections, setAboutSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutSections = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about-sections"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Invalid data format from API");
        }

        setAboutSections(data.data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutSections();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full py-30">
      {aboutSections.map((section) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col py-12 md:flex-row items-center gap-8"
        >
          <div className="relative md:w-1/2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                // src={`http://localhost:8000/storage/${section.main_image}`}
                src={`http://localhost:8000/storage/${section.main_image}`}
                alt="Lab Testing"
                className="rounded-lg shadow-lg w-full h-84 object-cover"
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <img
                  src={`http://localhost:8000/storage/${section.scientist_image}`}
                  alt="Scientist"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="md:w-1/2 space-y-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {section.title}
            </h2>
            <div
              className="text-gray-600 prose"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Main Component
const LabTestingCenter = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-20 py-8">
      <AboutCompany />
      <VisionMission />
      <MeetTheTeam />
      <ValuesSection />
      <WhyChooseUs />
    </div>
  );
};

export default LabTestingCenter;
