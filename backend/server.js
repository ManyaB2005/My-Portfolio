// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const Message = require('./models/Message'); 

const app = express();

// --- MIDDLEWARE ---
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

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

// --- ROUTES ---
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send Notification Email
    // We use the sender's name in the 'from' field and their email in 'replyTo'
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      replyTo: email, 
      to: process.env.EMAIL_USER,
      subject: `Connect Request: ${name}`,
      text: `You have a new connection request:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: 'Message stored and email sent!' });
  } catch (error) {
    console.error('Email/Database Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// --- SERVER ACTIVATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});