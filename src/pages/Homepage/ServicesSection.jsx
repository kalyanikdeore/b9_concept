import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Smartphone,
  Server,
  Cloud,
  Database,
  ShieldCheck,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

const   ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default icons as fallback
  const serviceIcons = {
    "Web Development": <Code className="w-6 h-6" />,
    "Mobile App Development": <Smartphone className="w-6 h-6" />,
    "Cloud Services": <Cloud className="w-6 h-6" />,
    "Database Management": <Database className="w-6 h-6" />,
    "Security Solutions": <ShieldCheck className="w-6 h-6" />,
    "Backend Services": <Server className="w-6 h-6" />,
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/services");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const servicesArray = Array.isArray(result)
          ? result
          : result.data || [];

        setServices(servicesArray);
        setLoading(false);
      } catch (err) {
        setError(
          err.message || "Failed to fetch services. Please try again later."
        );
        setLoading(false);
        console.error("Fetch error:", err);
      }
    };

    fetchServices();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg max-w-2xl mx-auto text-center">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            We Offer Specialized
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Quick, Natural and Permanent Solutions
          </p>
        </motion.div>

        {services.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                {/* Service Image */}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  {service.image ? (
                    <img
                      src={`http://localhost:8000/storage/${service.image}`}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.classList.add(
                          "flex",
                          "items-center",
                          "justify-center"
                        );
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                      {serviceIcons[service.title] || (
                        <Code className="w-6 h-6" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>

                  {/* <p className="text-gray-600 mb-6">{service.description}</p> */}

                  <div className="flex items-center text-blue-600 font-medium">
                    {/* <a
                      href="#contact"
                      className="flex items-center hover:text-blue-700 transition-colors"
                    >
                      Learn more
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No services available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
