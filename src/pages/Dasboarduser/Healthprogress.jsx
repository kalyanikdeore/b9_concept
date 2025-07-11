import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [healthData, setHealthData] = useState([]);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/health/9085") // Replace with dynamic user ID
      .then((res) => {
        setHealthData(res.data);
        setLatest(res.data[0]);
      });
  }, []);

  const chartData = {
    labels: healthData.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: "Steps",
        data: healthData.map((item) => item.steps),
        borderColor: "#007bff",
        fill: false,
      },
      {
        label: "Sleep Hours",
        data: healthData.map((item) => item.sleepHours),
        borderColor: "#28a745",
        fill: false,
      },
    ],
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">User Health Dashboard</h2>

      {/* Health Overview Cards */}
      <div className="row text-center">
        <div className="col-md-3 mb-3">
          <div className="card p-3">
            <h5>Steps</h5>
            <p className="fw-bold">{latest?.steps ?? "—"}</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3">
            <h5>Calories Burned</h5>
            <p className="fw-bold">{latest?.caloriesBurned ?? "—"}</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3">
            <h5>Sleep (hrs)</h5>
            <p className="fw-bold">{latest?.sleepHours ?? "—"}</p>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3">
            <h5>Weight (kg)</h5>
            <p className="fw-bold">{latest?.weight ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="card mt-4 p-4">
        <h5 className="mb-3">Weekly Health Progress</h5>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
