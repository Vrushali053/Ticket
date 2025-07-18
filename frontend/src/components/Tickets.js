import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Tickets.css';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [feedback, setFeedback] = useState({});
  const [newFeedback, setNewFeedback] = useState({});

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axios.get('http://localhost:5000/api/tickets')
      .then(res => setTickets(res.data))
      .catch(err => console.log(err));
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setUpdateData(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [name]: value }
    }));
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/tickets/update/${id}`, updateData[id])
      .then(() => {
        alert("Ticket updated!");
        fetchTickets();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="ticket-container">
      <h2>Tickets</h2>
      <div className="table-wrapper">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Assignee</th>
              <th>Update</th>
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
                <td>{ticket.assignee}</td>
                <td>
                  <div className="update-controls">
                    <select name="status" onChange={(e) => handleChange(e, ticket._id)} defaultValue="">
                      <option value="" disabled>Status</option>
                      <option value="New">New</option>
                      <option value="Open">Open</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <select name="priority" onChange={(e) => handleChange(e, ticket._id)} defaultValue="">
                      <option value="" disabled>Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                    <select name="category" onChange={(e) => handleChange(e, ticket._id)} defaultValue="">
                      <option value="" disabled>Category</option>
                      <option value="General">General</option>
                      <option value="Technical">Technical</option>
                      <option value="Billing">Billing</option>
                      <option value="Hardware">Hardware</option>
                    </select>
                    <input
                      type="text"
                      name="assignee"
                      placeholder="Assignee"
                      onChange={(e) => handleChange(e, ticket._id)}
                    />
                    <button onClick={() => handleUpdate(ticket._id)}>Update</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;
