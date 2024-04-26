import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useAuthContext } from "../hooks/useAuthContext";


const PatientInfo = ({}) => {
  const { currentPatient, id_to_department, updatePatient, removeCurrentDoctor,
    doctors, getAllDoctors, updateDoctor, currentDoctor, getDoctor, BASE_URL } = useGlobalContext();
  const { user } = useAuthContext();
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDoctor(doctorId) {
      await getDoctor(doctorId);
    }
    async function fetchDoctors() {
      await getAllDoctors();
    }
    if (!doctors)
      fetchDoctors();
    if (currentPatient && currentPatient.doctorAssigned)
      fetchDoctor(currentPatient.doctorAssigned);
    else
      removeCurrentDoctor();
  }, [doctors, currentPatient])
  

  const discharge = async () => {
    let newProcedure = {
      date: Date.now(),
      Notes: "Patient Discharged"
    }

    if (currentPatient)
      await updatePatient(currentPatient._id, {
        procedures: [...currentPatient.procedures, newProcedure],
        patientStatus: "discharged",
        roomNo: "N/A",
        department: null,
      });
      setModal(false);
      setIsOpen(false);

      // update doctor by deleting patient to list
    if (currentDoctor) {
      let id = currentDoctor._id
      try {
        const response = await fetch(`${BASE_URL}/doctors/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id})
        });
        if (response.ok) {
          const doctor = (await response.json()).doctor;
          await updateDoctor(doctor._id, {
            patientList: [...doctor.patientList, currentPatient._id],
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const assignDoctor = async (doctorId) => {
    // update patient with doctorId
    await updatePatient(currentPatient._id, {
      doctorAssigned: doctorId
    })

    // update doctor by adding patient to list
    try {
      const response = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({doctorId})
      });
      if (response.ok) {
        const doctor = (await response.json()).doctor;
        await updateDoctor(doctor._id, {
          patientList: [...doctor.patientList, currentPatient._id],
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const removeDoctor = async (doctorId) => {
    // update patient with doctorId
    await updatePatient(currentPatient._id, {
      doctorAssigned: null,
    })

    // update doctor by removing patient from list
    try {
      const response = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({doctorId})
      });
      if (response.ok) {
        const doctor = (await response.json()).doctor;
        await updateDoctor(doctor._id, {
          patientList: doctor.patientList.filter(patient => patient !== currentPatient._id),
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
    <Banner goBackPath={"/all-patients"}/>
    {currentPatient && <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-[#CAD6FF] p-8 rounded-lg shadow-lg max-w-5xl w-full min-h-[600px]">
        {/* Row 2: Name and Department */}
        <div className="flex justify-center items-center bg-white p-4 rounded-lg mb-4">
          <div>
            <h2 className="text-xl font-semibold text-center text-[#2260FF]">
              {currentPatient.patientName}
            </h2>
            <p className="text-center ">{currentPatient.email}</p>
          </div>
        </div>
        {/* Row 1: Image and Details */}
        <div className="flex -mx-4 items-start">
          <div className="flex-1 px-4 space-y-4">
          <div className="flex">
              <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                <h3 className="font-semibold text-md">Age</h3>
                <p>{currentPatient.age}</p>
              </div>
              <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                <h3 className="font-semibold text-md">Sex</h3>
                <p>{currentPatient.sex}</p>
              </div>
              <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg">
                <h3 className="font-semibold text-md">Phone Number</h3>
                <p>{currentPatient.phoneNumber}</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                <h3 className="font-semibold text-md">Room</h3>
                <p>{currentPatient.roomNo}</p>
              </div>
              <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                <h3 className="font-semibold text-md">Status</h3>
                <p>{currentPatient.patientStatus}</p>
              </div>
              <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg">
                <h3 className="font-semibold text-md">Department</h3>
                <p>{currentPatient.department ? id_to_department[currentPatient.department] : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Schedule */}
        <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg mt-4">
          <div className="flex items-center space-x-5">
            {currentDoctor ? <div className="flex items-center">
              <h3 className="text-xl font-bold text-blue-600 mr-4">
                <span className="text-gray-700">Doctor(s) Assigned:</span> {currentDoctor.name}
              </h3>
              {user.isAdmin && <button className="bg-red-600 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-700"
              onClick={() => removeDoctor(currentDoctor._id)}>
                Remove
              </button>}
            </div> : 
            <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-violet-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-violet-900"
              disabled={currentPatient.patientStatus === "discharged"}
            >
              Assign Doctor
            </button>
            {isOpen && doctors && (
              <div className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
                <div className="py-1">
                  <ul className="overflow-auto max-h-48">
                    {doctors.map(doctor => (
                      <li 
                        key={doctor._id} className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                        onClick={() => assignDoctor(doctor._id)}
                      >
                        {doctor.name} - {id_to_department[doctor.departmentName]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>}
          </div>
        </div>

        {/* Row 4: Profile */}
        <div className="bg-blue-100 rounded-lg p-6 shadow-lg">
          <h3 className="text-blue-600 font-semibold text-xl mb-4">Process</h3>
          <div className="space-y-4">
            {currentPatient.procedures.map((process) => (
              <div key={process._id} className="border-b border-gray-200 pb-4">
                <p className="text-gray-600 font-medium mb-2">
                  Date: {new Date(process.date).toDateString()}
                </p>
                <ul className="list-disc pl-5">
                  {Object.keys(process).map((field, index) => {
                    if (field !== "_id" && field !== "date") {
                      return (
                        <li key={index} className={process[field] === "Patient Discharged" ? "text-red-500": "text-gray-600"}>
                          <span className="font-medium">{field}:</span> {process[field]}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Row 5: Schedule Button */}
        <div className="flex justify-center mt-4">
          {currentPatient.patientStatus !== "discharged" ? 
            <>
                <button 
                  className="bg-[#2260FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 mr-4"
                  onClick={() => navigate("/add-procedure")}
                >
                  Add Procedure
                </button>
                <button 
                  className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800"
                  onClick={() => setModal(true)}
                >
                  Discharge Patient
                </button>
            </>
            : 
            <div className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold">
              This Patient has Been Discharged
            </div>
          }
        </div>
        {modal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Warning Icon */}
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Confirm Discharge
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to discharge this patient? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => discharge()}
                >
                  Discharge
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>}
    </>
  );
};

export default PatientInfo;
