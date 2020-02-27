const mongoose = require('mongoose');
const validator = require('validator');

const Service = mongoose.model('Service', {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  seats: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Must be a postive number');
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Service;
