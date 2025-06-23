import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import Login from './Login';
import Doctor_dashboard from './components/Dashboard/Doctor_dashboard';
import Patient_dashboard from './components/Dashboard/Patient_dashboard';
import Admin_dashboard from './components/Dashboard/Admin_dashboard';
import DoctorManagement from './components/Dashboard/admin/DoctorManagement';
import Magic_Dashboard from './components/Magic_Dashboard';
import Landing_Page from './pages/Landing_Page';
import Register from './components/Register';
import Login2 from './components/Login2';
import PatientList from './pages/PatientList';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing_Page />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magic" element={<Magic_Dashboard />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/patient list" element={<PatientList />} />



        <Route path="/doctor/dashboard" element={<Doctor_dashboard />} />
        <Route path="/patient/dashboard" element={<Patient_dashboard />} />
        <Route path="/admin/dashboard" element={<Admin_dashboard />} />
        <Route path="/admin/doctor_management" element={<DoctorManagement />} />

      </Routes>
    </Router>
  );
};

export default App;
