const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedback-controller'); 

// POST route to create new feedback
router.post('/', FeedbackController.createFeedback);

// GET route to get all feedback entries
router.get('/all', FeedbackController.getAllFeedback);

// GET route to get single feedback by id
router.get('/:id', FeedbackController.getFeedback);

module.exports = router;
