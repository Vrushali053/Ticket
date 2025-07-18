import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tickets')
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Tickets List</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> by {ticket.userName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
