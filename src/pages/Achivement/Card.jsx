import React from "react";

function Card({ testimonial }) {
  return (
    <div
      key={testimonial.id}
      className="flex flex-row items-center justify-center bg-gray-300 rounded-lg overflow-hidden"
    >
      {/* Left Side - Image Section */}
      <div className="w-full  flex-2/1">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-[310px] h-[370px] object-cover  "
        />
      </div>

      {/* Right Side - Text Section */}
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {testimonial.name}
        </h3>
        <p className="text-gray-700 text-sm sm:text-base text-justify mt-2">
          {testimonial.feedback}
        </p>
        <p className="mt-4 text-gray-500 text-sm sm:text-base">
          - {testimonial.hospital}
        </p>
      </div>
    </div>
  );
}

export default Card;
