import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

import '../styles/Dashboard.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tickets')
      .then(res => setTickets(res.data))
      .catch(err => console.log(err));
  }, []);

  const totalTickets = tickets.length;

  // Example: count open & closed tickets (assuming you have 'status' field)
  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const closedTickets = tickets.filter(t => t.status === 'Closed').length;

  // Pie chart data
  const pieData = {
    labels: ['Open', 'Closed'],
    datasets: [
      {
        data: [openTickets, closedTickets],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ['Open Tickets', 'Closed Tickets'],
    datasets: [
      {
        label: 'Tickets',
        data: [openTickets, closedTickets],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Tickets</h3>
          <p>{totalTickets}</p>
        </div>
        <div className="card">
          <h3>Open Tickets</h3>
          <p>{openTickets}</p>
        </div>
        <div className="card">
          <h3>Closed Tickets</h3>
          <p>{closedTickets}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <div className="chart-card">
          <h3>Ticket Status (Pie Chart)</h3>
          <Pie data={pieData} />
        </div>

        <div className="chart-card">
          <h3>Ticket Status (Bar Chart)</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
