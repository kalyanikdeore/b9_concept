import { useState, useEffect } from "react";
import axios from "axios";

export default function DepartmentSection() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/departments"
        );
        setDepartments(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedDept(response.data.data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-15 bg-gray-100">
        Loading departments...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-15 bg-gray-100">Error: {error}</div>;
  }

  if (!departments.length) {
    return (
      <div className="text-center py-15 bg-gray-100">No departments found</div>
    );
  }

  return (
    <div className="text-center py-15 bg-gray-100">
      <h1 className="text-gray-900 text-4xl mb-2 ">We Are The</h1>
      <h1 className="text-4xl font-semibold  mb-20 text-black">
        Best Our Departments Centers
      </h1>
      <div className="flex max-w-6xl  mx-auto align-center justify-center  gap-1 space-x-4 my-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className={`py-3 p-3 justify-center cursor-pointer hover:scale-105 bg-white rounded-3xl flex items-center ${
              selectedDept?.id === dept.id ? "border-b-4 border-gray-500" : ""
            }`}
            onClick={() => setSelectedDept(dept)}
          >
            <img src={dept.icon} className="w-12" alt="icon" />
          </div>
        ))}
      </div>
      {selectedDept && (
        <div className="bg-white shadow-lg p-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left">
            <h1 className="text-2xl font-semibold">{selectedDept.title}</h1>
            <p className="my-2">{selectedDept.content}</p>
            {/* <ul className="list-disc list-inside text-lh">
              <li>Qualified Doctors</li>
              <li>24x7 Emergency Services</li>
              <li>General Medical</li>
              <li>Feel like Home Services</li>
              <li>Qualified Doctors</li>
            </ul> */}
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <img
              src={selectedDept.image}
              className="w-full h-105 rounded-lg"
              alt="Department"
            />
          </div>
        </div>
      )}
    </div>
  );
}
