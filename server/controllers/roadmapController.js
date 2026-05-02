const Roadmap = require('../models/Roadmap');
const ProgressLog = require('../models/ProgressLog');

// @desc    Get all roadmaps or a specific one by name
// @route   GET /api/roadmaps/:name
// @access  Public
const getRoadmap = async (req, res) => {
  try {
    const { name } = req.params;
    const roadmap = await Roadmap.findOne({ name: new RegExp(`^${name}$`, 'i') });
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update subtopic status
// @route   PATCH /api/roadmaps/:name/:topicId/:subtopicId
// @access  Public
const updateSubtopicStatus = async (req, res) => {
  try {
    const { name, topicId, subtopicId } = req.params;
    const { status } = req.body;

    const roadmap = await Roadmap.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });

    const topic = roadmap.topics.find(t => t.topicId === topicId);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    const subtopic = topic.subtopics.find(s => s.subtopicId === subtopicId);
    if (!subtopic) return res.status(404).json({ message: 'Subtopic not found' });

    subtopic.status = status;
    subtopic.completedAt = status === 'Completed' ? new Date() : null;

    await roadmap.save();

    // Log the progress
    await ProgressLog.create({
      roadmap: roadmap.name,
      topicId,
      subtopicId,
      status,
      timestamp: new Date()
    });

    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRoadmap,
  updateSubtopicStatus
};
