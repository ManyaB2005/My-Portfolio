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
// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 15000, // Increase wait time to 15 seconds
  greetingTimeout: 15000
});

// --- ROUTES ---
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send Notification Email
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      replyTo: email, 
      to: process.env.EMAIL_USER,
      subject: `Connect Request: ${name}`,
      text: `You have a new connection request:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // This will now wait longer for the connection
    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: 'Message stored and email sent!' });
  } catch (error) {
    console.error('Email/Database Error:', error);
    // Returning error message to frontend to help debugging
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- SERVER ACTIVATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});