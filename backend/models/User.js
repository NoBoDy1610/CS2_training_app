const mongoose = require('mongoose');

// Definition of user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Role can be either 'user' or 'admin'
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: null, // Initially null until the user logs in
  },
});

// Model export
const User = mongoose.model('User', userSchema);
module.exports = User;
