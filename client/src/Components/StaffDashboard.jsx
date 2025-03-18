import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function StaffDashboard() {
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

  return (
    <>
      <div className="HeaderComponent">
        <p className="HeaderTitle">STAFF DASHBOARD</p>
        <nav className="NavLinks">
          <a onClick={() => navigate('/staff-dashboard')} id='MainLink'>MAIN</a>
          <a onClick={() => navigate('/vehicle-request')}>VEHICLE REQUEST</a>
          <a onClick={() => navigate('/vehicle-status')}>VEHICLE STATUS</a>
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

      <div className="CardContainer">
        <div className="Card">
          <h3>DASHBOARD</h3><br />
          <a href="https://bip.bitsathy.ac.in/dashboard/login">Login to Dashboard</a>
        </div>
        <div className="Card">
          <h3>SUPPORT DESK</h3><br />
          <a href="https://supportdesk.bitsathy.ac.in/">Login to Support Desk</a>
        </div>
      </div>
    </>
  );
}

export default StaffDashboard;
