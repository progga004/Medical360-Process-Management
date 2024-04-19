const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const Patient = require("../models/Patient");

jest.mock("../models/Patient");

const app = express();
app.use(bodyParser.json());

const patientRouter = require("../routes/patient-router");
app.use("/patients", patientRouter);

const cardiologyDepartmentId = "507f1f77bcf86cd799439011";  // Example ObjectId for Cardiology

describe("POST /patients", () => {
  it("should create a new patient and return 201 status", async () => {
    Patient.mockImplementation(() => {
      const save = jest.fn().mockResolvedValue({
        patientName: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "1234567890",
        healthInsurance: "HealthInsuranceProvider",
        sex: "male",
        age: "30",
        patientStatus: "admitted",
        roomNo: "101",
        department: cardiologyDepartmentId
      });
      return { save };
    });
    

    const newPatientData = {
      patientName: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "1234567890",
      healthInsurance: "HealthInsuranceProvider",
      sex: "male",
      age: "30",
      patientStatus: "admitted",
      roomNo: "101",
      department: cardiologyDepartmentId
    };

    const response = await request(app)
  .post("/patients")
  .send(newPatientData);

  // console.log(response.body);  
  expect(response.statusCode).toBe(201);
  expect(response.body.newPatient).toHaveProperty("patientName", "John Doe");
  expect(response.body.newPatient).toHaveProperty("department", cardiologyDepartmentId);

  });
});

