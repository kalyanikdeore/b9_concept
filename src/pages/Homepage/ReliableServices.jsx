import React, { useState, useEffect } from "react";

export default function ReliableServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(services);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/reliable-services"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        } else {
          throw new Error(data.message || "Failed to load services");
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 py-20 px-4 text-center">
        <p>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 py-20 px-4 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-20 px-4">
      {/* Section Title */}
      <div className="text-center mb-15">
        <h1 className="text-gray-900 text-4xl mb-2">We Are</h1>
        <h1 className="text-4xl font-semibold text-black">
          Offering Reliable Services
        </h1>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl h-130 mx-auto grid md:grid-cols-2 gap-9">
        {services.map((service, index) => (
          <div
            key={service.id || index}
            className={`flex shadow-md rounded-lg overflow-hidden ${
              index % 4 === 1 || index % 4 === 2
                ? "bg-gray-400 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {/* Updated image source */}
            <img
              src={`http://localhost:8000/uploads${service.image_path}`}
              alt={service.title}
              className="w-1/2 object-cover"
              style={index % 4 === 1 || index % 4 === 2 ? { opacity: 0.7 } : {}}
            />
            <div className="p-6 w-1/2">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p
                className={`text-sm mt-2 ${
                  index % 4 === 1 || index % 4 === 2 ? "" : "text-gray-600"
                }`}
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
