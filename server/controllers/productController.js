const Product = require('../models/Product');


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, price, condition, sellerName } = req.body;

    if (!title || !description || !price || !condition || !sellerName) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Could build a more sophisticated score but sticking to simple for now.
    const trustScore = Math.floor(Math.random() * 5) + 5; // Score between 5 and 9

    const product = new Product({
      title,
      description,
      price,
      condition,
      sellerName,
      trustScore,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
