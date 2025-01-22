const express = require('express');
const router = express.Router();
const { registerMainAdmin, loginMainAdmin } = require('../controllers/Main/login');

// Routes
router.post('/register', registerMainAdmin); // Register Main Admin
router.post('/login', loginMainAdmin); // Login Main Admin

module.exports = router;
