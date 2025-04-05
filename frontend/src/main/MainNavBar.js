import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import PatientRegistration from './../patient/PatientRegistration';
import DoctorRegistration from './../doctor/DoctorRegistration';
import AdminLogin from './../admin/AdminLogin';
import PatientLogin from './../patient/PatientLogin';
import DoctorLogin from './../doctor/DoctorLogin';
import GetPrediction from './GetPrediction';
import './style.css';

export default function MainNavBar({ onAdminLogin, onPatientLogin, onDoctorLogin }) {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          {/* <li className="dropdown">
            <span>Registration</span>
            <div className="dropdown-content">
              <li><Link to="/patientregistration">Patient Registration</Link></li>
              <li><Link to="/doctorregistration">Doctor Registration</Link></li>
            </div>
          </li>&nbsp;
          <li className="dropdown">
            <span>Login</span>
            <div className="dropdown-content">
              <Link to="/patientlogin">Patient</Link>
              <Link to="/doctorlogin">Doctor</Link>
              <Link to="/adminlogin">Admin</Link>
            </div>
          </li> */}
          <li><Link to="/getpredictions">Get Predictions</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/patientregistration" element={<PatientRegistration />} exact />
        <Route path="/doctorregistration" element={<DoctorRegistration />} exact />
        <Route path="/patientlogin" element={<PatientLogin onPatientLogin={onPatientLogin}/>} exact />
        <Route path="/doctorlogin" element={<DoctorLogin onDoctorLogin={onDoctorLogin}/>} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin} />} exact />
        <Route path="/getpredictions" element={<GetPrediction/>} exact />
      </Routes>
    </div>
  );
}
