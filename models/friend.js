

const mongoose = require('mongoose');

// Define the chat message schema
const frindSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the User model
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the User model
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the chat message model
const friend = mongoose.model('friend', frindSchema);

module.exports = friend;
