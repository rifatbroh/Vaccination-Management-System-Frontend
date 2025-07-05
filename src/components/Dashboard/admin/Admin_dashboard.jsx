import { useEffect, useState } from "react";
import {
    FaCalendarCheck,
    FaSyringe,
    FaUserMd,
    FaUsers,
    FaUserShield,
} from "react-icons/fa";
import Admin_Sidebar from "../Single_components/Admin_sidebar";
import DashboardCard from "./DashboardCard";

const Admin_dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch("http://localhost:10/api/admin/all-numbers")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error("Failed to fetch stats:", err));
    }, []);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="">
                <Admin_Sidebar role="admin" />
            </div>

            <div className=" p-10 transition-all duration-300">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2 animate-fade-in-down">
                        Welcome, Admin 🛡️
                    </h1>
                    <p className="text-lg text-gray-600">
                        Monitor the system, users, doctors, and patient data.
                    </p>
                </div>

                {!stats ? (
                    <p className="text-gray-500 text-lg mt-10 animate-pulse">
                        Loading dashboard data...
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DashboardCard
                            title="Total Patients"
                            value={stats.totalPatients}
                            icon={<FaUserShield />}
                            bgColor="from-green-400 to-green-600"
                        />
                        <DashboardCard
                            title="Total Doctors"
                            value={stats.totalDoctors}
                            icon={<FaUserMd />}
                            bgColor="from-blue-400 to-blue-600"
                        />
                        <DashboardCard
                            title="Appointments Today"
                            value={stats.totalAppointments}
                            icon={<FaCalendarCheck />}
                            bgColor="from-purple-400 to-purple-600"
                        />
                        <DashboardCard
                            title="Total Vaccines"
                            value={stats.totalVaccines}
                            icon={<FaSyringe />}
                            bgColor="from-yellow-400 to-yellow-600"
                        />
                        <DashboardCard
                            title="Total Users"
                            value={stats.totalUsers}
                            icon={<FaUsers />}
                            bgColor="from-pink-400 to-pink-600"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin_dashboard;
