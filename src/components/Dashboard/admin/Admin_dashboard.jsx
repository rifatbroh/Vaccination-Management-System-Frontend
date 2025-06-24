import { useEffect, useState } from "react";
import { FaCalendarCheck, FaSyringe, FaUserMd, FaUsers, FaUserShield } from "react-icons/fa";
import DashboardCard from "./DashboardCard";
import Admin_Sidebar from "../Single_components/Admin_sidebar";

const Admin_dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:10/api/admin/all-numbers")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="admin flex">
      <div className="admin-left w-[20%]">
        <Admin_Sidebar role="admin" />
      </div>

      <div className="admin-right w-[80%]  pr-20">
          <div className="p-8 bg-[#fdfdfd] ">
              <h1 className="text-3xl font-bold mb-4">Welcome, Admin 🛡️</h1>
              <p className="mb-2 text-2xl ">Monitor the system, users, doctors, and patient data.</p>

              {!stats ? (
              <p className="mt-6 text-gray-500">Loading dashboard data...</p>
              ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <DashboardCard title="Total Patients" value={stats.totalPatients} color="text-4xl" icon={<FaUserShield />} />
                <DashboardCard title="Total Doctors" value={stats.totalDoctors} color="text-4xl" icon={<FaUserMd />} />
                <DashboardCard title="Appointments Today" value={stats.totalAppointments} color="text-4xl" icon={<FaCalendarCheck />} />
                <DashboardCard title="Total Vaccines" value={stats.totalVaccines} color="text-4xl" icon={<FaSyringe />} />
                <DashboardCard title="Total Users" value={stats.totalUsers} color="text-4xl text-white" icon={<FaUsers />} />
            </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default Admin_dashboard;

