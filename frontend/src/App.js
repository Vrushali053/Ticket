import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Tickets from './components/Tickets';
import CreateTicket from './components/CreateTicket';
import Profile from './components/Profile';
import UserRegister from './components/UserRegister';
import Login from './components/Login';
import './App.css';

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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
