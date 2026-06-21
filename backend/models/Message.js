const mongoose = require('mongoose');

// Define the blueprint for a contact message
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the model so our server can use it
module.exports = mongoose.model('Message', messageSchema);