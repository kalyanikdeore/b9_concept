import React from "react";
import { FaHandshake, FaLightbulb, FaUsers, FaChartLine } from "react-icons/fa";

const ValuesSection = () => {
  const values = [
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "Integrity",
      description:
        "We believe in doing business with honesty and transparency at every step.",
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Continuous improvement and creative solutions drive our success.",
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Collaboration",
      description:
        "Great things happen when we work together with shared purpose.",
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We strive for the highest quality in everything we deliver.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Core Values
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-6 mx-auto">
                {value.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 text-center">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300">
            Learn more about us
          </button>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
