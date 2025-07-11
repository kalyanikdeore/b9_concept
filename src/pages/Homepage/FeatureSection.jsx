import {
  MdOutlineHighQuality,
  MdOutlineFactory,
  MdOutlineAccessTime,
  MdOutlineEco,
  MdVerified,
  MdEngineering,
} from "react-icons/md";
import { motion } from "framer-motion";
import React, { useRef } from "react";

const features = [
  {
    icon: <MdOutlineHighQuality />,
    text: "10+ Years of Expertise",
    description:
      "A decade of delivering high-quality infrastructure solutions with excellence and reliability.",
  },
  {
    icon: <MdOutlineFactory />,
    text: "State-of-the-Art Manufacturing",
    description:
      "Ensuring precision, compliance, and high standards with cutting-edge facilities.",
  },
  {
    icon: <MdOutlineAccessTime />,
    text: "On-Time & Cost-Effective Delivery",
    description:
      "Meeting deadlines efficiently while maintaining top-tier quality.",
  },
  {
    icon: <MdOutlineEco />,
    text: "Sustainability & Innovation",
    description:
      "Using advanced technology and eco-friendly materials for a greener future.",
  },
  {
    icon: <MdOutlineAccessTime />,
    text: "Trusted by Government & Private Clients",
    description:
      "Successfully executing projects across various industries with integrity.",
  },
  {
    icon: <MdVerified />,
    text: "Certified & Compliant",
    description:
      "Adhering to industry regulations and safety standards for every project.",
  },
  {
    icon: <MdEngineering />,
    text: "Expert Engineering Team",
    description:
      "A highly skilled workforce dedicated to delivering superior infrastructure solutions.",
  },
  {
    icon: <MdOutlineAccessTime />,
    text: "Robust Infrastructure Solutions",
    description:
      "Providing durable and long-lasting infrastructure to meet the toughest challenges.",
  },
  {
    icon: <MdOutlineAccessTime />,
    text: "Seamless Logistics Support",
    description:
      "Efficient supply chain and logistics ensuring smooth project execution.",
  },
];

const FeatureSection = () => {
  return (
    <div className="relative my-20 min-h-[700px] text-gray-700">
      <div className="text-center">
        <h3 className="font-palanquin text-center text-2xl md:text-4xl font-bold  text-[#205781]">
          KeyWords & Solutions
        </h3>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 mx-5 gap-6 mt-10 lg:mt-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="w-full shadow-md px-6 rounded-2xl py-6 active:scale-95 bg-white overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(0, 175, 233, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col justify-center items-center text-center">
              <motion.div
                className="text-[#00afe9] text-3xl border border-[#00afe9] rounded-full flex justify-center items-center p-4 cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px] hover:shadow-blue-500 hover:text-blue-500"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h5 className="mt-3 mb-2 text-md md:text-lg font-semibold">
                {feature.text}
              </h5>
              <p className="text-md md:text-lg text-neutral-600 px-4">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeatureSection;
