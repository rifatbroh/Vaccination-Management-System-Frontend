import { useEffect, useState } from "react";
import {
    FaCalendarCheck,
    FaSyringe,
    FaUserMd,
    FaUsers,
    FaUserShield,
    FaChartLine, // New icon for dashboard overview
    FaExclamationTriangle, // Icon for error state
    FaSpinner, // Icon for loading state
} from "react-icons/fa";
import { animated, useSpring, useTransition } from "@react-spring/web";
import Admin_Sidebar from "../Single_components/Admin_sidebar"; // Assuming this component exists and is styled separately

// DashboardCard Component (Self-contained for this example, but ideally in its own file)
const DashboardCard = ({ title, value, icon, bgColor }) => {
    // Animation for card entry
    const cardProps = useSpring({
        from: { opacity: 0, transform: "translateY(30px)", scale: 0.95 },
        to: { opacity: 1, transform: "translateY(0px)", scale: 1 },
        config: { mass: 1, tension: 200, friction: 20 },
        delay: 100, // Stagger animation for each card
    });

    return (
        <animated.div
            style={cardProps}
            className={`relative p-6 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out
            hover:scale-105 hover:shadow-2xl cursor-pointer
            bg-gradient-to-br ${bgColor} text-white
            flex items-center justify-between
            group`}
        >
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-black opacity-10 rounded-2xl"></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
                <h3 className="text-xl font-semibold mb-2 opacity-90">{title}</h3>
                <p className="text-5xl font-extrabold leading-tight">{value}</p>
            </div>
            {/* Icon with hover animation */}
            <div className="relative z-10 text-white text-7xl opacity-50 transform transition-transform duration-300 group-hover:scale-110">
                {icon}
            </div>
        </animated.div>
    );
};


const Admin_dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null); // Clear previous errors
        fetch("http://localhost:10/api/admin/all-numbers")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch stats:", err);
                setError("Failed to load dashboard data. Please try again.");
                setLoading(false);
            });
    }, []);

    // Animation for the welcome message
    const welcomeProps = useSpring({
        from: { opacity: 0, transform: "translateY(-20px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        config: { mass: 1, tension: 180, friction: 12 },
    });

    // Data for dashboard cards, prepared for useTransition
    const dashboardCardsData = stats ? [
        { id: 'patients', title: "Total Patients", value: stats.totalPatients, icon: <FaUserShield />, bgColor: "from-green-500 to-green-700" },
        { id: 'doctors', title: "Total Doctors", value: stats.totalDoctors, icon: <FaUserMd />, bgColor: "from-blue-500 to-blue-700" },
        { id: 'appointments', title: "Appointments Today", value: stats.totalAppointments, icon: <FaCalendarCheck />, bgColor: "from-purple-500 to-purple-700" },
        { id: 'vaccines', title: "Total Vaccines", value: stats.totalVaccines, icon: <FaSyringe />, bgColor: "from-yellow-500 to-yellow-700" },
        { id: 'users', title: "Total Users", value: stats.totalUsers, icon: <FaUsers />, bgColor: "from-pink-500 to-pink-700" },
    ] : [];

    // Use useTransition for a staggered entry of dashboard cards
    const cardTransitions = useTransition(dashboardCardsData, {
        key: item => item.id,
        from: { opacity: 0, transform: "translateY(40px)", scale: 0.9 },
        enter: { opacity: 1, transform: "translateY(0px)", scale: 1 },
        leave: { opacity: 0, transform: "translateY(40px)", scale: 0.9 },
        trail: 150, // Staggered delay for each card
        config: { mass: 1, tension: 200, friction: 20 },
    });


    return (
        <div className="flex bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen font-sans">
            {/* Admin Sidebar */}
            <div className="min-h-screen"> {/* Ensure sidebar takes full height */}
                <Admin_Sidebar role="admin" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 md:p-10 lg:p-12 transition-all duration-300">
                {/* Welcome Section */}
                <animated.div style={welcomeProps} className="mb-10 text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-md flex items-center justify-center md:justify-start gap-4">
                        <FaChartLine className="text-blue-600 text-5xl" />
                        Admin Dashboard
                    </h1>
                    {/* <p className="text-xl text-gray-700 max-w-2xl mx-auto md:mx-0">
                        Get a quick overview of your system's health, user statistics, and key metrics.
                    </p> */}
                </animated.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-600 text-2xl font-medium">
                        <FaSpinner className="animate-spin text-blue-500 text-6xl mb-6" />
                        <p>Loading dashboard data...</p>
                        <p className="text-lg text-gray-500 mt-2">Please wait a moment while we fetch the latest information.</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded-lg shadow-lg mx-auto max-w-xl text-center flex items-center justify-center gap-4 text-lg animate-fade-in">
                        <FaExclamationTriangle className="text-red-500 text-3xl" />
                        <span className="font-bold">Error:</span> {error}
                    </div>
                )}

                {/* Dashboard Cards */}
                {!loading && !error && stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {cardTransitions((style, item) => (
                            <animated.div style={style}>
                                <DashboardCard
                                    title={item.title}
                                    value={item.value}
                                    icon={item.icon}
                                    bgColor={item.bgColor}
                                />
                            </animated.div>
                        ))}
                    </div>
                )}

                {/* If no stats but not loading and no error (e.g., empty data) */}
                {!loading && !error && !stats && (
                    <div className="text-center text-gray-600 text-xl font-medium bg-white p-10 rounded-lg shadow-lg max-w-md mx-auto animate-fade-in">
                        No dashboard data available. The system might be empty or there's a configuration issue.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin_dashboard;
