// src/App.jsx
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";

import Admin_dashboard from "./components/Dashboard/admin/Admin_dashboard";
import AllUsersTable from "./components/Dashboard/admin/AllUsersTable";
import DoctorManagement from "./components/Dashboard/admin/DoctorManag/DoctorManagement";
import VaccineManager from "./components/Dashboard/admin/VaccineManager";
import Doctor_dashboard from "./components/Dashboard/Doctor_dashboard";
import AdminLayout from "./components/Dashboard/Layouts/Admin_layout";
import Patient_dashboard from "./components/Dashboard/Patient_dashboard";
import Landing_Page from "./pages/Landing_Page";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing_Page />} />

                <Route path="/doctor/profile/:id" element={<Doctor_dashboard />} />
                <Route path="/doctor/dashboard" element={<Doctor_dashboard />} />
                <Route path="/patient/dashboard" element={<Patient_dashboard />} />

                {/* Admin Layout */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Admin_dashboard />} />
                    <Route path="doctor_management" element={<DoctorManagement />} />
                    <Route path="Vaccine-management" element={<VaccineManager />} />
                    <Route path="/admin/all-user" element={<AllUsersTable />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Doctor Layout */}
                <Route path="/doctor" element={<AdminLayout />}>
    
                </Route>
            </Routes>
        </Router>
    );
};

export default App;