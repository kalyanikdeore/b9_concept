import React, { useState, useEffect } from "react";

const NatureInformedTherapy = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/process-achievements"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;

  return (
    <div className="py-12 px-4 text-center text-[#2c2c2c]">
      <div className="mt-8 max-w-4xl mx-auto">
        <div className=" gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white p-6 rounded-lg text-center"
            >
              <h4 className="text-4xl font-bold  mb-6">{achievement.title}</h4>
              <h2 className=" text-lg ">{achievement.description}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NatureInformedTherapy;
