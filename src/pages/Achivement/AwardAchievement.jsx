import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AwardAchievement = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/awards");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAchievements(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  const handleImageClick = (image, description, name) => {
    setSelectedImage({ image, description, name });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  // Animation variants
  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (loading) {
    return <div className="text-center py-8">Loading awards...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (achievements.length === 0) {
    return <div className="text-center py-8">No awards available</div>;
  }

  return (
    <div className="text-center py-8 mx-auto px-4 max-w-7xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Our Awards & Achievements
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className="cursor-pointer group"
            whileHover="hover"
            whileTap="tap"
            variants={imageVariants}
          >
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center mb-3">
                <img
                  src={`http://localhost:8000/storage/awards/${achievement.image}`}
                  alt={`${achievement.name} Award`}
                  className="w-full h-auto max-h-40 object-contain"
                  onClick={() =>
                    handleImageClick(
                      `http://localhost:8000/storage/awards/${achievement.image}`,
                      achievement.description,
                      achievement.name
                    )
                  }
                />
              </div>
              <p className="mt-auto text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {achievement.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal with animations */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                &times;
              </motion.button>
              <div className="p-6 md:p-8">
                <motion.img
                  src={selectedImage.image}
                  alt="Enlarged Award"
                  className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                />
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedImage.name}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {selectedImage.description ||
                      "No additional description available."}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AwardAchievement;
