import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API requests
import './VehicleStatus.css';

function VehicleStatus() {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);  // Store vehicle requests

  // Fetch vehicle requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vehicle-requests'); // Adjust port if needed
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching vehicle requests:", error);
      }
    };
    
    fetchRequests();
  }, []);

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

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate('/');
    }
  };

  return (
    <>
      <div className="HeaderComponent">
        <p className="HeaderTitle">VEHICLE STATUS</p>
        <nav className="NavLinks">
          <a onClick={() => navigate('/staff-dashboard')} id="MainLink">MAIN</a>
          <a href="/vehicle-request">VEHICLE REQUEST</a>
          <a href="/vehicle-status">VEHICLE STATUS</a>
        </nav>
        <div className="SearchBar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Press / to search"
          />
        </div>
      </div>

      <div className="UserDetails">
        <div className="UserLogo">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span className="UsersName">YOGAN M</span>
        <FontAwesomeIcon icon={faSignOutAlt} className="LogoutButton" onClick={handleLogout} />
      </div>

      <div className="ContentContainer">
  <table className="RequestTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Vehicle Type</th>
        <th>Purpose</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Status</th>
        <th>Comments</th>
        <th>Remarks</th> {/* New column for Remarks */}
      </tr>
    </thead>
    <tbody>
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <tr key={request._id}>
            <td>{index + 1}</td>
            <td>{request.vehicleType}</td>
            <td>{request.purpose}</td>
            <td>{new Date(request.startDate).toLocaleDateString()}</td>
            <td>{new Date(request.endDate).toLocaleDateString()}</td>
            <td>{request.status}</td>
            <td>{request.comments || "No Comments"}</td>
            <td>{request.remarks || "No Remarks"}</td> {/* New field for Remarks */}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8">No requests found</td>
        </tr>
      )}
    </tbody>
  </table>
</div>
    </>
  );
}

export default VehicleStatus;
