import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Components/MainPage.jsx';
import AdminLogin from './Components/AdminLogin.jsx'; 
import AdminDashboard from './Components/AdminDashboard.jsx';
import StaffDashboard from './Components/StaffDashboard.jsx';
import VehicleRequest from './Components/VehicleRequest.jsx';
import VehicleStatus from './Components/VehicleStatus.jsx'; 

function App() {
  const [requests, setRequests] = useState([]);

  const handleRequestSubmit = (newRequest) => {
    const requestWithId = {
      id: requests.length + 1,
      ...newRequest,
      status: 'Pending',
      remarks: ''
    };
    setRequests((prevRequests) => [...prevRequests, requestWithId]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin-login" element={<AdminLogin />} /> {}
        <Route 
          path="/admin-dashboard" 
          element={<AdminDashboard requests={requests} />} 
        />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route 
          path="/vehicle-request" 
          element={<VehicleRequest onRequestSubmit={handleRequestSubmit} />} 
        />
        <Route path="/vehicle-status" element={<VehicleStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
