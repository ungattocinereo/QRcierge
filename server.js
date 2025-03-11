require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
let dbConnected = false;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qrcierge', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  dbConnected = true;
}).catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Continuing without database connection. Requests will not be saved to database.');
});

// Request Schema
const requestSchema = new mongoose.Schema({
  type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

const Request = mongoose.model('Request', requestSchema);

// Telegram Bot Setup
let bot;
if (process.env.TELEGRAM_BOT_TOKEN) {
  bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
  console.log('Telegram bot initialized');
} else {
  console.warn('TELEGRAM_BOT_TOKEN not provided. Telegram notifications disabled.');
}

// API Routes
app.post('/api/requests', async (req, res) => {
  try {
    const { type } = req.body;
    
    if (!type) {
      return res.status(400).json({ error: 'Request type is required' });
    }
    
    // Create new request in database only if connected
    let newRequest;
    if (dbConnected) {
      newRequest = new Request({ type });
      await newRequest.save();
    } else {
      newRequest = { type, timestamp: new Date(), status: 'pending' };
    }
    
    // Send Telegram notification
    if (bot && process.env.TELEGRAM_CHAT_ID) {
      const date = new Date();
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      
      const message = `New Request:\nDate: ${formattedDate}\nTime: ${formattedTime}\nType: ${type}`;
      
      bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message)
        .catch(err => console.error('Error sending Telegram message:', err));
    }
    
    res.status(201).json({ success: true, request: newRequest });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all requests (for future admin interface)
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await Request.find().sort({ timestamp: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});