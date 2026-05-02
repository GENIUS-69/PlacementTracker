const Roadmap = require('../models/Roadmap');
const ProgressLog = require('../models/ProgressLog');

// @desc    Get progress stats for all roadmaps
// @route   GET /api/analytics/progress
// @access  Public
const getProgressStats = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    const stats = {};

    roadmaps.forEach(roadmap => {
      let totalSubtopics = 0;
      let completedSubtopics = 0;

      roadmap.topics.forEach(topic => {
        totalSubtopics += topic.subtopics.length;
        completedSubtopics += topic.subtopics.filter(s => s.status === 'Completed').length;
      });

      stats[roadmap.name] = totalSubtopics > 0 
        ? Math.round((completedSubtopics / totalSubtopics) * 100) 
        : 0;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get weekly activity logs
// @route   GET /api/analytics/weekly
// @access  Public
const getWeeklyActivity = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const logs = await ProgressLog.find({
      timestamp: { $gte: sevenDaysAgo },
      status: 'Completed'
    }).sort({ timestamp: 1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProgressStats,
  getWeeklyActivity
};
