import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToWishlist = () => {
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!saved.find(item => item._id === product._id)) {
      saved.push(product);
      localStorage.setItem('wishlist', JSON.stringify(saved));
      alert('Added to wishlist!');
    } else {
      alert('Already in wishlist!');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <p className="price">${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Condition:</strong> {product.condition}</p>
      <p><strong>Seller:</strong> {product.sellerName} (Trust: {product.trustScore}/10)</p>
      <button onClick={addToWishlist} className="btn-primary">Add to Wishlist</button>
    </div>
  );
};

export default ProductDetails;
