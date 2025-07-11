import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const departments = [
  {
    id: 1,
    icon: "https://labartisan.net/demo/mukti/assets/images/depart/icon/01.png",
    title: "1. Speciality Rhinology",
    image: "https://labartisan.net/demo/mukti/assets/images/depart/07.jpg",
    content:
      "Procedur arrain arrain manu producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mant manu producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mantan this conven cuvate bad.",
  },
  {
    id: 2,
    icon: "https://labartisan.net/demo/mukti/assets/images/depart/icon/03.png",
    title: "2. Cardiology Care",
    image: "https://labartisan.net/demo/mukti/assets/images/depart/08.jpg",
    content:
      "Procedur arrain arrain manu producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mant manu producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mantan this conven cuvate bad.",
  },
  {
    id: 3,
    icon: "https://labartisan.net/demo/mukti/assets/images/depart/icon/06.png",
    title: "3. Neurology Experts",
    image: "https://labartisan.net/demo/mukti/assets/images/depart/5.jpg",
    content:
      "Procedur arrain manu arrain manu producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mant producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mantan this conven cuvate bad.",
  },
  {
    id: 4,
    icon: "https://labartisan.net/demo/mukti/assets/images/depart/icon/06.png",
    title: "4. Neurology Experts",
    image: "https://labartisan.net/demo/mukti/assets/images/depart/5.jpg",
    content:
      "Procedur arrain manu arrain manu producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mant producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mantan this conven cuvate bad.",
  },
  {
    id: 5,
    icon: "https://labartisan.net/demo/mukti/assets/images/depart/icon/01.png",
    title: "5. Speciality Experts",
    image: "https://labartisan.net/demo/mukti/assets/images/depart/07.jpg",
    content:
      "Procedur arrain arrain manu producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mant manu producs rather convenet cuvate mantna this man Manucur produc rather conven cuvatie mantan this conven cuvate bad.",
  },
];

export default function DepartmentSection() {
  const [selectedDept, setSelectedDept] = useState(departments[0]);

  return (
    <div className="text-center py-20 bg-gray-100">
      {/* Heading Section */}
      <motion.h1
        className="text-gray-900 text-4xl mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        We Are The
      </motion.h1>
      <motion.h1
        className="text-4xl font-semibold mb-10 text-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Best Our Process
      </motion.h1>

      <div className="flex flex-col md:flex-row items-start justify-center gap-10 px-4">
        {/* Sidebar Menu */}
        <div className="flex flex-col items-start gap-4">
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              className={`py-3 px-5 flex items-center cursor-pointer bg-white rounded-3xl shadow-md w-full ${
                selectedDept.id === dept.id ? "border-b-4 border-gray-500" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDept(dept)}
            >
              <img src={dept.icon} className="w-12 mr-4" alt="icon" />
              <p className="text-lg font-medium">{dept.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDept.id}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col md:flex-row gap-6 max-w-4xl w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-1/2 text-left">
              <h1 className="text-2xl font-semibold mb-2">{selectedDept.title}</h1>
              <p className="mb-4 text-gray-600">{selectedDept.content}</p>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-1">
                <li>Qualified Doctors</li>
                <li>24x7 Emergency Services</li>
                <li>General Medical</li>
                <li>Feel like Home Services</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img
                src={selectedDept.image}
                className="w-full h-auto rounded-lg shadow-md"
                alt="Department"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
