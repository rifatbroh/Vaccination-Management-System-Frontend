import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import Login from './Login';
import Doctor_dashboard from './components/Dashboard/Doctor_dashboard';
import Patient_dashboard from './components/Dashboard/Patient_dashboard';
import Admin_dashboard from './components/Dashboard/admin/Admin_dashboard';
import Magic_Dashboard from './components/Magic_Dashboard';
import Landing_Page from './pages/Landing_Page';
import Register from './pages/Register';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing_Page />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magic" element={<Magic_Dashboard />} />



        <Route path="/doctor/dashboard" element={<Doctor_dashboard />} />
        <Route path="/patient/dashboard" element={<Patient_dashboard />} />
        <Route path="/admin/dashboard" element={<Admin_dashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
