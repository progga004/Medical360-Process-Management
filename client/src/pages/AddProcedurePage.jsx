import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import { useGlobalContext } from '../hooks/useGlobalContext';

function AddProcedurePage() {

  const { currentPatient, updatePatient, getPatient } = useGlobalContext();
  const [operation, setOperation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const addProcess = async () => {
    if (currentPatient) {
      if (!notes) {
        console.log("No");
        return 
      }

      // update patient, get them, and return to patient info page
      let newProcedure = {
        "date": Date.now(),
        "Operation": operation,
        "Notes": notes
      };

      await updatePatient(currentPatient._id, {
        procedures: [...currentPatient.procedures, newProcedure]
      });
      await getPatient(currentPatient._id);
      navigate("/patient-info");
    }
  }

  return (
    <>
      <Banner goBackPath={"/patient-info"} />
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
          </form>
          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800"
              onClick={addProcess}
            >
              Add Process
            </button>
          </div>
        </div>
      </div>
    </>
    );
}

export default AddProcedurePage;