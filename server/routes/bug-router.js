const express = require('express');
const router = express.Router();
const BugController = require('../controllers/bug-controller');

// POST route to report a new bug
router.post('/', BugController.createBug);

// GET route to get all reported bugs
router.get('/all', BugController.getAllBugs);

// GET route to get a single bug report by id
router.get('/:id', BugController.getBug);

module.exports = router;
