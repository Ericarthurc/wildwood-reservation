const mongoose = require('mongoose');
const validator = require('validator');

// Custom casting; empty string to false
mongoose.Schema.Types.Boolean.convertToFalse.add('');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  serviceId: {
    type: String,
    required: true,
    trim: true
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    validate(value) {
      if (value < 0 && value > 10) {
        throw new Error('Must be greater than 0 but less than 10');
      }
    }
  },
  children: {
    type: Boolean,
    default: false
  },
  nursery: {
    type: Number,
    default: 0
  },
  twoYears: {
    type: Number,
    default: 0
  },
  threeYears: {
    type: Number,
    default: 0
  },
  fourYears: {
    type: Number,
    default: 0
  },
  kindergarten: {
    type: Number,
    default: 0
  },
  wildLife: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User;
