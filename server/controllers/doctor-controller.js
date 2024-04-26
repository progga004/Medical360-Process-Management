const Doctor = require('../models/Doctor')

async function updateDoctor(req, res) {
    try {
      // Construct the update object with $set operator
      let id = req.params.id;
      const updateObject = { $set: req.body };
  
      // Use findOneAndUpdate to update the user document
      const updatedDoctor = await Doctor.findOneAndUpdate(
        { _id: id },
        updateObject,
        { new: true } // Return the updated document
      );
  
      if (!updatedDoctor) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      res.status(200).json({
        doctor: updatedDoctor,
        message: "Updated doctor",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Function to get a doctor by their ID
async function getDoctor(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find()

    res.status(200).json({
      doctors
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
  }
}

  const DoctorController = {
    updateDoctor,
    getDoctor,
    getAllDoctors
  }

  module.exports = DoctorController;