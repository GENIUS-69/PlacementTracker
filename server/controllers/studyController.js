const StudySession = require('../models/StudySession');

// @desc    Log a study session
// @route   POST /api/study
const logStudySession = async (req, res) => {
  try {
    const { category, duration, date } = req.body;
    const session = await StudySession.create({ category, duration, date });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get study stats
// @route   GET /api/study/stats
const getStudyStats = async (req, res) => {
  try {
    const stats = await StudySession.aggregate([
      {
        $group: {
          _id: "$category",
          totalDuration: { $sum: "$duration" },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logStudySession, getStudyStats };
