import {
  FaCalendarCheck,
  FaSignOutAlt,
  FaSyringe,
  FaTachometerAlt,
  FaUserMd,
  FaUsers,
  FaCog,
  FaHospitalAlt,
} from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";

// MenuItem component with active styling
const MenuItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 text-lg font-medium transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-blue-600 bg-opacity-30 text-white shadow-inner-lg border border-blue-700"
            : "hover:bg-gray-700 hover:text-white"
        }`
      }
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{label}</span>
    </NavLink>
  );
};

const Admin_Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || "";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Animate sidebar only for admin
  const sidebarAnimation = useSpring({
    from: { transform: "translateX(-100%)", opacity: 0 },
    to: { transform: "translateX(0%)", opacity: 1 },
    config: { mass: 1, tension: 200, friction: 26 },
    delay: 50,
  });

  const renderMenuItems = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <MenuItem icon={<FaTachometerAlt />} label="Dashboard" to="/admin/dashboard" />
            <MenuItem icon={<FaUserMd />} label="Doctors" to="/admin/doctor_management" />
            <MenuItem icon={<FaSyringe />} label="Vaccine Management" to="/admin/Vaccine-management" />
            <MenuItem icon={<FaUsers />} label="Users" to="/admin/all-user" />
          </>
        );
      case "doctor":
        return (
          <>
            <MenuItem icon={<FaTachometerAlt />} label="Dashboard" to={`/doctor/dashboard/${userId}`} />
            <MenuItem icon={<FaCalendarCheck />} label="Appointments" to={`/doctor/appointments/${userId}`} />
            <MenuItem icon={<FaSyringe />} label="Vaccine List" to="/doctor/vaccine-list" />
          </>
        );
      case "patient":
        return (
          <>
            <MenuItem icon={<FaTachometerAlt />} label="Dashboard" to={`/patient/dashboard/${userId}`} />
            <MenuItem icon={<FaCalendarCheck />} label="Appointments" to={`/patient/appointments/${userId}`} />
            <MenuItem icon={<FaSyringe />} label="Settings" to={`/patient/settings/${userId}`} />
          </>
        );
      default:
        return null;
    }
  };

  // Admin sidebar styles
  const adminSidebarClasses = "fixed top-0 left-0 h-screen w-64 flex flex-col justify-between z-50 font-sans bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl text-gray-100";

  // Doctor & Patient sidebar styles (your original green style)
  const simpleSidebarClasses = "fixed  h-screen w-64 bg-[#212121] flex flex-col justify-between items-center py-10 text-white";

  // Logo classes for admin and others
  const adminLogoClasses = "px-6 py-8 cursor-pointer select-none text-3xl font-extrabold tracking-wide flex items-center justify-center gap-2 border-b border-gray-700 text-white hover:text-blue-400 transition-colors duration-300";
  const simpleLogoClasses = "text-3xl cursor-pointer text-center font-bold text-white mb-10";

  // Logout button classes
  const adminLogoutBtnClasses = "w-full flex items-center justify-center gap-3 py-3 rounded-lg transition-colors duration-200 shadow-md text-white font-semibold bg-red-700 hover:bg-red-800";
  const simpleLogoutBtnClasses = "flex items-center gap-2 px-4 py-2 text-xl text-white hover:bg-[#3b7d68] rounded-md cursor-pointer";

  // Logo component depending on role
  const Logo = () => {
    if (role === "admin") {
      return (
        <div className={adminLogoClasses} onClick={() => navigate("/")}>
          <FaHospitalAlt className="text-blue-400 text-4xl" />
          Health<span className="text-blue-400 ml-1">Horizon</span>
        </div>
      );
    }
    return (
      <h1 className={simpleLogoClasses} onClick={() => navigate("/")}>
        Health Horizon
      </h1>
    );
  };

  if (role === "admin") {
    // Admin with animation & fancy style
    return (
      <animated.div style={sidebarAnimation} className={adminSidebarClasses}>
        <Logo />
        <nav className="flex flex-col gap-2 mt-8 px-4 flex-grow">{renderMenuItems()}</nav>
        <div className="px-4 mb-6 pt-6 border-t border-gray-700">
          <button onClick={handleLogout} className={adminLogoutBtnClasses} aria-label="Sign Out">
            <FaSignOutAlt className="text-lg" />
            Sign Out
          </button>
        </div>
      </animated.div>
    );
  }

// Doctor & Patient simple style, no animation, centered items
return (
  <div className={simpleSidebarClasses}>
    <Logo />
    
    {/* Wrapper with flex-grow to push logout to bottom */}
    <div className="flex flex-col justify-between w-full h-full px-6">
      {/* Top menu items */}
      <div className="flex flex-col gap-6">
        {renderMenuItems()}
      </div>

      {/* Logout at bottom */}
      <div className="pb-4">
        <div onClick={handleLogout} className={simpleLogoutBtnClasses}>
          <FaSignOutAlt />
          Logout
        </div>
      </div>
    </div>
  </div>
);

};

export default Admin_Sidebar;
