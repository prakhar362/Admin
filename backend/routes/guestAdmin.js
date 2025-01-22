const express = require('express');
const router = express.Router();
const guestloginController = require('../controllers/Guest/login');
const guestDisplayController=require('../controllers/Guest/display');
const guestEditController=require('../controllers/Guest/edit');
const guestViewController=require('../controllers/Guest/view');

// Guest Admin Routes: api/guest
router.post('/login', guestloginController); // Login
router.get('/displayGuestDetails', guestDisplayController); // Display Guest Details
router.put('/edit/:id', guestEditController); // Edit Guest Info
router.get('/view/:id', guestViewController); // View Guest Info

module.exports = router;
