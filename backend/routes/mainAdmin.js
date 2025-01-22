const express = require('express');
const router = express.Router();
const { registerMainAdmin, loginMainAdmin } = require('../controllers/Main/login');
const {mainAddController,mainDisplayController , mainGenerateController}=require('../controllers/Main/tasks');

// Routes
router.post('/register', registerMainAdmin); // Register Main Admin
router.post('/login', loginMainAdmin); // Login Main Admin
router.post('/addHotel', mainAddController); // Add Hotel
router.get('/displayHotel', mainDisplayController); // Display Hotels
router.post('/generateQR', mainGenerateController); // Generate QR Code

module.exports = router;
