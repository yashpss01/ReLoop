const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C'], // A = like new, B = good, C = fair
    },
    sellerName: {
      type: String,
      required: true,
    },
    trustScore: {
      type: Number,
      default: 5, // Starts at 5 (out of 10 maybe)
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
