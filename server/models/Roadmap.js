const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  subtopicId: { type: String }, // Made optional as seeder will generate it
  title: { type: String, required: true },
  children: [{ type: String }], // Added support for DSA children blocks
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed'], 
    default: 'Pending' 
  },
  completedAt: { type: Date, default: null }
});

const topicSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  title: { type: String, required: true },
  subtopics: [subtopicSchema]
});

const roadmapSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "DSA", "DevOps", "System Design"
  topics: [topicSchema]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
