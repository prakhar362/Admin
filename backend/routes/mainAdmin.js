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
router.get("/logout", async (req, res) => {
    try {
      res
        .clearCookie("token", { sameSite: "none", secure: true })
        .status(200)
        .json({ message: "User logged out successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
module.exports = router;
