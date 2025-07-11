import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, ArrowRight, ChevronRight } from "lucide-react";

const Aboutb9 = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about-nature-therapy"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        setError(err.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </motion.div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-bold">No Data Available</p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                About B9Concept
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {aboutData.title || "Revolutionary Health Transformation"}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 mb-6"></div>
            </motion.div>

            <motion.p
              className="text-gray-600 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {aboutData.description}
            </motion.p>

            {aboutData.button_text && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link to={aboutData.button_link || "/process"}>
                  <button className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="relative z-10 flex items-center">
                      {aboutData.button_text}
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </Link>
              </motion.div>
            )}

            <motion.div
              className="mt-12 grid grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                <p className="text-3xl font-bold text-indigo-600">10+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                <p className="text-3xl font-bold text-indigo-600">500+</p>
                <p className="text-sm text-gray-600">Success Stories</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                <p className="text-3xl font-bold text-indigo-600">95%</p>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Video/Image Content */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {aboutData.video_path ? (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="bg-white/90 hover:bg-white text-indigo-600 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                    >
                      <Play className="h-8 w-8 fill-current" />
                    </button>
                  </div>
                )}
                <video
                  controls={isVideoPlaying}
                  autoPlay={isVideoPlaying}
                  className="w-full aspect-video object-cover"
                >
                  <source
                    src={`http://localhost:8000/storage/${aboutData.video_path}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="B9Concept therapy session"
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}

            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg z-10 hidden lg:block"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Proven Results</p>
                  <p className="text-sm text-gray-600">Backed by science</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Aboutb9;
