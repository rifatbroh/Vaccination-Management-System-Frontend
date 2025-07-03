import {
    FaCalendarCheck,
    FaSignOutAlt,
    FaSyringe,
    FaTachometerAlt,
    FaUserMd,
    FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

const Admin_Sidebar = ({ role }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/");
    };

    // Load user once
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const renderMenuItems = () => {
        switch (role) {
            case "admin":
                return (
                    <>
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            label="Dashboard"
                            to="/admin/dashboard"
                        />
                        <MenuItem
                            icon={<FaUserMd />}
                            label="Doctors"
                            to="/admin/doctor_management"
                        />
                        <MenuItem
                            icon={<FaSyringe />}
                            label="Vaccine"
                            to="/admin/Vaccine-management"
                        />
                        <MenuItem
                            icon={<FaUsers />}
                            label="Users"
                            to="/admin/all-user"
                        />
                    </>
                );

            case "doctor":
                return (
                    <>
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            label="Dashboard"
                            to={`/doctor/dashboard/${userId}`}
                        />

                        <MenuItem
                            icon={<FaCalendarCheck />}
                            label="Appointments"
                            to="/doctor/appoinments"
                        />
                        <MenuItem
                            icon={<FaUserMd />}
                            label="Patient"
                            to={`/doctor/profile/${userId}`}
                        />
                        <MenuItem
                            icon={<FaSyringe />}
                            label="Vaccine List"
                            to="/doctor/vaccine-list"
                        />
                    </>
                );

            case "patient":
                return (
                    <>
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            label="Dashboard"
                            to={`/patient/dashboard/${userId}`}
                        />
                        <MenuItem
                            icon={<FaCalendarCheck />}
                            label="Appointments"
                            to={`/patient/appoinments/${userId}`}
                        />
                        <MenuItem
                            icon={<FaSyringe />}
                            label="Settings"
                            to={`/patient/settings/${userId}`}
                        />
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-[#469b7e] flex flex-col justify-between items-center py-10 shadow-lg z-50">
            {/* Top section */}
            <div className="flex flex-col items-center w-full">
                <h1 className="text-2xl cursor-pointer text-center font-bold text-white mb-10">
                    Health Horizon
                </h1>

                <div className="flex flex-col gap-6 w-full px-6">
                    {renderMenuItems()}
                </div>
            </div>

            {/* Bottom logout section */}
            <div className="w-full px-6">
                <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-xl text-white hover:bg-[#3b7d68] rounded-md cursor-pointer"
                >
                    <FaSignOutAlt />
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Admin_Sidebar;
