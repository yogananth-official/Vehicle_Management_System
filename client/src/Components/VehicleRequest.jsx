import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './VehicleRequest.css';

const VehicleRequest = ({ onRequestSubmit }) => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: '',
    purpose: '',
    startDate: '',
    endDate: '',
    comments: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Date validation
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert('Start date must be before end date.');
      return;
    }

    onRequestSubmit(formData);  // Submit the request to the parent component
    setSuccessMessage('Request submitted successfully!'); // Success message
    setFormData({
      vehicleType: '',
      purpose: '',
      startDate: '',
      endDate: '',
      comments: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="HeaderComponent">
        <p className="HeaderTitle">VEHICLE REQUEST</p>
        <nav className="NavLinks">
          <a href="/staff-dashboard">MAIN</a>
          <a href="/vehicle-request">VEHICLE REQUEST</a>
          <a href="/vehicle-status">VEHICLE STATUS</a>
        </nav>
        <div className="SearchBar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input ref={searchInputRef} type="text" placeholder="Press / to search" />
        </div>
      </div>

      <div className="UserDetails">
        <div className="UserLogo">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span className="UsersName">YOGAN M</span>
        <FontAwesomeIcon icon={faSignOutAlt} className="LogoutButton" onClick={handleLogout} />
      </div>

      <div className="VehicleRequestForm">
        <h2>Vehicle Request Form</h2>
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
            <option value="">Select a vehicle</option>
            <option value="Car">Car</option>
            <option value="Bus">Bus</option>
            <option value="Van">Van</option>
          </select>

          <label htmlFor="purpose">Purpose of Request:</label>
          <input type="text" id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required />

          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />

          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required />

          <label htmlFor="comments">Additional Comments:</label>
          <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} placeholder="Add any additional information here"></textarea>

          <button type="submit">Submit Request</button>
          <div className="Declaration">
            <p>By submitting this request, you agree to the terms and conditions.</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default VehicleRequest;
