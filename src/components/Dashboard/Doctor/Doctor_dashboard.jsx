import ProfilePageDoc from "./ProfilePageDoc";

const Doctor_dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* Top Navigation */}
      

      {/* Main Content Area */}
      <main className="flex-1 p-10">
        <div className="max-w-5xl mx-auto">

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {/* Example Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Upcoming Appointments</h3>
              <p className="text-gray-600">You have 5 appointments scheduled.</p>
              <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm">
                View All
              </button>
            </div>

            {/* Example Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-semibold text-green-600 mb-3">New Patients</h3>
              <p className="text-gray-600">3 new patients registered today.</p>
              <button className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 text-sm">
                Manage Patients
              </button>
            </div>

            {/* Example Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-semibold text-purple-600 mb-3">Messages</h3>
              <p className="text-gray-600">You have 2 unread messages.</p>
              <button className="mt-4 px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200 text-sm">
                Read Messages
              </button>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="bg-white p-8 rounded-3xl mt-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Your Profile Overview
            </h2>
            <ProfilePageDoc />
          </div>

          {/* Add more sections here as needed, e.g., Appointments, Patients */}
         
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className="w-full bg-white text-center py-4 text-gray-500 text-sm border-t border-gray-200">
        &copy; {new Date().getFullYear()} Healthy Horizon. All rights reserved.
      </footer>
    </div>
  );
};

export default Doctor_dashboard;