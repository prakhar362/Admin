const mongoose = require('mongoose');
const Hotel = require('./Hotel'); // Import the Hotel model

const guestSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: {type: String,required: true,},
  purposeOfVisit: {
    type: String,
    enum: ['Business', 'Personal', 'Tourist'],
    required: true,
  },
  stayFrom: { type: Date, required: true,},

  stayTo: {type: Date,required: true,},
  idProofNumber: {
    type: String,
    required: true,
    unique: true,
  },

});

module.exports = mongoose.model('Guest', guestSchema);
