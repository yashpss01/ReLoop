import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(saved);
  }, []);

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      <div className="product-grid">
        {wishlist.length > 0 ? (
          wishlist.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
