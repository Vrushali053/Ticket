import React from 'react';
import '../styles/StatusUpdate.css';

function StatusUpdate() {
  return (
    <div className="status-update-page">
      <h2>Update Ticket Status</h2>
      <form className="status-form">
        <label>Ticket ID:</label>
        <input type="text" placeholder="Enter Ticket ID" />

        <label>New Status:</label>
        <select>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <button type="submit">Update Status</button>
      </form>
    </div>
  );
}

export default StatusUpdate;
