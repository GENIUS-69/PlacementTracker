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

// @desc    Update a test result
// @route   PUT /api/tests/:id
const updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a test result
// @route   DELETE /api/tests/:id
const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json({ message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTest, getTests, updateTest, deleteTest };
