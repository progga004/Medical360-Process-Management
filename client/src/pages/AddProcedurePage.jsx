import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useProcessContext } from '../hooks/useProcessContext';
import { TextField, Grid, Button } from '@mui/material';
import { TimePicker, DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


function AddProcedurePage() {

  const { currentPatient, getPatient, doctors, getAllDoctors, departments, id_to_department, getAllDepartments } = useGlobalContext();
  const { addProcedure, getProcess } = useProcessContext();
  const [operation, setOperation] = useState("");
  const [notes, setNotes] = useState("");
  const [currentDoctor, setDoctor] = useState("");
  const [room, setRoom] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState(dayjs(Date.now()));
  const [endDate, setEndDate] = useState(startDate);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      await getAllDepartments();
    }
    const fetchDoctors = async () => {
      await getAllDoctors();
    }

    if (!doctors)
      fetchDoctors()

    if (!departments)
      fetchDepartments();
  }, [doctors, departments]);

  const combineDateAndTime = (dateObj, timeObj) => {
    // Extract date components from the first Day.js object
    const year = dateObj.year();
    const month = dateObj.month();
    const day = dateObj.date();

    // Extract time components from the second Day.js object
    const hour = timeObj.hour();
    const minute = timeObj.minute();
    const second = timeObj.second();
    const millisecond = timeObj.millisecond();

    // Combine date and time components to create a new Day.js object
    return new Date(dayjs().year(year).month(month).date(day)
        .hour(hour).minute(minute).second(second).millisecond(millisecond));
    }

  const addProcess = async () => {
    let newStartTime = combineDateAndTime(startDate, startTime);
    let newEndTime = combineDateAndTime(endDate, endTime);
    if (currentPatient) {
      if (!notes || !currentDoctor || !department || !room || !startDate || !startTime || !endDate || !endTime) {
        alert("Please fill in all fields");
        return;
      }

      // update patient, get them, and return to patient info page
      let newProcedure = {
        "start": newStartTime,
        "end": newEndTime,
        "operation": operation,
        "notes": notes,
        "roomNo": room,
        "doctor": currentDoctor,
        "department": department
      };

      await addProcedure(currentPatient.process, newProcedure);
      await getProcess(currentPatient.process);
      await getPatient(currentPatient._id);
      navigate(`/patient-info/${currentPatient._id}`);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Banner goBackPath={`/patient-info/${currentPatient._id}`} />
      <div className="flex justify-center items-center h-screen bg-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">Add Procedure for {currentPatient.patientName}</h1>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900">
                Operation (if needed)
              </label>
              <input
                type="text"
                value={operation}
                className="mt-1 p-2 border border-blue-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setOperation(event.target.value)}
              />
            </div>
            {doctors && <div>
              <label className="block text-sm font-medium text-blue-900">
                Overseeing Doctor
              </label>
              <div className="relative mt-1">
                <select
                  value={currentDoctor}
                  onChange={(event) => setDoctor(event.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-blue-300 rounded-md bg-white text-blue-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {doctors.map(doc => <option key={doc._id} value={doc._id}>{doc.name}</option>)}
                </select>
              </div>
            </div>}
            {departments && <div>
              <label className="block text-sm font-medium text-blue-900">
                Department
              </label>
              <div className="relative mt-1">
                <select
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-blue-300 rounded-md bg-white text-blue-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {departments.map(dep => <option key={dep._id} value={dep._id}>{dep.departmentName}</option>)}
                </select>
              </div>
            </div>}
            <div>
              <label className="block text-sm font-medium text-blue-900">
                Room
              </label>
              <input
                type="text"
                value={room}
                className="mt-1 p-2 border border-blue-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setRoom(event.target.value)}
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-blue-900">
                Notes
              </label>
              <textarea
                rows="3"
                value={notes}
                className="mt-1 p-2 border border-blue-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(event) => setNotes(event.target.value)}
              ></textarea>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900">
                    Start Date
                  </label>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => {setStartDate(newValue); if (newValue > endDate) setEndDate(newValue)}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900">
                    Start Time
                  </label>
                  <TimePicker
                    value={startTime}
                    onChange={(newValue) => {setStartTime(newValue); if (newValue > endTime) setEndTime(newValue)}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900">
                    End Date
                  </label>
                  <DatePicker
                    value={endDate}
                    onChange={(newValue) => {setEndDate(newValue); if (newValue < startDate) setStartDate(newValue)}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900">
                    End Time
                  </label>
                  <TimePicker
                    value={endTime}
                    onChange={(newValue) => {setEndTime(newValue); if (newValue < startTime) setStartTime(newValue)}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <Button
              variant="contained"
              color="primary"
              className="px-8 py-3 rounded-lg font-semibold"
              onClick={addProcess}
            >
              Add Process
            </Button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default AddProcedurePage;