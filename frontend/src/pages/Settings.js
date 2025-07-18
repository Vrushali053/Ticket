import React from 'react';
import '../styles/Settings.css';

function Settings() {
  return (
    <div className="settings-page">
      <h2>Account Settings</h2>
      <form className="settings-form">
        <label>Email:</label>
        <input type="email" placeholder="Your email" />

        <label>Change Password:</label>
        <input type="password" placeholder="New password" />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
