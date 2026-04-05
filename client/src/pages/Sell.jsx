import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sell = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'A',
  });

  useEffect(() => {
    if (!userInfo) {
      alert('You must be logged in to sell products.');
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        '/api/products',
        { ...formData, sellerName: userInfo.username },
        config
      );
      
      alert('Product listed successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error adding product', error);
      alert('Failed to list product');
    }
  };

  if (!userInfo) return null;

  return (
    <div className="sell-page">
      <h2>List a Product</h2>
      <form onSubmit={handleSubmit} className="sell-form">
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Condition:</label>
          <select name="condition" value={formData.condition} onChange={handleChange}>
            <option value="A">A - Like New</option>
            <option value="B">B - Good</option>
            <option value="C">C - Fair</option>
          </select>
        </div>
        <div>
          <label>Seller Name:</label>
          <input type="text" value={userInfo.username} disabled />
        </div>
        <button type="submit" className="btn-primary">List Product</button>
      </form>
    </div>
  );
};

export default Sell;
