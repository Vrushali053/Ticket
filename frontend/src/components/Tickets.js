import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Tickets.css';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [editData, setEditData] = useState({});
  const [assignableUsers, setAssignableUsers] = useState([]);

  useEffect(() => {
    fetchTickets();
    fetchAssignableUsers();
  }, []);

  const fetchTickets = () => {
    axios.get('http://localhost:5000/api/tickets')
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  };

  const fetchAssignableUsers = () => {
    axios.get('http://localhost:5000/api/users/assignable')
      .then(res => setAssignableUsers(res.data))
      .catch(err => console.error(err));
  };

  const handleEditClick = (ticket) => {
    setEditMode((prev) => ({ ...prev, [ticket._id]: true }));
    setEditData((prev) => ({
      ...prev,
      [ticket._id]: {
        title: ticket.title,
        userName: ticket.userName,
        email: ticket.email,
        status: ticket.status || '',
        priority: ticket.priority || '',
        category: ticket.category || '',
        assignee: ticket.assignee?._id || ''
      }
    }));
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value }
    }));
  };

  const handleSave = (id) => {
    const payload = { ...editData[id] };

    if (payload.assignee === '') {
      payload.assignee = null;
    }

    axios.put(`http://localhost:5000/api/tickets/update/${id}`, payload)
      .then(() => {
        alert("✅ Ticket updated!");
        fetchTickets();
        setEditMode((prev) => ({ ...prev, [id]: false }));
      })
      .catch(err => {
        console.error(err);
        alert("❌ Error updating ticket.");
      });
  };

  return (
    <div className="ticket-container">
      <h2>Tickets</h2>
      <div className="table-wrapper">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Email</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Assignee</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id}>
                <td>
                  {editMode[ticket._id] ? (
                    <input
                      type="text"
                      name="title"
                      value={editData[ticket._id]?.title || ''}
                      onChange={(e) => handleChange(e, ticket._id)}
                    />
                  ) : (
                    ticket.title
                  )}
                </td>
                <td>
                  {editMode[ticket._id] ? (
                    <input
                      type="text"
                      name="userName"
                      value={editData[ticket._id]?.userName || ''}
                      onChange={(e) => handleChange(e, ticket._id)}
                    />
                  ) : (
                    ticket.userName
                  )}
                </td>
                <td>
                  {editMode[ticket._id] ? (
                    <input
                      type="email"
                      name="email"
                      value={editData[ticket._id]?.email || ''}
                      onChange={(e) => handleChange(e, ticket._id)}
                    />
                  ) : (
                    ticket.email
                  )}
                </td>
                <td>
                  {editMode[ticket._id] ? (
                    <select
                      name="status"
                      value={editData[ticket._id]?.status}
                      onChange={(e) => handleChange(e, ticket._id)}
                    >
                      <option value="">Select</option>
                      <option value="New">New</option>
                      <option value="Open">Open</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  ) : (
                    ticket.status || '—'
                  )}
                </td>
                <td>
                  {editMode[ticket._id] ? (
                    <select
                      name="priority"
                      value={editData[ticket._id]?.priority}
                      onChange={(e) => handleChange(e, ticket._id)}
                    >
                      <option value="">Select</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  ) : (
                    ticket.priority || '—'
                  )}
                </td>
                <td>
                  {editMode[ticket._id] ? (
                    <select
                      name="category"
                      value={editData[ticket._id]?.category}
                      onChange={(e) => handleChange(e, ticket._id)}
                    >
                      <option value="">Select</option>
                      <option value="General">General</option>
                      <option value="Technical">Technical</option>
                      <option value="Billing">Billing</option>
                      <option value="Hardware">Hardware</option>
                    </select>
                  ) : (
                    ticket.category || '—'
                  )}
                </td>
                <td>
                  {editMode[ticket._id] ? (
                    <select
                      name="assignee"
                      value={editData[ticket._id]?.assignee || ''}
                      onChange={(e) => handleChange(e, ticket._id)}
                    >
                      <option value="">Select Assignee</option>
                      <optgroup label="Agents">
                        {assignableUsers
                          .filter(user => user.role === 'agent')
                          .map(user => (
                            <option key={user._id} value={user._id}>
                              {user.name}
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="Users">
                        {assignableUsers
                          .filter(user => user.role === 'user')
                          .map(user => (
                            <option key={user._id} value={user._id}>
                              {user.name}
                            </option>
                          ))}
                      </optgroup>
                    </select>
                  ) : (
                    ticket.assignee?.name || 'Unassigned'
                  )}
                </td>
                <td>
                  {editMode[ticket._id] ? (
                    <button onClick={() => handleSave(ticket._id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(ticket)}>Edit</button>
                  )}
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
