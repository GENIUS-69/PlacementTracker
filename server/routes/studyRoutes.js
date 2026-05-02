const express = require('express');
const router = express.Router();
const { logStudySession, getStudyStats } = require('../controllers/studyController');

router.post('/', logStudySession);
router.get('/stats', getStudyStats);

module.exports = router;
