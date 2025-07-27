// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/CreateTicket.css';

// function CreateTicket() {
//   const [form, setForm] = useState({
//     userName: '',
//     email: '',
//     title: '',
//     description: '',
//     category: '',
//     priority: '',
//     assignee: ''
//   });

//   const [agents, setAgents] = useState([]);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/agents');
//         setAgents(res.data);
//       } catch (err) {
//         console.error('Failed to fetch agents:', err);
//       }
//     };
//     fetchAgents();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/tickets', form);
//       alert(`Ticket created successfully and assigned to ${res.data.assignee?.name || "No agent available"}`);
//     } catch (err) {
//       alert("Error: " + err.response?.data?.error);
//     }
//   };

//   return (
//     <div className="create-ticket-container">
//       <h2>Submit a Ticket</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="userName" onChange={handleChange} placeholder="Your Name" required />
//         <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
//         <input name="title" onChange={handleChange} placeholder="Issue Title" required />
//         <textarea name="description" onChange={handleChange} placeholder="Describe the issue" required />

//         <select name="category" onChange={handleChange} required>
//           <option value="">Select Category</option>
//           <option value="General">General</option>
//           <option value="Technical">Technical</option>
//           <option value="Billing">Billing</option>
//         </select>

//         <select name="priority" onChange={handleChange} required>
//           <option value="">Select Priority</option>
//           <option value="Low">Low</option>
//           <option value="Medium">Medium</option>
//           <option value="High">High</option>
//         </select>

//         {/* <select name="assignee" onChange={handleChange} required>
//           <option value="">Select Assignee</option>
//           {agents.map((agent) => (
//             <option key={agent._id} value={agent._id}>
//               {agent.name} ({agent.email})
//             </option>
//           ))}
//         </select> */}

//         <button type="submit">Submit Ticket</button>
//       </form>
//     </div>
//   );
// }

// export default CreateTicket;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateTicket.css';

function CreateTicket() {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    title: '',
    description: '',
    category: '',
    priority: '',
    assignee: ''
  });

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/agents`);
        setAgents(res.data);
      } catch (err) {
        console.error('Failed to fetch agents:', err);
      }
    };
    fetchAgents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/tickets`, form);
      alert(`Ticket created successfully and assigned to ${res.data.assignee?.name || "No agent available"}`);
    } catch (err) {
      alert("Error: " + err.response?.data?.error || "Ticket creation failed");
    }
  };

  return (
    <div className="create-ticket-container">
      <h2>Submit a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input name="userName" onChange={handleChange} placeholder="Your Name" required />
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
        <input name="title" onChange={handleChange} placeholder="Issue Title" required />
        <textarea name="description" onChange={handleChange} placeholder="Describe the issue" required />

        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="General">General</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
        </select>

        <select name="priority" onChange={handleChange} required>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Optional: Enable if you want to allow users to pick assignees manually */}
        {/* <select name="assignee" onChange={handleChange} required>
          <option value="">Select Assignee</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name} ({agent.email})
            </option>
          ))}
        </select> */}

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}

export default CreateTicket;
