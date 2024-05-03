const express = require('express');
const router = express.Router();
const BugController = require('../controllers/bug-controller');

// POST route to report a new bug
router.post('/', BugController.createBug);

// POST route to get all reported bugs
router.post('/all', BugController.getAllBugs);

// POST route to get a single bug report by id
router.post('/:id', BugController.getBug);

module.exports = router;
