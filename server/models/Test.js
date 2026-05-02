const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topics: [{ type: String }],
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  weakAreas: [{ type: String }],
  date: { type: String, required: true } // YYYY-MM-DD
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);
