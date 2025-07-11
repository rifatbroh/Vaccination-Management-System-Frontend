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
import Doctor_dashboard from "./components/Dashboard/Doctor/Doctor_dashboard";
// import Patient from "./components/Dashboard/Doctor/Patient";
import Vaccine_list from "./components/Dashboard/Doctor/Vaccine_list";
import Admin_Layout from "./components/Dashboard/Layouts/Admin_layout";
import Doctor_layout from "./components/Dashboard/Layouts/Doctor_layout";
import Patient_layout from "./components/Dashboard/Layouts/Patient_layout";
import Patient_settings from "./components/Dashboard/Patient/paitentSetting/Patient_settings";
import Patient_appoinments from "./components/Dashboard/Patient/Patient_appoinments";
import PatientProfile from "./components/Dashboard/Patient/patientProfile/PatientProfile";
import Landing_Page from "./pages/Landing_Page";

import DoctorAppointments from "./components/Dashboard/Doctor/AppoinmentManagement";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing_Page />} />
                

                {/* Admin Layout */}
                <Route path="/admin" element={<Admin_Layout />}>
                    <Route path="dashboard" element={<Admin_dashboard />} />
                    <Route path="doctor_management" element={<DoctorManagement />} />
                    <Route path="Vaccine-management" element={<VaccineManager />} />
                    <Route path="all-user" element={<AllUsersTable />} />

                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Doctor Layout */}
                <Route path="/doctor" element={<Doctor_layout />}>
                    <Route path="dashboard/:id" element={<Doctor_dashboard />} />
                    <Route path="appointments/:id" element={<DoctorAppointments />} />
                    <Route path="vaccine-list" element={<Vaccine_list />} />

                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Patient Layout */}
                <Route path="/patient" element={<Patient_layout />}>
                    <Route path="dashboard/:id" element={<PatientProfile />} />
                    <Route path="appointments/:id" element={<Patient_appoinments />}/>
                    <Route path="settings/:id" element={<Patient_settings />} />

                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
