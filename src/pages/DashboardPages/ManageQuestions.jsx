import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";
import dayjs from "dayjs";

import { FaSearch, FaFilter, FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // React Icons import

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  archived: "bg-purple-100 text-purple-800",
};

const QuestionnaireListing = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [user, setUser] = useState({ role: "admin" }); // Replace with real user context or auth hook
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

  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const fetchQuestionnaires = async () => {
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

      const response = await axiosInstance.get("/questionnaires", { params });
      const responseData = response?.data?.questionnaires || [];
      const total = response?.data?.total || 0;
      const page = response?.data?.page || 1;

      const processedData = responseData.map((item) => ({
        ...item,
        createdBy: item.createdBy || { username: "System" },
      }));

      setQuestionnaires(processedData);
      setPagination((prev) => ({ ...prev, total, current: page }));
    } catch (error) {
      console.error("Error fetching questionnaires:", error);
      setError("Failed to load questionnaires. Please try again later.");
      setQuestionnaires([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionnaires();
  }, [pagination.current, filters]);

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value });
    setPagination({ ...pagination, current: 1 });
  };

  const handleStatusFilter = (e) => {
    setFilters({ ...filters, status: e.target.value });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDelete = async (questionnaireId) => {
    if (!isAdmin) return alert("Only admins can delete questionnaires");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this questionnaire?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/questionnaire/${questionnaireId}`);
      setQuestionnaires((prev) =>
        prev.filter((q) => q._id !== questionnaireId)
      );
      alert("Questionnaire deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete questionnaire. Try again later.");
    }
  };

  const handleEdit = (id) => {
    if (!isAdmin) return alert("Only admins can edit questionnaires");
    if (!id) return alert("Invalid questionnaire ID");
    navigate(`/dashboard/questionnaire/edit/${id}`);
  };

  const handleCreate = () => {
    if (!isAdmin) return alert("Only admins can create questionnaires");
    navigate("/dashboard/add-questions");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Questionnaires</h2>
        {isAdmin && (
          <button
            onClick={handleCreate}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            <FaPlus className="h-5 w-5 mr-2" />
            Add Questionnaire
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      ID
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Questions
                    </th>

                    {isAdmin && (
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={isAdmin ? 7 : 6}
                        className="py-4 text-center text-sm text-gray-500"
                      >
                        Loading questionnaires...
                      </td>
                    </tr>
                  ) : questionnaires.length === 0 ? (
                    <tr>
                      <td
                        colSpan={isAdmin ? 7 : 6}
                        className="py-4 text-center text-sm text-gray-500"
                      >
                        No questionnaires found
                      </td>
                    </tr>
                  ) : (
                    questionnaires.map((q) => (
                      <tr key={q._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {q.title}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {q.description || "N/A"}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {q.questions?.length || 0}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {dayjs(q.createdAt).format("DD MMM YYYY")}
                        </td>
                        <td className="px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              statusColors[q.status] || ""
                            }`}
                          >
                            {q.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {q.createdBy?.username || "Unknown"}
                        </td>
                        {isAdmin && (
                          <td className="px-3 py-4 text-sm text-gray-500 flex space-x-2">
                            <button
                              onClick={() => handleEdit(q._id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <FaEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(q._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash className="h-5 w-5" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireListing;
