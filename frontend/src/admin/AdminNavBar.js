import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import ViewPatients from './ViewPatients';
import ViewPredictions from './ViewPredictions';
import './admin.css'; 

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/adminlogin');
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Admin Home</Link></li>
          <li><Link to="/viewpatients">View Patients</Link></li>
          <li><Link to="/viewpredictions">View Predictions</Link></li>
          <li><Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<AdminHome />} exact />
        <Route path="/viewpatients" element={<ViewPatients />} exact />
        <Route path="/viewpredictions" element={<ViewPredictions />} exact />
      </Routes>
    </div>
  );
}
