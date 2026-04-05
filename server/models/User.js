const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['buyer', 'seller'],
      default: 'buyer'
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
