import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import PatientNavBar from './patient/PatientNavBar';
import AdminNavBar from './admin/AdminNavBar';
import MainNavBar from './main/MainNavBar';
import DoctorNavBar from './doctor/DoctorNavBar';
import './App.css';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const patientLoggedIn = localStorage.getItem('isPatientLoggedIn') === 'true';
    const doctorLoggedIn = localStorage.getItem('isDoctorLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsPatientLoggedIn(patientLoggedIn);
    setIsDoctorLoggedIn(doctorLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onPatientLogin = () => {
    localStorage.setItem('isPatientLoggedIn', 'true');
    setIsPatientLoggedIn(true);
  };

  const onDoctorLogin = () => {
    localStorage.setItem('isDoctorLoggedIn', 'true');
    setIsDoctorLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>AI-Based Mental Health Support</h1>
      <Router>
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isPatientLoggedIn ? (
          <PatientNavBar />
        ) : isDoctorLoggedIn ? (
          <DoctorNavBar />
        ) : (
          <MainNavBar
            onAdminLogin={onAdminLogin}
            onPatientLogin={onPatientLogin}
            onDoctorLogin={onDoctorLogin}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
