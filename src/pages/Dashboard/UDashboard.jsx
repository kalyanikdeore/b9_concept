import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import axiosInstance from "../../services/api";
function UDashboard() {
  const { user, checkAuth, loading } = useAuthStore();
  console.log(user);
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get(`/user/${user.id}/dashboard`);
        setDashboardData(response.data); // Axios stores response data in .data
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>Please log in to view the dashboard.</p>;

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h2>Your Dashboard</h2>

        {loadingData ? (
          <p>Loading dashboard data...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : dashboardData ? (
          <div className="dashboard-details">
            <h3>Welcome, {user.name}</h3>

            {/* Appointments Section */}
            {dashboardData.appointments?.length > 0 ? (
              <div>
                <h4>Appointments ({dashboardData.appointments.length})</h4>
                {dashboardData.appointments.map((appointment) => (
                  <div key={appointment._id} className="appointment-card">
                    <p>
                      <strong>Name:</strong> {appointment.firstName}{" "}
                      {appointment.lastName}
                    </p>
                    <p>
                      <strong>City:</strong> {appointment.city}
                    </p>
                    <p>
                      <strong>Contact:</strong> {appointment.contact}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {appointment.time}
                    </p>

                    <p>
                      <strong>Email:</strong> {appointment.email}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(appointment.dob).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Doctor:</strong>{" "}
                      {appointment.doctor || "Not assigned"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`status-${appointment.status.toLowerCase()}`}
                      >
                        {appointment.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No upcoming appointments</p>
            )}

            {/* Additional Dashboard Sections */}
            {dashboardData.stats && (
              <div className="stats-section">
                <h4>Your Statistics</h4>
                <p>
                  Total Appointments: {dashboardData.stats.totalAppointments}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p>No dashboard data available</p>
        )}
      </div>
    </div>
  );
}

export default UDashboard;
