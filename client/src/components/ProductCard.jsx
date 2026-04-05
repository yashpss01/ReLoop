import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>Condition: {product.condition}</p>
      <p>Seller: {product.sellerName} (Trust: {product.trustScore})</p>
      <p className="price">${product.price}</p>
      <Link to={`/products/${product._id}`} className="btn-link">View Details</Link>
    </div>
  );
};

export default ProductCard;
