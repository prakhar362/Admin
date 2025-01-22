const mongoose = require('mongoose');

const guestAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, // Associated hotel
  role: { type: String, default: 'guest_admin' }, // Role for distinguishing guest admin
});

module.exports = mongoose.model('GuestAdmin', guestAdminSchema);
