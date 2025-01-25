const QRCode = require("qrcode");  // Make sure you import QRCode
const Hotel = require("../../models/Hotel");  // Assuming you have a hotel model
const fs = require("fs");  // For cleaning up failed uploads if necessary

// Add Hotel (mainAddController)
const mainAddController = async (req, res) => {
  const { name, address, website,logo } = req.body;

  console.log("Logo filename: ",logo);
  const qrCodeData = website || name; // Use the website or name for QR code generation

  try {
    // Check if the hotel already exists
    const existingHotel = await Hotel.findOne({ name });
    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: 'Hotel with this name already exists',
      });
    }

    // Generate QR code
    const qrCode = await QRCode.toDataURL(qrCodeData); 
    

    // Create a new hotel instance
    const newHotel = new Hotel({
      name,
      address,
     qrCode: qrCode,
      logo:logo,  // store the logo file path
    });

    await newHotel.save();

    res.status(201).json({
      success: true,
      message: 'Hotel added successfully',
      data: newHotel,
    });
  } catch (error) {
    // Clean up logo file if upload failed and was saved to the filesystem
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete the uploaded file:', err);
      });
    }

    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to add hotel',
      error: error.message,
    });
  }
};

// Display Hotels (mainDisplayController)
const mainDisplayController = async (req, res) => {
  try {
    const hotels = await Hotel.find(); // Fetch all hotels from the database
    res.status(200).json({
      success: true,
      message: 'Hotels retrieved successfully',
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve hotels',
      error: error.message,
    });
  }
};

// Generate QR Code for Hotel (mainGenerateController)
const mainGenerateController = async (req, res) => {
  const { hotelId } = req.body;

  try {
    const hotel = await Hotel.findById(hotelId); // Fetch hotel by ID
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    const qrCodeUrl = await QRCode.toDataURL(hotel.qrCode); // Generate QR code for the URL stored in qrCode field

    res.status(200).json({
      success: true,
      message: 'QR code generated successfully',
      data: { qrCodeUrl },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate QR code',
      error: error.message,
    });
  }
};

module.exports = {
  mainAddController,
  mainDisplayController,
  mainGenerateController,
};
