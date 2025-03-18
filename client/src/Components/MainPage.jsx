import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function MainPage() {
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

  const handleAdminClick = () => {
    navigate('/admin-login'); // Navigate to AdminLogin page
  };

  const handleStaffClick = () => {
    navigate('/staff-dashboard');
  };

  return (
    <>
      <div className="HeaderComponent">
        <p className="HeaderTitle">VEHICLE MANAGEMENT SYSTEM</p>
        <div className="SearchBar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Press / to search"
          />
        </div>
        <div className="AdminUserContainer">
          <div className="AdminContainer" onClick={handleAdminClick}>
            <div className="AdminName">
              <p>ADMIN</p>
            </div>
          </div>
          <div className="UserContainer" onClick={handleStaffClick}>
            <div className="UserName">
              <p>STAFF</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
