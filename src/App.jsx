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
import Appoinment from "./components/Dashboard/Doctor/Appoinment";
import Doctor_dashboard from "./components/Dashboard/Doctor/Doctor_dashboard";
import ProfilePageDoc from "./components/Dashboard/Doctor/ProfilePageDoc";
import Vaccine_list from "./components/Dashboard/Doctor/Vaccine_list";
import AdminLayout from "./components/Dashboard/Layouts/Admin_layout";
import Doctor_layout from "./components/Dashboard/Layouts/Doctor_layout";
import Patient_dashboard from "./components/Dashboard/Patient_dashboard";
import Landing_Page from "./pages/Landing_Page";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing_Page />} />

                <Route
                    path="/doctor/profile/:id"
                    element={<Doctor_dashboard />}
                />
                {/* <Route path="/doctor/dashboard" element={<Doctor_dashboard />} /> */}
                <Route
                    path="/patient/dashboard"
                    element={<Patient_dashboard />}
                />
                <Route path="/profile-page" element={<ProfilePageDoc />} />

                {/* Admin Layout */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Admin_dashboard />} />
                    <Route
                        path="doctor_management"
                        element={<DoctorManagement />}
                    />
                    <Route
                        path="Vaccine-management"
                        element={<VaccineManager />}
                    />
                    <Route path="/admin/all-user" element={<AllUsersTable />} />
                    <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                    />
                </Route>

                {/* Doctor Layout */}
                <Route path="/doctor" element={<Doctor_layout />}>
                    <Route path="dashboard/:id" element={<ProfilePageDoc />} />
                    <Route path="appoinments" element={<Appoinment />} />
                    <Route path="vaccine-list" element={<Vaccine_list />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
