import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-content">
        <h1>Give your gear a <span>second life.</span></h1>
        <p>Join the ReLoop movement. Buy premium pre-owned products at a fraction of the cost, or sell your unused items securely.</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-primary">Shop Now</Link>
          <Link to="/sell" className="btn-secondary">Start Selling</Link>
        </div>
        <div className="hero-stats">
          <div><strong>10k+</strong><br/>Active Users</div>
          <div><strong>15k+</strong><br/>Items Relooped</div>
          <div><strong>4.8/5</strong><br/>Trust Score</div>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <img 
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000" 
          alt="Premium Pre-owned Sneakers" 
          className="hero-image"
        />
        <div className="floating-badge">♻️ Eco-Friendly Choice</div>
      </div>
    </div>
  );
};

export default Home;
