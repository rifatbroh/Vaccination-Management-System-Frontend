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
import Vaccine_list from "./components/Dashboard/Doctor/Vaccine_list";
import Doctor_layout from "./components/Dashboard/Layouts/Doctor_layout";
import Landing_Page from "./pages/Landing_Page";
import Patient_layout from "./components/Dashboard/Layouts/Patient_layout";
import Patient_dashboard from "./components/Dashboard/Patient/Patient_dashboard";
import Patient_appoinments from "./components/Dashboard/Patient/Patient_appoinments";
import Patient_settings from "./components/Dashboard/Patient/Patient_settings";
import Admin_Layout from "./components/Dashboard/Layouts/Admin_layout";
import Patient from "./components/Dashboard/Doctor/Patient";
import Doctor_dashboard from "./components/Dashboard/Doctor/Doctor_dashboard";


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing_Page />} />

                {/* <Route
                    path="/patient/dashboard"
                    element={<PatientProfile id="6864c907aed4dec8deeafb85" />}
                />
                <Route path="/profile-page" element={<ProfilePageDoc />} /> */}
                <Route path="/patient/dashboard" element={<Patient_dashboard />} />
                

                {/* Admin Layout */}
                <Route path="/admin" element={<Admin_Layout />}>
                    <Route path="dashboard" element={<Admin_dashboard />} />
                    <Route path="doctor_management" element={<DoctorManagement />} />
                    <Route path="Vaccine-management" element={<VaccineManager />} />
                    <Route path="/admin/all-user" element={<AllUsersTable />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Doctor Layout */}
                <Route path="/doctor" element={<Doctor_layout />}>
                    <Route path="dashboard/:id" element={<Doctor_dashboard />} />
                    <Route path="appoinments" element={<Appoinment />} />
                    <Route path="profile" element={<Patient />} />
                    <Route path="vaccine-list" element={<Vaccine_list />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* patient Layout */}
                <Route path="/patient" element={<Patient_layout />}>
                    <Route path="dashboard/:id" element={<Patient_dashboard />} />
                    <Route path="appoinments" element={<Patient_appoinments />} />
                    <Route path="settings" element={<Patient_settings />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
