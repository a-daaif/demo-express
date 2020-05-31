const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true,
    unique: 'unique',
    minlength: 3,
    trim: true
  },
  password: {
    type: 'string',
    required: true,
    minlength: 4
  },
  role: {
    type: 'string',
    enum: ['admin', 'guest'],
    default: 'guest'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);