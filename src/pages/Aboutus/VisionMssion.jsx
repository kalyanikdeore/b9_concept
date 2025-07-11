import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

const VisionMission = () => {
  const [visionMissions, setVisionMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisionMissions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/vision-missions"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure we always have an array, even if empty
        const missionsArray = Array.isArray(data) ? data : [];

        setVisionMissions(missionsArray);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Failed to load content");
        setLoading(false);
      }
    };

    fetchVisionMissions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  const getIconComponent = (iconName) => {
    const icons = { Eye, Target };
    return icons[iconName] || Eye; // Default to Eye if icon not found
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Our Vision & Mission
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {visionMissions.map((item) => {
          const Icon = getIconComponent(item.icon);
          return (
            <VisionMissionCard
              key={item.id}
              icon={Icon}
              title={item.title}
              text={item.content}
            />
          );
        })}
      </div>
    </section>
  );
};

const VisionMissionCard = ({ icon: Icon, title, text }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex flex-col items-center text-center h-full">
      <div className="bg-blue-100 p-3 rounded-full mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  </motion.div>
);

export default VisionMission;
