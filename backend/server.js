// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Message = require('./models/Message'); 

const app = express();

// --- MIDDLEWARE ---
// Replace the origin below with your ACTUAL live Vercel URL if it ever changes
app.use(cors({
  origin: 'https://my-portfolio-beige-phi-64.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json()); 

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Database Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error: ', err));

// --- ROUTES ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'System Online' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// --- SERVER ACTIVATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});