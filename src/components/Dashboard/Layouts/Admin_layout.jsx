// src/components/Layouts/AdminLayout.jsx
import Admin_Sidebar from "../Single_components/Admin_sidebar";
import TopNav from "../Single_components/TopNav";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin flex">
      {/* Sidebar */}
      <div className="admin-left w-[20%]">
        <Admin_Sidebar role="admin" />
      </div>

      {/* Main Content */}
      <div className="admin-right w-[80%] pr-20">
        <TopNav />
        <div className=" bg-[#fdfdfd] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
