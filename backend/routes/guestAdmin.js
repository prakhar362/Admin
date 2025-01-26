const express = require('express');
const router = express.Router();
const { registerGuestAdmin, loginGuestAdmin } = require('../controllers/Guest/login');
const {guestDisplay, guestEdit,guestView,guestAdd}=require('../controllers/Guest/tasks');

// Routes
router.post('/register', registerGuestAdmin); // Register Guest Admin
router.post('/login', loginGuestAdmin); // Login Guest Admin
router.post('/addGuest', guestAdd); // Add a new Guest Admin
router.post('/displayGuestDetails', guestDisplay); // Display Guest Details
router.put('/edit/:id', guestEdit); // Edit Guest Info
router.get('/view/:id', guestView); // View Guest Info
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
