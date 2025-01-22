const mongoose = require('mongoose');
const Hotel = require('./Hotel'); // Import the Hotel model

const guestSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
});

module.exports = mongoose.model('Guest', guestSchema);
