import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PopupModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setShowModal(false);

  const handleAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]   p-4">
          {/* Modal Container */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-700 hover:text-blue-900 bg-white/50 rounded-full p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full h-48 sm:h-56 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                alt="Login Illustration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-black text-center">
                We're Here for You – Book an Appointment Now
              </h2>
              <p className="mb-5 text-gray-800 text-sm sm:text-base text-center">
                Therapy, in a nutshell, is a way to address mental health
                concerns or emotional challenges through a structured process of
                talking with a trained therapist.
              </p>

              {/* Appointment Button */}
              <div className="flex justify-center">
                <button
                  className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto"
                  onClick={handleAppointmentClick}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
