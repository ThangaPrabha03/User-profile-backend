const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
