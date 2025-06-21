import React from "react";
import { FaCalendarAlt, FaUserMd, FaNotesMedical, FaHeartbeat, FaPills, FaCalendarPlus } from "react-icons/fa";

const Magic_Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#f0f9ff]">
      {/* Sidebar */}
      <div className="w-20 bg-blue-600 text-white flex flex-col items-center py-6 space-y-8">
        <FaCalendarAlt size={24} />
        <FaUserMd size={24} />
        <FaNotesMedical size={24} />
        <FaHeartbeat size={24} />
        <FaPills size={24} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Patient card</h1>
          <div className="flex gap-4">
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded">Appointments history</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaCalendarPlus /> New Patient
            </button>
          </div>
        </div>

        {/* Patient Info */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-wrap gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-300"></div>
            <div>
              <h2 className="font-bold">Irene Fleming</h2>
              <p>38 years old</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-10 text-sm">
            <p><strong>Height:</strong> 185</p>
            <p><strong>Weight:</strong> 83</p>
            <p><strong>Blood type:</strong> AB+</p>
            <p><strong>Phone:</strong> +44 787 665 588</p>
            <p><strong>Email:</strong> irenefleming@gmail.com</p>
            <p><strong>Card Number:</strong> 1267578</p>
            <p><strong>Medical Conditions:</strong> Allergies, Asthma, Coronary Heart Disease</p>
            <p><strong>Passport:</strong> 000345678</p>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2">Time</th>
                <th className="p-2">Sun</th>
                <th className="p-2">Mon</th>
                <th className="p-2">Tue</th>
                <th className="p-2">Wed</th>
                <th className="p-2">Thu</th>
                <th className="p-2">Fri</th>
                <th className="p-2">Sat</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => {
                const time = `${8 + i}:00-${9 + i}:00`;
                return (
                  <tr key={i} className="text-center border-t">
                    <td className="p-2 font-semibold">{time}</td>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="p-2 h-16">
                        {(i === 1 && j === 0) && <div className="bg-green-100 text-green-800 rounded px-1">Consultation</div>}
                        {(i === 2 && j === 3) && <div className="bg-yellow-100 text-yellow-800 rounded px-1">Operation</div>}
                        {(i === 3 && j === 3) && <div className="bg-blue-100 text-blue-800 rounded px-1">Analysis</div>}
                        {(i === 4 && j === 3) && <div className="bg-purple-100 text-purple-800 rounded px-1">Rehabilitation</div>}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 p-4 space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">February 2020</h3>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {[...Array(29)].map((_, i) => (
              <div key={i} className="text-center py-1 rounded hover:bg-blue-200 cursor-pointer">{i + 1}</div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Doctors</h3>
          {[
            "Dr. Clarence Hamilton",
            "Dr. Brett Hoffman",
            "Dr. Miguel Leonard",
            "Dr. Mamie Holloway"
          ].map((name, idx) => (
            <div key={idx} className="text-sm py-1 border-b last:border-0">{name}</div>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Write Prescription</h3>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Open Form</button>
        </div>
      </div>
    </div>
  );
};

export default Magic_Dashboard;
