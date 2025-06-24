// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Admin_dashboard from './components/Dashboard/Admin_dashboard';
import Doctor_dashboard from './components/Dashboard/Doctor_dashboard';
import Patient_dashboard from './components/Dashboard/Patient_dashboard';
import DoctorManagement from './components/Dashboard/admin/DoctorManagement';
import VaccineManager from './components/Dashboard/admin/VaccineManager';
import Login2 from './components/Login2';
import Magic_Dashboard from './components/Magic_Dashboard';
import Register from './components/Register';
import Landing_Page from './pages/Landing_Page';
import PatientList from './pages/PatientList';
import AllUsersTable from './components/Dashboard/admin/AllUsersTable';
import AdminLayout from './components/Dashboard/Layouts/Admin_layout';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing_Page />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/magic" element={<Magic_Dashboard />} />
        <Route path="/patient list" element={<PatientList />} />

        
        {/* Doctor & Patient Dashboards */}

        <Route path="/Vaccine-management" element={<VaccineManager />} />
        <Route path="/doctor/dashboard" element={<Doctor_dashboard />} />
        <Route path="/patient/dashboard" element={<Patient_dashboard />} />

        {/* Admin Layout with Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Admin_dashboard />} />
          <Route path="doctor_management" element={<DoctorManagement />} />
          <Route path="/admin/all-user" element={<AllUsersTable />} />
          {/* Add more admin routes like /vaccine if needed */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
