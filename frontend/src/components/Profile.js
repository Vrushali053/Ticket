import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

function Profile({ onClose }) {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className="profile-panel">
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="profile-letter">
            {user ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
        <h2 className="profile-name">{user ? user.name : 'Guest User'}</h2>
        <p className="profile-email">{user ? user.email : 'Not logged in'}</p>

        <div className="profile-info">
          <div><strong>Role:</strong> {user ? user.role : 'N/A'}</div>
          <div><strong>Status:</strong> {user ? 'Active' : 'Guest'}</div>
        </div>

        <Link to="/register" onClick={onClose} className="profile-link">+ Add New User</Link>
        <button
          className="profile-logout-btn"
          onClick={() => {
            localStorage.removeItem('currentUser');
            onClose();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
