import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdImage } from "react-icons/md";

const LogoGrid = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/clients");
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto text-center">Loading clients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto text-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto text-center">
          No clients available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto grid grid-cols-3 md:grid-cols-6 gap-2 place-items-center">
        {clients.map((client) => (
          <motion.div
            key={client.id}
            whileHover={{ scale: 1.1, filter: "grayscale(100%)" }}
            transition={{ duration: 0.3 }}
            className="relative flex justify-center items-center"
          >
            {client.image ? (
              <img
                src={`http://localhost:8000/storage/${client.image}`}
                // src={`http://localhost:8000/storage/${client.image}`}
                alt={client.name}
                className="h-16 md:h-20 object-contain filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all"
                title={client.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "block";
                }}
              />
            ) : (
              <div className="h-16 md:h-20 w-full flex items-center justify-center bg-gray-200">
                <MdImage className="text-gray-400 text-2xl" />
              </div>
            )}
            <MdImage className="absolute text-gray-300 text-4xl hidden" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LogoGrid;
