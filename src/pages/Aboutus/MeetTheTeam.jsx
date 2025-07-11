import React, { useState, useEffect } from "react";
// import axios from "axios"; // Uncomment if you prefer using axios

const LeadershipTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Option 1: Using Fetch API
        const response = await fetch(
          "http://localhost:8000/api/leadership-team"
        );

        console.log("Status Code:", response.status); // Debug line
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (status: ${response.status})`
          );
        }

        const data = await response.json();
        setTeam(data.data);

        // Option 2: Using Axios (uncomment axios import above)
        /*
        const response = await axios.get("http://localhost:8000/api/leadership-team");
        setTeam(response.data.data);
        */
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);

        // Optional fallback data for testing without API
        setTeam([
          {
            name: "John Doe",
            role: "CEO",
            desc: "Experienced leader in tech.",
            image: "https://via.placeholder.com/300x300",
          },
          {
            name: "Jane Smith",
            role: "CTO",
            desc: "Expert in software architecture.",
            image: "https://via.placeholder.com/300x300",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading team members...</div>;

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}. Showing fallback data.
      </div>
    );

  return (
    <section className="mt-33">
      <div className="max-w-7xl py-10 mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Our Leadership Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-yellow-700 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
