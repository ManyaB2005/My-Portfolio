// --- DEPENDENCIES ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the database blueprint we just created
const Message = require('./models/Message'); 

// --- INITIALIZATION ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Database Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error: ', err));

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 

// --- ROUTES ---

// 1. Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'System Online: MERN API is running optimally.' });
});

// 2. Contact Form Route (Receives data from React)
app.post('/api/contact', async (req, res) => {
  try {
    // Extract the data sent from the frontend
    const { name, email, message } = req.body;

    // Create a new entry in the database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    console.log(`📩 New message received from: ${email}`);
    
    // Send a success response back to the frontend
    res.status(201).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, message: 'Server Error. Please try again later.' });
  }
});

// --- SERVER ACTIVATION ---
app.listen(PORT, () => {
  console.log(`\n======================================`);
  console.log(`🚀 SERVER RUNNING ON PORT: ${PORT}`);
  console.log(`======================================\n`);
});