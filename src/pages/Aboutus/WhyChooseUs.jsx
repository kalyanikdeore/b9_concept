import React, { useEffect, useState } from "react";
import { FaUserMd, FaChartLine, FaLeaf, FaCouch } from "react-icons/fa";

const WhyChooseUs = () => {
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/why-choose-us")
      .then((response) => response.json())
      .then((data) => {
        setFeatures(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching features:", error);
        setIsLoading(false);
      });
  }, []);

  const getIconComponent = (iconClass) => {
    switch (iconClass) {
      case "FaUserMd":
        return FaUserMd;
      case "FaChartLine":
        return FaChartLine;
      case "FaLeaf":
        return FaLeaf;
      case "FaCouch":
        return FaCouch;
      default:
        return FaUserMd;
    }
  };

  if (isLoading) {
    return <div className="py-16 bg-gray-50 text-center">Loading...</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We're committed to providing exceptional care that makes a real
            difference in your life.
          </p>
        </div>

        {features.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon_class);
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                >
                  <div className="mb-4 p-4 bg-blue-50 rounded-full">
                    <IconComponent
                      className={`text-3xl ${feature.icon_color}`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500">No features available</div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
