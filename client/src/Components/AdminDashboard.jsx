import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vehicle-requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching vehicle requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3001/update-request/${id}`, { status: 'Accepted' });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: 'Accepted' } : request
        )
      );
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (id) => {
    const remarks = prompt('Please enter your remarks for rejection:');
    if (remarks !== null) {
      try {
        await axios.put(`http://localhost:3001/update-request/${id}`, { status: 'Rejected', remarks });
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, status: 'Rejected', remarks } : request
          )
        );
      } catch (error) {
        console.error('Error rejecting request:', error);
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate('/');
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="header-title">Admin Dashboard</h1>
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input type="text" placeholder="Search requests..." />
        </div>
        <div className="user-profile">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <span className="user-name">ADMIN</span>
          <FontAwesomeIcon icon={faSignOutAlt} className="logout-button" onClick={handleLogout} />
        </div>
      </div>

      <div className="requests-container">
        <h2>Staff Vehicle Requests:</h2>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="request-card">
              <div className="request-details">
                <p><strong>ID:</strong> {request._id}</p>
                <p><strong>Purpose:</strong> {request.purpose}</p>
                <p><strong>Vehicle Type:</strong> {request.vehicleType}</p>
                <p><strong>From Date:</strong> {request.startDate.split('T')[0]}</p>
                <p><strong>Return Date:</strong> {request.endDate.split('T')[0]}</p>
                <p><strong>Status:</strong> {request.status}</p>
                {request.status === 'Rejected' && <p><strong>Remarks:</strong> {request.remarks}</p>}
              </div>
              <div className="request-actions">
                {request.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove(request._id)}>Accept</button>
                    <button onClick={() => handleReject(request._id)}>Reject</button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No requests available.</p>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
