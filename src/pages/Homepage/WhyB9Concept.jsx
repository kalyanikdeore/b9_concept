import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Brain, Zap, Globe } from "lucide-react";

export default function WhyB9Concept() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Static data for B9Concept advantages
  const b9Advantages = [
    {
      id: 1,
      title: "Beyond Symptom Management",
      description:
        "While others treat your pain, we address why it exists. While others manage your condition, we target what created it.",
      icon: <Target className="w-8 h-8" />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 2,
      title: "Root Cause Revolution",
      description:
        "Stop the endless cycle of temporary fixes. Through our proven natural and effective cognitive techniques, when you resolve the trauma disrupting your nervous system, your body remembers how to thrive naturally.",
      icon: <Brain className="w-8 h-8" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 3,
      title: "Comprehensive Natural Approach",
      description:
        "Our integrated methodology combines cognitive reframing, energy restoration, plus multiple proven natural and highly effective techniques—addressing trauma connections that traditional medicine overlooks.",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 4,
      title: "Universal Success",
      description:
        "Whether you're a high-performing executive with stress-induced symptoms, an overwhelmed parent battling chronic fatigue, a student struggling with anxiety, or someone who's suffered for decades—our approach works across all ages, professions, and conditions.",
      icon: <Globe className="w-8 h-8" />,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Our Differentiator
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why B9Concept Succeeds Where Others Fail
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600">
              While conventional approaches manage symptoms, we transform health
              at its foundation
            </p>
          </div>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {b9Advantages.map((advantage, index) => (
            <motion.div
              key={advantage.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                <div className="p-8">
                  <div
                    className={`${advantage.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}
                  >
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transformation Promise Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-white/20 rounded-full px-4 py-1 mb-6">
              <Zap className="w-5 h-5 mr-2" />
              <span className="font-medium">Our Promise</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Triple Transformation Guarantee
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Immediate shifts in how you feel",
                "Total restoration of energy and function",
                "Lasting protection against future challenges",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-lg font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
