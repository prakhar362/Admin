const express = require('express');
const router = express.Router();
const mainLoginController = require('../controllers/Main/login');
const mainAddController=require('../controllers/Main/addHotel');
const mainDisplayController=require('../controllers/Main/displayHotel');
const mainGenerateController=require('../controllers/Main/generateQR');


// Main Admin Routes:api/main/
router.post('/login', mainLoginController); // Login
router.post('/addHotel', mainAddController); // Add Hotel
router.get('/displayHotel', mainDisplayController); // Display Hotels
router.post('/generateQR', mainGenerateController); // Generate QR Code

module.exports = router;
