import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AgentTickets.css'; // Create a CSS file if needed

function AgentTickets() {
  const [tickets, setTickets] = useState([]);

  const agentId = localStorage.getItem('userId'); // Assume you store it after login

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  const fetchAssignedTickets = () => {
    axios.get(`http://localhost:5000/api/tickets/agent/${agentId}`)
      .then(res => setTickets(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="agent-ticket-container">
      <h2>My Assigned Tickets</h2>
      <table className="agent-ticket-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Email</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>{ticket.userName}</td>
              <td>{ticket.email}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgentTickets;
