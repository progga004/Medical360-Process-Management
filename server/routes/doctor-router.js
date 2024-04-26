const DoctorController = require("../controllers/doctor-controller");
const express = require("express");

const router = express.Router();


// update user by id
router.put("/:id", DoctorController.updateDoctor);


// get all doctors route
router.post('/all', DoctorController.getAllDoctors)

//get doctor by id
router.post("/:id", DoctorController.getDoctor);


module.exports = router