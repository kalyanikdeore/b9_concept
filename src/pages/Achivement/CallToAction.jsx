import React from "react";

const CallToAction = () => {
  return (
    <div
      className="relative h-82  mt-10 bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/doctor-utilizing-advanced-digital-tablet-600nw-2481904799.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <p className="text-lg tracking-wide uppercase mb-4">
          PREFIX FOR THE FOOTER CALL TO ACTION SECTION WILL BE HERE
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          We Will Write a Convincing Call To Action to <br />
          Engage Your Audience Here
        </h1>
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded shadow-lg transition duration-300">
          CALL TO ACTION
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
