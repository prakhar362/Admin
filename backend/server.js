// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Specify the folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } }); // Set a file size limit (50MB in this case)


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
