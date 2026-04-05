import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { userInfo, logoutAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAuth();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ReLoop</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/products">Browse</Link></li>
        <li><Link to="/sell">Sell</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        {userInfo ? (
          <>
            <li>Hi, {userInfo.username}!</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" className="btn-primary">Login / Signup</Link></li>
        )}
        <li>
          <button onClick={toggleTheme}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
