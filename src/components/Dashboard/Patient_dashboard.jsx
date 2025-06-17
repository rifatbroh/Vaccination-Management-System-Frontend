import React from "react";
import { FaCalendarAlt, FaSyringe } from "react-icons/fa";

const Patient_dashboard = () => {
  return (
    <div className="p-8 bg-[#f0f9ff] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, Patient 👤</h1>
      <p className="mb-2">
        Manage your health records, vaccination info, and appointments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Appointments Card */}
        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" /> Upcoming Appointments
          </h2>
          <ul className="text-gray-700 list-disc pl-5">
            <li>Dr. Smith - 21st June</li>
            <li>Dr. Rahman - 25th June</li>
          </ul>
        </div>

        {/* Vaccination Card */}
        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaSyringe className="text-green-500" /> Vaccination History
          </h2>
          <ul className="text-gray-700 list-disc pl-5">
            <li>COVID-19 - <span className="text-green-600 font-medium">Completed</span></li>
            <li>Tetanus - <span className="text-red-500 font-medium">Due</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Patient_dashboard;
