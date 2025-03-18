import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './VehicleStatus.css';

function VehicleStatus() {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

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


  const requests = [
    {
      id: 1,
      facultyName: 'Dr. Sathyamurthi',
      purpose: 'Field Research',
      cityName: 'Sathy',
      carType: 'Bus',
      memberCount: 10,
      fromDate: '01-10-2024',
      returnDate: '05-10-2024',
      status: 'Accepted',
      remarks: 'All details are correct.',
    },
    {
      id: 2,
      facultyName: 'Prof. Jayaraj',
      purpose: 'Conference',
      cityName: 'Erode',
      carType: 'Car',
      memberCount: 5,
      fromDate: '10-10-2024',
      returnDate: '12-10-2024',
      status: 'Rejected',
      remarks: 'Insufficient member count.',
    },
  ];

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
              <th>Faculty Name</th>
              <th>Purpose</th>
              <th>City Name</th>
              <th>Type of Car/Bus</th>
              <th>Member Count</th>
              <th>From Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.facultyName}</td>
                <td>{request.purpose}</td>
                <td>{request.cityName}</td>
                <td>{request.carType}</td>
                <td>{request.memberCount}</td>
                <td>{request.fromDate}</td>
                <td>{request.returnDate}</td>
                <td>{request.status}</td>
                <td>{request.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VehicleStatus;
