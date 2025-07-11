import React from "react";

const achievements = [
  {
    title: "Speciality Rhinology",
    description:
      "Procedur arrain arrain manu producs rather convenet cuvate mantna this man Manucur product.",
  },
  {
    title: " Cardiology Care",
    description:
      "Procedur arrain arrain manu producs rather convenet cuvate mantna this man Manucur product.",
  },
  {
    title: "Neurology Experts   ",
    description:
      "Procedur arrain arrain manu producs rather convenet cuvate mantna this man Manucur product.",
  },
];

const ProcessAchievements = () => {
  return (
    <div className="CompanyAchievements px-6 md:px-16 py-16 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-5">Process</h2>
      <p className="text-teal-600 mb-10 uppercase text-sm font-medium">
        Milestones That Define Our Journey
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              {item.title}
            </h4>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessAchievements;
