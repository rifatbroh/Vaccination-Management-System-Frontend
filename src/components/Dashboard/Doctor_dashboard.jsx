import React from "react";
import { FaUserInjured, FaNotesMedical } from "react-icons/fa";

const Doctor_dashboard = () => {
  return (
    <div className="p-8 bg-[#fff7ed] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, Doctor 🩺</h1>
      <p className="mb-2">Review appointments, manage patients, and track vaccinations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><FaUserInjured /> Today's Appointments</h2>
          <ul className="text-gray-700 list-disc pl-5">
            <li>10:00 AM - Rifat Hossain</li>
            <li>11:30 AM - Sara Ali</li>
          </ul>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><FaNotesMedical /> Patient Requests</h2>
          <ul className="text-gray-700 list-disc pl-5">
            <li>Update Prescription - Rahim</li>
            <li>Vaccination query - Nayeem</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Doctor_dashboard;
