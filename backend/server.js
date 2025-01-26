// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path=require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://admin-3c1i.vercel.app', 'http://localhost:8081']; // Add specific origins and '*'
    
    if (!origin || allowedOrigins.includes(origin) || origin === '*') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers)
}));
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

const uploadDir = path.join(__dirname, 'images');

// Create the images directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/images", express.static(path.join(__dirname, "images")));

// Set up multer for file uploads with destination and filename customization
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    // Set the destination folder for file uploads
    fn(null, "images"); // The "images" folder must exist in your project
  },
  filename: (req, file, fn) => {
    // Generate a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    fn(null, uniqueSuffix + path.extname(file.originalname)); // Append the original file extension
  },
});

// Create the multer upload instance with the storage configuration
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
      console.log("Uploaded file info:", req.file);
      res.status(200).json({
          message: "Image has been uploaded successfully!",
          filePath: `/images/${req.file.filename}`, // Return the file path
      });
  } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Failed to upload image" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
