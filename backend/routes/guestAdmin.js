const express = require('express');
const router = express.Router();
const { registerGuestAdmin, loginGuestAdmin } = require('../controllers/Guest/login');

// Routes
router.post('/register', registerGuestAdmin); // Register Guest Admin
router.post('/login', loginGuestAdmin); // Login Guest Admin

module.exports = router;
