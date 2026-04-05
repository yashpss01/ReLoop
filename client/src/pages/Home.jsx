import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero">
        <h1>Welcome to ReLoop</h1>
        <p>Your favorite place to buy and sell pre-owned products.</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
        <Link to="/sell" className="btn-secondary">Start Selling</Link>
      </header>
    </div>
  );
};

export default Home;
