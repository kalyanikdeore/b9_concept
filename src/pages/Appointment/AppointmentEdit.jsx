import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";
import Listing from "../DashboardPages/Listing";

const AppointmentEdit = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    status: "pending",
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axiosInstance.get(`/appoint/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching appointment", error);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/appoint/${id}`, form);
      // After saving, redirect back to the listing page (Dashboard)
      navigate("/");
    } catch (error) {
      console.error("Error updating appointment", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 mb-2"
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 mb-2"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 mb-2"
        />
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="border p-2 mb-2"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 mb-2"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AppointmentEdit;
