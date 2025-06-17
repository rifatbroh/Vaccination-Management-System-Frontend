import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';


import Doctor_dashboard from './components/Dashboard/Doctor_dashboard';
import Patient_dashboard from './components/Dashboard/Patient_dashboard';
import Admin_dashboard from './components/Dashboard/Admin_dashboard';
import Register from './pages/Register';
import Login from './Login';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />



        <Route path="/doctor/dashboard" element={<Doctor_dashboard />} />
        <Route path="/patient/dashboard" element={<Patient_dashboard />} />
        <Route path="/admin/dashboard" element={<Admin_dashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
