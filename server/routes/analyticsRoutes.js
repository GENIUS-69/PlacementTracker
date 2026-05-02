const express = require('express');
const router = express.Router();
const { getProgressStats, getWeeklyActivity } = require('../controllers/analyticsController');

router.get('/progress', getProgressStats);
router.get('/weekly', getWeeklyActivity);

module.exports = router;
