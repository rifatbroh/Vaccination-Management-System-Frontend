import React from "react";
import DashboardCard from "./DashboardCard";
import { FaUserShield, FaUserMd, FaCalendarCheck } from "react-icons/fa";

const Admin_dashboard = () => {
  return (
    <div className="p-8 bg-[#fdfdfd] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin 🛡️</h1>
      <p className="mb-2">Monitor the system, users, doctors, and patient data.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <DashboardCard title="Total Patients" value="154" color="text-blue-600" icon={<FaUserShield />} />
        <DashboardCard title="Total Doctors" value="24" color="text-green-600" icon={<FaUserMd />} />
        <DashboardCard title="Appointments Today" value="37" color="text-purple-600" icon={<FaCalendarCheck />} />
      </div>
    </div>
  );
};

export default Admin_dashboard;
