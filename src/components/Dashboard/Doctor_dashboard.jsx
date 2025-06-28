import Admin_Sidebar from "./Single_components/Admin_sidebar";
import TopNav from "./Single_components/TopNav";

const Doctor_dashboard = () => {
    return (
        <div className="doctor_dashboard flex min-h-screen">
            {/* Sidebar */}
            <div className="left-doctor w-[20%] bg-white shadow-md min-h-screen">
                <Admin_Sidebar role="doctor" />
            </div>

            {/* Main content */}
            <div className="right-doctor w-[80%] flex flex-col bg-[#fdfdfd]">
                <div className="top-nav p-4">
                    <TopNav />
                </div>

                <div className="p-8 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                       {/* start here */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctor_dashboard;