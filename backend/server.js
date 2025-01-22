// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Import routes
const mainAdminRouter = require('./routes/mainAdmin'); // Adjust path based on your structure
const guestAdminRouter = require('./routes/guestAdmin'); // Adjust path based on your structure

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Main Admin Panel!');
});

// Main Admin Routes
app.use('/api/main', mainAdminRouter);

// Guest Admin Routes
app.use('/api/guest', guestAdminRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
