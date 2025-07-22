// Login.js (updated)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserRegister.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      const users = res.data;
      const foundUser = users.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (!foundUser) {
        alert('Invalid email or password.');
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify({
        userId: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      }));

      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;