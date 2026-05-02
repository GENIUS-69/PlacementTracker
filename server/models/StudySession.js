const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., "DSA", "DevOps"
  duration: { type: Number, required: true }, // in minutes
  date: { type: String, required: true } // YYYY-MM-DD
}, { timestamps: true });

module.exports = mongoose.model('StudySession', studySessionSchema);
