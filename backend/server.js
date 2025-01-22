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
  .then(() => console.log('Connected to MongoDB Successfuly'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Main Admin Panel!');
});
/* Main Admin Routes:
/login
/addHotel
/displayHotel
/generateQR
*/
app.use('/api/main', );
app.use('/api/guest', );



/* Guest Admin Routes:
/login
/displayGuestDetails
/edit guest info/:id
/viewguestinfo/:id
*/



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});