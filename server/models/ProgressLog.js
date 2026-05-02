const mongoose = require('mongoose');

const progressLogSchema = new mongoose.Schema({
  roadmap: { type: String, required: true },
  topicId: { type: String, required: true },
  subtopicId: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressLog', progressLogSchema);
