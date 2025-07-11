import React from "react";
import { Link } from "react-router-dom";

const AppointmentDetails = () => {
  return (
    <div className="container-fluid AppointmentDetails d-flex flex-wrap">
      {/* Left Section - Opening Hours */}
      <div
        className="left-section flex-fill p-4 text-white"
        style={{ background: "#8c52ff" }}
      >
        <h3>
          24 Hours
          <br />
          Opening Our Services
        </h3>
        <ul className="list-unstyled">
          {[
            { day: "Saturday", time: "8:00 am - 10:00 pm" },
            { day: "Sunday", time: "6:00 am - 8:00 pm" },
            { day: "Monday", time: "6:00 am - 2:00 pm" },
            { day: "Tuesday", time: "7:00 am - 9:00 pm" },
            { day: "Wednesday", time: "10:00 am - 12:00 pm" },
            { day: "Thursday", time: "2:00 am - 6:00 pm" },
            { day: "Friday", time: "Closed" },
          ].map((schedule, index) => (
            <li key={index}>
              {schedule.day} <span className="float-end">{schedule.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Appointment Form */}
      <div
        className="right-section flex-fill p-4 text-white"
        style={{ background: "#4db8ff" }}
      >
        <h3>Make An Appointment Now</h3>
        <form>
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Your Name"
            aria-label="Enter your name"
            required
          />
          <select
            name="department"
            className="form-control mb-3"
            aria-label="Select department"
            required
          >
            <option value="" disabled selected>
              Select Department
            </option>
            <option value="dentistry">Dentistry</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
          </select>
          <input
            type="text"
            name="phone"
            className="form-control mb-3"
            placeholder="Phone Number"
            aria-label="Enter your phone number"
            required
          />
          <input
            type="date"
            name="appointmentDate"
            className="form-control mb-3"
            aria-label="Select appointment date"
            required
          />
          <button type="submit" className="btn btn-light">
            Appointment Now &raquo;
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentDetails;
