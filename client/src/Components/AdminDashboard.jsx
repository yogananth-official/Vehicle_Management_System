import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const searchInputRef = useRef(null);
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

  // Approve request and update in backend
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

  // Reject request with remarks and update in backend
  const handleReject = async (id) => {
    const remarks = prompt('Please enter your remarks for rejection:');
    if (remarks) {
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
          <input ref={searchInputRef} type="text" placeholder="Press / to search" />
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
                <p><strong>From Date:</strong> {request.startDate}</p>
                <p><strong>Return Date:</strong> {request.endDate}</p>
                <p><strong>Status:</strong> {request.status || 'Pending'}</p>
                {request.remarks && <p><strong>Remarks:</strong> {request.remarks}</p>}
              </div>
              <div className="request-actions">
                <button onClick={() => handleApprove(request._id)} disabled={request.status === 'Accepted'}>
                  Accept
                </button>
                <button onClick={() => handleReject(request._id)} disabled={request.status === 'Rejected'}>
                  Reject
                </button>
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
