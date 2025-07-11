import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-82 mb-10   bg-cover bg-center flex items-center justify-center"
      //   style={{
      //     backgroundImage:
      //       "url('https://www.shutterstock.com/image-photo/doctor-utilizing-advanced-digital-tablet-600nw-2481904799.jpg')",
      //   }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400  bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <p className="text-lg tracking-wide uppercase mb-4">
          Call Now to Book an Appointment
        </p>
        <p className="text-1xl md:text-3xl font-bold mb-6">
          Get expert care, timely advice, and personalized treatment—your
          well-being starts with one click.
        </p>
        <button
          onClick={() => navigate("/appointment")}
          className="bg-white text-black font-bold py-3 px-8 rounded shadow-lg transition duration-300 hover:bg-gray-600 hover:text-white"
        >
          New Appointments
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
