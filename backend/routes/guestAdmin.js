const express = require('express');
const router = express.Router();
const { registerGuestAdmin, loginGuestAdmin } = require('../controllers/Guest/login');
const {guestDisplay, guestEdit,guestView,guestAdd}=require('../controllers/Guest/tasks');

// Routes
router.post('/register', registerGuestAdmin); // Register Guest Admin
router.post('/login', loginGuestAdmin); // Login Guest Admin
router.post('/addGuest', guestAdd); // Add a new Guest Admin
router.get('/displayGuestDetails', guestDisplay); // Display Guest Details
router.put('/edit/:id', guestEdit); // Edit Guest Info
router.get('/view/:id', guestView); // View Guest Info

module.exports = router;
