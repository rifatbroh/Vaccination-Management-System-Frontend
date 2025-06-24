
import { FaTachometerAlt, FaUserMd, FaSyringe, FaUsers, FaSignOutAlt, FaCalendarCheck } from 'react-icons/fa';
import MenuItem from './MenuItem'; // adjust path if needed

const Admin_Sidebar = ({ role }) => {
  const renderMenuItems = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <MenuItem icon={<FaTachometerAlt />} label="Dashboard" to="/admin/dashboard" />
            <MenuItem icon={<FaUserMd />} label="Doctors" to="/admin/doctor_management" />
            <MenuItem icon={<FaSyringe />} label="Vaccine" to="/admin/Vaccine-management" />
            <MenuItem icon={<FaUsers />} label="Users" to="/admin/all-user" />
          </>
        );
      case "doctor":
        return (
          <>
            <MenuItem icon={<FaTachometerAlt />} label="Dashboard" />
            <MenuItem icon={<FaCalendarCheck />} label="Appointments" />
            <MenuItem icon={<FaUserMd />} label="Patient" />
            <MenuItem icon={<FaSyringe />} label="Vaccine Track" />
            <MenuItem icon={<FaUsers />} label="Users log" />
          </>
        );
      case "patient":
        return (
          <>
            <MenuItem icon={<FaTachometerAlt />} label="Overview" />
            <MenuItem icon={<FaUserMd />} label="Does" />
            <MenuItem icon={<FaSyringe />} label="Vaccine" />
            <MenuItem icon={<FaUsers />} label="Track" />
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
        <h1 className="text-2xl text-center font-bold text-white mb-10">Health Horizon</h1>

        <div className="flex flex-col gap-6 w-full px-6">
          {renderMenuItems()}
        </div>
      </div>

      {/* Bottom logout section */}
      <div className="w-full px-6 mt-10">
        <MenuItem icon={<FaSignOutAlt />} label="Logout" />
      </div>
    </div>
  );
};

export default Admin_Sidebar;
