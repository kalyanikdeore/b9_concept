import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import {
  Card,
  Divider,
  Row,
  Col,
  message,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import { create } from "zustand";

import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Stethoscope,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const { Option } = Select;

const Appointment = () => {
  const { user } = useAuthStore();
  const fullName = user.username;
  const [firstname, lastname, dob] = fullName.split(" ");
  const formattedDOB = user.dob
    ? new Date(user.dob).toISOString().split("T")[0]
    : "";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: firstname,
    lastName: lastname,
    city: user.city || "",
    contact: user.phone || "",
    email: user.email || "",
    dob: user.dob || "",
    gender: user.gender || "",
    doctor: "",
    status: "pending",
    created_by: 1,
    appointmentDate: "",
    appointmentTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [dateError, setDateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "appointmentDate" || name === "appointmentTime") {
      setDateError("");
    }
  };

  const validateAppointmentDateTime = () => {
    if (!formData.appointmentDate || !formData.appointmentTime) {
      setDateError("Please select both date and time");
      return false;
    }

    const selectedDate = new Date(formData.appointmentDate);
    const selectedTime = formData.appointmentTime;

    if (
      selectedDate.getFullYear() === 2025 &&
      selectedDate.getMonth() === 4 &&
      selectedDate.getDate() === 5
    ) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      if (hours === 12 && minutes === 50) {
        setDateError(
          "Appointments are not available at 12:50 PM on May 5, 2025"
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateAppointmentDateTime()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/appoint/create", formData);
      if (response.data.success) {
        setShowSuccessPopup(true);
        const appointmentId = response.data.data.id;

        setFormData({
          firstName: "",
          lastName: "",
          city: "",
          contact: "",
          email: "",
          dob: "",
          gender: "",
          doctor: "",
          status: "pending",
          created_by: 1,
          appointmentDate: "",
          appointmentTime: "",
        });

        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate(`/questionnaire/${appointmentId}`);
        }, 1000);
      } else {
        throw new Error(response.data.error || "Failed to create appointment");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      message.error({
        content: (
          <span>
            <XCircle style={{ color: "#ff4d4f", marginRight: 8 }} />
            {error.response?.data?.error || error.message}
          </span>
        ),
        duration: 4.5,
        style: {
          marginTop: "50px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 py-12 px-4 sm:px-6 relative">
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-xl shadow-2xl border border-green-900 max-w-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircle2 className="text-green-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Appointment Booked Successfully!
                </h3>
                <p className="text-gray-600 text-center">
                  Your appointment has been confirmed. We've sent the details to
                  your email.
                </p>
                <button
                  onClick={() => {
                    navigate("/responses");
                    setShowSuccessPopup(false);
                  }}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Book Your <span className="text-gray-600">Medical Appointment</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Schedule your visit with our expert healthcare professionals. We're
            committed to providing you with the best medical care in a
            comfortable environment.
          </motion.p>
        </div>

        <Row gutter={[32, 32]}>
          <Col xs={24} lg={16}>
            {/* Form Section */}
            <motion.div
              className="shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card
                title={
                  <div className="text-center">
                    <h2 className="text-2xl font-bold  text-gray-800">
                      Patient Information
                    </h2>
                    {/* <p className="text-gray-500 mt-1">
                      Please fill in your details to book an appointment
                    </p> */}
                  </div>
                }
                bordered={false}
                className="shadow-xl rounded-xl border-0"
                headStyle={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "24px",
                }}
                bodyStyle={{ padding: "24px" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <Row gutter={24}>
                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            First Name <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <User size={18} />
                            </span>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all  shadow-md"
                              onChange={handleChange}
                              value={formData.firstName}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Last Name <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <User size={18} />
                            </span>
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-md"
                              onChange={handleChange}
                              value={formData.lastName}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Contact Number{" "}
                            <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Phone size={18} />
                            </span>
                            <input
                              type="tel"
                              name="contact"
                              pattern="[0-9]{10,15}"
                              placeholder="Contact Number"
                              required
                              className="w-full pl-10 pr-4 py-3 shadow-md border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              onChange={handleChange}
                              value={formData.contact}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Mail size={18} />
                            </span>
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              required
                              className="w-full pl-10 pr-4 py-3 shadow-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              onChange={handleChange}
                              value={formData.email}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            City <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <MapPin size={18} />
                            </span>
                            <input
                              type="text"
                              name="city"
                              placeholder="City"
                              required
                              className="w-full pl-10 pr-4 py-3 shadow-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              onChange={handleChange}
                              value={formData.city}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Date of Birth{" "}
                            <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Calendar size={18} />
                            </span>
                            <input
                              type="date"
                              name="dob"
                              required
                              className="w-full pl-10 pr-4 py-3 shadow-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                              value={formData.dob}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Gender <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <select
                              name="gender"
                              className="w-full pl-10 pr-4 py-3 shadow-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                              value={formData.gender}
                              onChange={handleChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <User size={18} />
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Appointment Date{" "}
                            <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Calendar size={18} />
                            </span>
                            <input
                              type="date"
                              name="appointmentDate"
                              required
                              className="w-full pl-10 pr-4 py-3 shadow-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                              onChange={handleChange}
                              value={formData.appointmentDate}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col xs={24} md={12}>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Time <span className="text-red-500"> *</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Clock size={18} />
                            </span>
                            <input
                              type="time"
                              name="appointmentTime"
                              required
                              className="w-full pl-10 pr-4 py-3 shadow-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                              onChange={handleChange}
                              value={formData.appointmentTime}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {dateError && (
                      <div className="text-black-500 text-sm mt-2 flex items-center bg-red-50 px-4 py-2 rounded-lg">
                        <XCircle className="mr-2" size={16} />
                        {dateError}
                      </div>
                    )}

                    <div className="flex justify-center pt-6">
                      <motion.button
                        type="submit"
                        className="px-10 py-4 bg-gray-600  text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg flex items-center"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {loading ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="inline-block mr-2"
                          >
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </motion.span>
                        ) : (
                          <>
                            <span>Book Appointment</span>
                            <svg
                              className="ml-2 -mr-1 w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={8}>
            {/* Information Section */}
            <motion.div
              className="shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card
                title={
                  <h2 className="text-2xl font-bold text-gray-800">
                    Why Choose Us?
                  </h2>
                }
                bordered={false}
                className="shadow-xl rounded-xl border-0 h-full"
                headStyle={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "24px",
                }}
                bodyStyle={{ padding: "24px" }}
              >
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gray-300  p-3 rounded-xl mr-4">
                      <Stethoscope className="text-black-600 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        Expert Doctors
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Our specialists have 10+ years of experience in their
                        fields with board certifications.
                      </p>
                    </div>
                  </div>

                  <Divider
                    className="my-4"
                    style={{ borderColor: "#e5e7eb" }}
                  />

                  <div className="flex items-start">
                    <div className="bg-gray-300 p-3 rounded-xl mr-4">
                      <Activity className="text-gray-600 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        Advanced Technology
                      </h3>
                      <p className="text-gray-600 mt-1">
                        State-of-the-art diagnostic equipment for accurate
                        assessments and effective treatments.
                      </p>
                    </div>
                  </div>

                  <Divider
                    className="my-4"
                    style={{ borderColor: "#e5e7eb" }}
                  />

                  <div className="flex items-start">
                    <div className="bg-gray-300 p-3 rounded-xl mr-4">
                      <Clock className="text-black-600 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        Flexible Scheduling
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Extended hours and same-day appointments for urgent
                        needs.
                      </p>
                    </div>
                  </div>

                  <Divider
                    className="my-4"
                    style={{ borderColor: "#e5e7eb" }}
                  />

                  <div className="bg-gray-300 p-6 rounded-xl border shadow-md border-blue-100">
                    <div className="flex items-start mb-3">
                      <AlertCircle className="text-black-600 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                      <h3 className="font-bold text-black-800 text-lg">
                        Need Immediate Assistance?
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4 pl-7">
                      Call our emergency hotline for urgent medical needs:
                    </p>
                    <div className="flex items-center pl-7">
                      <Phone className="text-black-500 w-5 h-5 mr-2" />
                      <span className="text-black-600 font-bold text-xl">
                        +1 (217) 202-2114
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Testimonials Section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Patient Testimonials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Hear what our patients say about their experiences with our
            healthcare services.
          </p>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={8}>
              <motion.div whileHover={{ y: -8 }} className="h-full">
                <Card className="h-full rounded-xl shadow-md hover:shadow-lg transition-shadow border-0">
                  {/* <div className="text-yellow-400 text-2xl mb-4">★★★★★</div> */}
                  <blockquote className="italic text-gray-600 mb-6 text-lg">
                    "The doctors here are truly exceptional. I received
                    excellent care during my treatment."
                  </blockquote>
                  <div className="font-semibold text-gray-800">
                    Sarah Johnson
                  </div>
                  <div className="text-sm text-gray-500">
                    Cardiology Patient
                  </div>
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div whileHover={{ y: -8 }} className="h-full">
                <Card className="h-full rounded-xl shadow-md hover:shadow-lg transition-shadow border-0">
                  {/* <div className="text-yellow-400 text-2xl mb-4">★★★★★</div> */}
                  <blockquote className="italic text-gray-600 mb-6 text-lg">
                    "The facility is clean and modern, and the staff is very
                    professional and caring."
                  </blockquote>
                  <div className="font-semibold text-gray-800">
                    Michael Chen
                  </div>
                  <div className="text-sm text-gray-500">Pediatrics Parent</div>
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div whileHover={{ y: -8 }} className="h-full">
                <Card className="h-full rounded-xl shadow-md hover:shadow-lg transition-shadow border-0">
                  {/* <div className="text-yellow-400 text-2xl mb-4">★★★★☆</div> */}
                  <blockquote className="italic text-gray-600 mb-6 text-lg">
                    "Quick service and minimal wait times. Very satisfied with
                    my experience."
                  </blockquote>
                  <div className="font-semibold text-gray-800">
                    David Wilson
                  </div>
                  <div className="text-sm text-gray-500">General Checkup</div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </div>
  );
};

export default Appointment;
