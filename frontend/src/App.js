import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Tickets from './components/Tickets';
import CreateTicket from './components/CreateTicket';
import Profile from './components/Profile';
import UserRegister from './components/UserRegister';
import Login from './components/Login';
import AdminAssignTicket from './components/AdminAssignTicket';
import AgentTickets from './components/AgentTickets';
import Unauthorized from './components/Unauthorized';
import './App.css';

function PrivateRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user && allowedRoles.includes(user.role) ? children : <Navigate to="/unauthorized" />;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <SideNav />
        <div className="main-content">
          <TopNav />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Routes */}
              <Route path="/admin-assign" element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <AdminAssignTicket />
                </PrivateRoute>
              } />

              <Route path="/agent-tickets" element={
                <PrivateRoute allowedRoles={["Agent"]}>
                  <AgentTickets />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;