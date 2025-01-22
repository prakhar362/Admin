const mongoose = require('mongoose');

const mainAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'main_admin' }, // Role for distinguishing admin types
});

module.exports = mongoose.model('MainAdmin', mainAdminSchema);
