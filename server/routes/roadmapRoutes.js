const express = require('express');
const router = express.Router();
const { getRoadmap, updateSubtopicStatus } = require('../controllers/roadmapController');

router.get('/:name', getRoadmap);
router.patch('/:name/:topicId/:subtopicId', updateSubtopicStatus);

module.exports = router;
