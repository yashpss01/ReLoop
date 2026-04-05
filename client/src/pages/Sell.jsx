import React, { useState } from 'react';
import axios from 'axios';

const Sell = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'A',
    sellerName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/products', formData);
      alert('Product listed successfully!');
      setFormData({ title: '', description: '', price: '', condition: 'A', sellerName: '' });
    } catch (error) {
      console.error('Error adding product', error);
      alert('Failed to list product');
    }
  };

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
          <input type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-primary">List Product</button>
      </form>
    </div>
  );
};

export default Sell;
