const Test = require('../models/Test');

// @desc    Create a new test result
// @route   POST /api/tests
const createTest = async (req, res) => {
  try {
    const { title, topics, score, total, weakAreas, date } = req.body;
    const test = await Test.create({ title, topics, score, total, weakAreas, date });
    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all test results
// @route   GET /api/tests
const getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTest, getTests };
