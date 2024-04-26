const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth-manager");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
require("dotenv").config()


// Function to get a patient by their ID
async function getDoctor(req, res) {
    try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) {
          return res.status(404).json({
              message: "patient not found"
          });
      }
      res.status(200).json({
          doctor
      });
    } catch (error) {
      res.status(500).json({
          message: error.message
      });
    }
  }
  
// Function to get all patients
async function getAllDoctors(req, res) {
    try {
        const doctors = await User.find({ doctor: { $ne: null } }).populate('doctor');
        console.log("Doctora",doctors);
            res.status(200).json({
                doctors
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


const DoctorController = {
    getAllDoctors,
    getDoctor,
    
}

module.exports = DoctorController