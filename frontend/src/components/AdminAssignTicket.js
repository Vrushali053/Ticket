import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminAssignTicket.css'; // Create this CSS file as needed

function AdminAssignTicket() {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchTickets();
    fetchAgents();
  }, []);

  const fetchTickets = () => {
    axios.get('http://localhost:5000/api/tickets') // or a custom API like /unassigned
      .then(res => {
        const unassigned = res.data.filter(t => !t.assignedTo);
        setTickets(unassigned);
      })
      .catch(err => console.log(err));
  };

  const fetchAgents = () => {
    axios.get('http://localhost:5000/api/users/agents')
      .then(res => setAgents(res.data))
      .catch(err => console.log(err));
  };

  const assignAgent = (ticketId, agentId) => {
    axios.put(`http://localhost:5000/api/tickets/assign/${ticketId}`, { agentId })
      .then(() => {
        alert("Assigned successfully");
        fetchTickets();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="assign-ticket-container">
      <h2>Assign Tickets to Agents</h2>
      <table className="assign-ticket-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Email</th>
            <th>Assign to Agent</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>{ticket.userName}</td>
              <td>{ticket.email}</td>
              <td>
                <select
                  defaultValue=""
                  onChange={(e) => assignAgent(ticket._id, e.target.value)}
                >
                  <option value="" disabled>Select Agent</option>
                  {agents.map(agent => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAssignTicket;
