const User = require('../models/User');


const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, role } = req.body;
    
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const user = new User({
      username,
      role: role || 'buyer'
    });

    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  getUsers,
  createUser
};
