const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const Patient = require("../models/Patient"); 

jest.mock("../models/Patient");

const app = express();
app.use(bodyParser.json()); 

const patientRouter = require("../routes/patient-router"); 
app.use("/patients", patientRouter); 
describe("POST /patients", () => {
  it("should create a new patient and return 201 status", async () => {
    Patient.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        patientName: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "1234567890",
        healthInsurance: "HealthInsuranceProvider",
        sex: "male",
        age: "30",
        patientStatus: "admitted",
        roomNo: "101",
      }),
    }));

    const newPatientData = {
      patientName: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "1234567890",
      healthInsurance: "HealthInsuranceProvider",
      sex: "male",
      age: "30",
      patientStatus: "admitted",
      roomNo: "101",
    };

    const response = await request(app)
      .post("/patients") 
      .send(newPatientData);

    expect(response.statusCode).toBe(201);
    expect(response.body.newPatient).toHaveProperty("patientName", "John Doe"); 
  });

});
