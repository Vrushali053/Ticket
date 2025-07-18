import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserRegister.css';

function UserRegister() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', user);
      alert("Registration successful!");

      localStorage.setItem('currentUser', JSON.stringify({
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role
      }));

      navigate('/dashboard');

    } catch (err) {
      alert("Registration failed: " + err.response.data.error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" type="text" onChange={handleChange} placeholder="Name" required />
          <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
