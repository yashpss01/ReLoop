import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', { username, email, password });
      loginAuth(res.data);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create an Account</h2>
        <p className="subtitle">Join ReLoop and start trading your gear today.</p>
        <form onSubmit={handleSignup} className="sell-form">
          <div className="input-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a cool alias" required />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@college.edu" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" required />
          </div>
          <button type="submit" className="btn-primary" style={{marginTop: '1rem', padding: '1rem', fontSize: '1.1rem'}}>Register Now</button>
        </form>
        <p style={{marginTop: '2rem', textAlign: 'center'}}>Already have an account? <Link to="/login" className="btn-link">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
