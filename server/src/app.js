const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('../routes/productRoutes'));
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/upload', require('../routes/uploadRoutes'));

// Static Folder for Native Uploads
app.use('/uploads', express.static(path.join(__dirname, '../../server/uploads')));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ReLoop Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('ReLoop Backend API Service');
});

module.exports = app;
