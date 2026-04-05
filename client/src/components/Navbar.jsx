import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ReLoop</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/products">Browse</Link></li>
        <li><Link to="/sell">Sell</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
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
