
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Department = require('../models/Department');
const path = require('path');
const DepartmentController = require("../controllers/department-controller")
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
  

// Configure storage using Multer and Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'departments',
      format: async (req, file) => 'png', 
      public_id: (req, file) => new Date().toISOString() + '-' + file.originalname
    },
  });

const upload = multer({ storage: storage });
// POST route to create a new department with image upload
router.post('/department', upload.single('Icon'), (req, res) => {
    console.log("here I am");
    const newDepartment = new Department({
       
        departmentName: req.body.Name,
        iconPath: req.file ? req.file.path : null  
    });

    newDepartment.save()
        .then(department => res.status(201).json(department))
        .catch(error => res.status(400).json({ error: 'Error saving department: ' + error }));
});



 //get all departments
router.get('/alldepartments', (req, res) => {
    console.log("Here");
    Department.find()
        .then(departments => res.json(departments))
        .catch(error => res.status(500).json({ error: 'Error fetching departments: ' + error.message }));
});

// delete route to delete a department
router.delete('/:id', (req, res) => {
    Department.findOneAndDelete({ _id: req.params.id })
        .then(result => {
            if (result) {
                res.json({ message: 'Department deleted successfully!' });
            } else {
                res.status(404).json({ error: 'Department not found' });
            }
        })
        .catch(error => res.status(400).json({ error: 'Error deleting department: ' + error }));
});

// get all departments
router.post('/', DepartmentController.getAllDepartments)

// update department by id
router.put('/:id', DepartmentController.updateDepartment)

// get department by id
router.get('/:id', DepartmentController.getDepartment)

module.exports = router;

