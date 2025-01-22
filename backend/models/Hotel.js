const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  logo: { type: String }, // Path to the logo
  qrCode: { type: String }, // Path to the QR code
});

module.exports = mongoose.model('Hotel', hotelSchema);
