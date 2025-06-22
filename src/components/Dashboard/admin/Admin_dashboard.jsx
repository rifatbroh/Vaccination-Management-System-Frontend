import { useEffect, useState } from "react";
import { FaCalendarCheck, FaSyringe, FaUserMd, FaUsers, FaUserShield } from "react-icons/fa";
import DashboardCard from "../DashboardCard";

const Admin_dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:10/api/admin/all-numbers")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="p-8 bg-[#fdfdfd] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin 🛡️</h1>
      <p className="mb-2">Monitor the system, users, doctors, and patient data.</p>

      {!stats ? (
        <p className="mt-6 text-gray-500">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <DashboardCard title="Total Patients" value={stats.totalPatients} color="text-blue-600" icon={<FaUserShield />} />
          <DashboardCard title="Total Doctors" value={stats.totalDoctors} color="text-green-600" icon={<FaUserMd />} />
          <DashboardCard title="Appointments Today" value={stats.totalAppointments} color="text-purple-600" icon={<FaCalendarCheck />} />
          <DashboardCard title="Total Vaccines" value={stats.totalVaccines} color="text-red-600" icon={<FaSyringe />} />
          <DashboardCard title="Total Users" value={stats.totalUsers} color="text-yellow-600" icon={<FaUsers />} />
        </div>
      )}
    </div>
  );
};

export default Admin_dashboard;
