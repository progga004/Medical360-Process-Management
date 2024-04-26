const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const DoctorController = require('../controllers/doctor-controller');




// GET route to get all doctors
router.post("/all", DoctorController.getAllDoctors);

// GET route to get single doctor by id
router.post("/:id", DoctorController.getDoctor);

// GET route to retrieve a specific doctor by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Doctor.findById(id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.status(200).json(patient);
        })
        .catch(error => res.status(500).json({ error: 'Error fetching doctor: ' + error }));
});


module.exports = router;