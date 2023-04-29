const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 1
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      return validator.isEmail(value)
    }
  },
}, 
);

module.exports = User;