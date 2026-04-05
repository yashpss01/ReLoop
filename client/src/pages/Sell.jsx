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
    condition: 'A'
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      alert('You must be logged in to sell products.');
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) return;

    try {
      setUploading(true);

      const configAuth = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      let uploadedImageUrl = '';

      // 1. Upload the Image native file to get the server path
      if (imageFile) {
        const fileData = new FormData();
        fileData.append('image', imageFile);

        const uploadConfig = {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...configAuth.headers
          }
        };

        const res = await axios.post('/api/upload', fileData, uploadConfig);
        uploadedImageUrl = res.data.image; // this will be like '/uploads/image-123.jpg'
      }

      // 2. Submit the product details with the retrieved image path
      await axios.post(
        '/api/products',
        { 
          ...formData, 
          imageUrl: uploadedImageUrl,
          sellerName: userInfo.username 
        },
        configAuth
      );
      
      setUploading(false);
      alert('Product listed successfully!');
      navigate('/products');
      
    } catch (error) {
      console.error('Error adding product', error);
      setUploading(false);
      alert('Failed to list product. Please try again.');
    }
  };

  if (!userInfo) return null;

  return (
    <div className="sell-page">
      <div className="auth-container" style={{maxWidth: '700px'}}>
        <h2 style={{textAlign:'left', marginBottom: '1rem'}}>List your Item</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Upload photos and details of your pre-owned item.</p>
        
        <form onSubmit={handleSubmit} className="sell-form">
          {/* File Upload Drop Area */}
          <div className="file-drop-area">
            <span className="file-msg">
              {imageFile ? imageFile.name : 'Choose a premium photo or drag it here'}
            </span>
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="file-input" 
            />
          </div>

          <div className="input-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Sony WH-1000XM4 Headphones" required />
          </div>
          
          <div className="input-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the item's features and history..." required />
          </div>
          
          <div style={{display: 'flex', gap: '1rem', flexDirection: 'row'}}>
            <div className="input-group" style={{flex: 1}}>
              <label>Price ($)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="49.99" required />
            </div>
            <div className="input-group" style={{flex: 1}}>
              <label>Condition</label>
              <select name="condition" value={formData.condition} onChange={handleChange}>
                <option value="A">A - Like New</option>
                <option value="B">B - Good</option>
                <option value="C">C - Fair</option>
              </select>
            </div>
          </div>
          
          <div className="input-group">
            <label>Seller Profile</label>
            <input type="text" value={userInfo.username} disabled style={{background: 'var(--card-bg)', opacity: 0.7}} />
          </div>
          
          <button type="submit" className="btn-primary" disabled={uploading} style={{marginTop: '1rem', padding: '1rem', fontSize: '1.1rem'}}>
            {uploading ? 'Processing Upload...' : 'List Product Live →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
