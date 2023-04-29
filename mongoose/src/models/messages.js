const mongoose = require('mongoose');
const validator = require('validator');

const Message = mongoose.model('Message', {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      words: {
        type: Object,
        required: true,
        validate(value) {
          if (!value) {
            throw new Error('You must provide a message');
          }
        }
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = Message;