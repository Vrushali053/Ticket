import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateTicket.css';

function CreateTicket() {
  const [ticket, setTicket] = useState({
    userName: '',
    email: '',
    title: '',
    description: '',
    category: '',
    priority: '',
    status: 'Open',
    attachment: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTicket((prev) => ({ ...prev, attachment: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in ticket) {
        formData.append(key, ticket[key]);
      }

      await axios.post('http://localhost:5000/api/tickets', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Ticket Submitted!');
      setTicket({
        userName: '',
        email: '',
        title: '',
        description: '',
        category: '',
        priority: '',
        status: 'Open',
        attachment: null
      });
      document.getElementById('fileInput').value = null;
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Failed to submit ticket.');
    }
  };

  return (
    <div className="create-ticket-container">
      <h2>Create Helpdesk Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <input
          name="userName"
          value={ticket.userName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <input
          name="email"
          type="email"
          value={ticket.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />

        <input
          name="title"
          value={ticket.title}
          onChange={handleChange}
          placeholder="Issue Title"
          required
        />

        <textarea
          name="description"
          value={ticket.description}
          onChange={handleChange}
          placeholder="Describe your issue..."
          rows="4"
          required
        />

        <select
          name="category"
          value={ticket.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="General">General</option>
          <option value="Hardware">Hardware</option>
        </select>

        <select
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>

        <input
          id="fileInput"
          type="file"
          accept=".png,.jpg,.jpeg,.pdf,.docx"
          onChange={handleFileChange}
        />

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}

export default CreateTicket;
