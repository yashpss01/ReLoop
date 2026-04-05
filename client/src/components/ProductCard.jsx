import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Safe Fallback if the user older testing models didn't include an Image Upload.
  const placeholderImg = `https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600`;
  const imageSource = product.imageUrl ? product.imageUrl : placeholderImg;

  return (
    <div className="product-card">
      <div className="card-image-container">
        <img src={imageSource} alt={product.title} className="card-image" />
        <span className="condition-badge">{product.condition}</span>
      </div>
      <div className="card-content">
        <h3>{product.title}</h3>
        <p className="seller-info">By {product.sellerName} <span className="trust-flare">★ {product.trustScore}</span></p>
        <div className="card-footer">
          <p className="price">${product.price}</p>
          <Link to={`/products/${product._id}`} className="btn-link">View Details &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
