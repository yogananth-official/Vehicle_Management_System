import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // State to hold requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      facultyName: 'Dr. Smith',
      purpose: 'Field Research',
      cityName: 'City A',
      vehicleType: 'Bus',
      memberCount: 10,
      startDate: '01-10-2024',
      endDate: '05-10-2024',
      status: 'Pending',
      remarks: '',
    },
    {
      id: 2,
      facultyName: 'Prof. Johnson',
      purpose: 'Conference',
      cityName: 'City B',
      vehicleType: 'Car',
      memberCount: 5,
      startDate: '10-10-2024',
      endDate: '12-10-2024',
      status: 'Pending',
      remarks: '',
    },
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '/') {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleApprove = (id) => {
    // Update the status of the request to 'Accepted'
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Accepted' } : request
      )
    );
  };

  const handleReject = (id) => {
    const remarks = prompt('Please enter your remarks for rejection:');
    if (remarks) {
      // Update the request with the rejection status and remarks
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Rejected', remarks } : request
        )
      );
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
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
            <div key={request.id} className="request-card">
              <div className="request-details">
                <p><strong>ID:</strong> {request.id}</p>
                <p><strong>Faculty Name:</strong> {request.facultyName}</p>
                <p><strong>Purpose:</strong> {request.purpose}</p>
                <p><strong>City Name:</strong> {request.cityName}</p>
                <p><strong>Type of Car/Bus:</strong> {request.vehicleType}</p>
                <p><strong>Member Count:</strong> {request.memberCount}</p>
                <p><strong>From Date:</strong> {request.startDate}</p>
                <p><strong>Return Date:</strong> {request.endDate}</p>
                <p><strong>Status:</strong> {request.status}</p>
                {request.remarks && <p><strong>Remarks:</strong> {request.remarks}</p>}
              </div>
              <div className="request-actions">
                <button onClick={() => handleApprove(request.id)} disabled={request.status !== 'Pending'}>
                  Accept
                </button>
                <button onClick={() => handleReject(request.id)} disabled={request.status !== 'Pending'}>
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
