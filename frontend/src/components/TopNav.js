import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaSearch, FaBell, FaGift, FaUserCircle } from 'react-icons/fa';
import '../styles/TopNav.css';
import Profile from './Profile';  // ✅ import Profile

function TopNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);  // ✅ profile panel toggle
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setDropdownOpen(false);
  };

  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/tickets':
        return 'Tickets';
      case '/create-ticket':
        return 'Create Ticket';
      default:
        return 'Helpdesk';
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <>
      <div className="top-nav">
        <div className="left-section">
          <h3>{pageTitle}</h3>
        </div>

        <div className="right-section">
          <button className="get-btn">Get started</button>

          <div className="dropdown">
            <button className="new-btn" onClick={toggleDropdown}>New ▼</button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/create-ticket" onClick={closeDropdown}>New Ticket</Link>
              </div>
            )}
          </div>

          <FaSearch className="top-icon" />
          <FaBell className="top-icon" />
          <FaGift className="top-icon" />
          <FaUserCircle className="top-icon" onClick={toggleProfile} />
        </div>
      </div>

      {profileOpen && <Profile onClose={toggleProfile} />}  {/* ✅ floating profile panel */}
    </>
  );
}

export default TopNav;
