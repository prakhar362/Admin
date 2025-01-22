const Guest = require('../../models/Guest');

// Add a new guest to the database
const guestAdd = async (req, res) => {
  const { hotelId, name, email, phone } = req.body;

  try {
    // Check if the guest already exists by email
    const existingGuest = await Guest.findOne({ email });
    if (existingGuest) {
      return res.status(400).json({
        success: false,
        message: 'Guest with this email already exists',
      });
    }

    // Create a new guest instance
    const newGuest = new Guest({
      hotelId,
      name,
      email,
      phone, // Phone is optional, so no error if not provided
    });

    // Save the new guest to the database
    await newGuest.save();

    res.status(201).json({
      success: true,
      message: 'Guest added successfully',
      data: newGuest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add guest',
      error: error.message,
    });
  }
};

// Display all guest details
const guestDisplay = async (req, res) => {
  try {
    const guests = await Guest.find().populate('hotelId', 'name email phone'); // Fetch all guests and populate associated hotel details
    res.status(200).json({
      success: true,
      message: 'Guest details retrieved successfully',
      data: guests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve guest details',
      error: error.message,
    });
  }
};

// Edit guest details by ID
const guestEdit = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedGuest = await Guest.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!updatedGuest) {
      return res.status(404).json({
        success: false,
        message: 'Guest not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Guest updated successfully',
      data: updatedGuest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update guest',
      error: error.message,
    });
  }
};

// View guest details by ID
const guestView = async (req, res) => {
  const { id } = req.params;

  try {
    const guest = await Guest.findById(id).populate('hotelId', 'name email phone'); // Populate hotel details

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: 'Guest not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Guest retrieved successfully',
      data: guest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve guest details',
      error: error.message,
    });
  }
};

module.exports = {
  guestDisplay,
  guestEdit,
  guestView,
  guestAdd,
};
