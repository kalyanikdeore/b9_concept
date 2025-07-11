import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Heart, Info } from "lucide-react";

const HeroSection = () => {
  const heroContent = [
    {
      id: 1,
      image_url:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Transform Your Health at the Root Level",
      description:
        "Our revolutionary approach resolves trauma patterns that contribute to chronic conditions",
      ctaHighlight: "Science-Backed",
      rating: 4.9,
    },
    {
      id: 2,
      image_url:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Cognitive Energy Restoration",
      description:
        "Reprogram your nervous system for optimal vitality and resilience",
      ctaHighlight: "Proven Results",
      rating: 4.8,
    },
    {
      id: 3,
      image_url:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Holistic Mind-Body Healing",
      description:
        "Experience complete restoration through our integrated methodology",
      ctaHighlight: "Breakthrough Technology",
      rating: 4.7,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || heroContent.length === 0) return;
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    setIsFavorite(false);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroContent.length) % heroContent.length
    );
    setIsFavorite(false);
  };

  const selectImage = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setIsFavorite(false);
    }
  };

  const currentItem = heroContent[currentIndex] || {};

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Slider */}
      <div
        className="relative w-full h-[90vh] flex items-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={currentItem.image_url}
              alt={currentItem.title}
              className="h-full w-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/60"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl">
            {currentItem.ctaHighlight && (
              <motion.div
                className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4 text-sm font-medium"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentItem.ctaHighlight}
              </motion.div>
            )}

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentItem.title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-100 mb-8 max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentItem.description}
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Begin Your Transformation
              </motion.button>

              <motion.button
                className="flex items-center gap-2 bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-medium text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Info size={20} />
                How It Works
              </motion.button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {heroContent.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-4 rounded-full z-10 backdrop-blur-sm transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-4 rounded-full z-10 backdrop-blur-sm transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>
          </>
        )}

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-8 right-8 bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-all z-10"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      {heroContent.length > 1 && (
        <div className="container mx-auto px-6 -mt-16 relative z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl max-w-4xl mx-auto">
            <div className="flex justify-center gap-4">
              {heroContent.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => selectImage(index)}
                  className={`flex-shrink-0 relative cursor-pointer rounded-lg overflow-hidden transition-all w-32 h-20 ${
                    currentIndex === index
                      ? "ring-4 ring-indigo-500 transform scale-105"
                      : "opacity-80 hover:opacity-100 hover:scale-102"
                  }`}
                  aria-label={`View slide ${index + 1}: ${item.title}`}
                >
                  <img
                    src={item.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {currentIndex === index && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="text-white w-5 h-5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
