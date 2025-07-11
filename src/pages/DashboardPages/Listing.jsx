import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import axiosInstance from "../../services/api";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const Listing = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { current, pageSize } = pagination;
      const { status, search } = filters;

      const params = {
        page: current,
        limit: pageSize,
        ...(status && { status }),
        ...(search && { search }),
      };

      const response = await axiosInstance.get("/appoint/list", { params });

      const responseData = response?.data?.appointments || [];
      const total = response?.data?.total || 0;
      const page = response?.data?.page || 1;

      setAppointments(responseData);
      setPagination({
        ...pagination,
        total,
        current: page,
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments. Please try again later.");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [pagination.current, filters]);

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value });
    setPagination({ ...pagination, current: 1 });
  };

  const handleStatusFilter = (e) => {
    setFilters({ ...filters, status: e.target.value });
    setPagination({ ...pagination, current: 1 });
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, current: page });
  };

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleDelete = async (appointmentId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this appointment?"
      );
      if (!confirmDelete) return;

      await axiosInstance.delete(`/appoint/delete/${appointmentId}`);

      setAppointments(
        appointments.filter((appointment) => appointment.id !== appointmentId)
      );

      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again later.");
    }
  };

  const handleEdit = (appointmentId) => {
    if (!appointmentId) return alert("Invalid appointment ID");
    navigate(`/dashboard/appointment/edit/${appointmentId}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mt-20">
      {/* View Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0  bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5  w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center  pb-2">
              <h3 className="text-lg font-medium text-gray-900">
                Appointment Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Appointment ID
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="mt-1 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusColors[selectedAppointment.status]
                      }`}
                    >
                      {selectedAppointment.status?.charAt(0)?.toUpperCase() +
                        selectedAppointment.status?.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Patient Name
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.firstName}{" "}
                    {selectedAppointment.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Contact</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.contact}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {dayjs(selectedAppointment.dob).format("DD MMM YYYY")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Appointment Date
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {dayjs(selectedAppointment.date).format("DD MMM YYYY")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Appointment Time
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Created By
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.creator?.username || "N/A"}
                  </p>
                </div>
              </div>
              {/* Add any additional fields you want to display */}
            </div>
            <div className="mt-4 pt-4  flex justify-end">
              {/* <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Appointment Management
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all patient appointments
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="relative rounded-md shadow-sm flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search appointments..."
            onChange={handleSearch}
          />
        </div>

        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="h-full rounded-md border-gray-300 pl-10 pr-8 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleStatusFilter}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Patient
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Dob
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Appoinemnt Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Appoinemnt Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created By
                    </th> */}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="py-4 text-center text-sm text-gray-500"
                      >
                        Loading appointments...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="py-4 text-center text-sm text-gray-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : !appointments || appointments.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="py-4 text-center text-sm text-gray-500"
                      >
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {appointment.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {appointment.firstName} {appointment.lastName}
                          <div className="text-gray-400">
                            {appointment.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {appointment.contact}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dayjs(appointment.dob).format("DD MMM YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dayjs(appointment.date).format("DD MMM YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {appointment.time}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              statusColors[appointment.status]
                            }`}
                          >
                            {appointment.status?.charAt(0)?.toUpperCase() +
                              appointment.status?.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {appointment.creator?.username || "N/A"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleView(appointment)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(appointment.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Edit"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(appointment.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {!error && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">
              {(pagination.current - 1) * pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                pagination.current * pagination.pageSize,
                pagination.total
              )}
            </span>{" "}
            of <span className="font-medium">{pagination.total}</span>{" "}
            appointments
          </div>
          <nav className="flex space-x-2">
            <button
              onClick={() => handlePageChange(pagination.current - 1)}
              disabled={pagination.current === 1}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.current + 1)}
              disabled={
                pagination.current * pagination.pageSize >= pagination.total
              }
              className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Listing;
