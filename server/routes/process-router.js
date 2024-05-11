const express = require('express');
const router = express.Router();
const ProcessController = require('../controllers/process-controller'); 

// POST route to create a new room
router.post('/', ProcessController.createProcess);

// PUT to update room data by id
router.put('/:id', ProcessController.updateProcess);

router.put('/add-procedure/:id', ProcessController.addProcedure);

// GET route to get all rooms
router.post('/all', ProcessController.getAllProcesses);

// GET route to get single room by id
router.post('/:id', ProcessController.getProcess);

// DELETE route to delete a specific room by ID
router.delete('/:id', ProcessController.deleteProcess);

module.exports = router;