// MyPatientsPage.js
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";

const MyPatientsPage = () => {
    const { user } = useAuthContext();
    const { getDoctor, currentDoctor, setPatients, patients, removeCurrentDoctor } = useGlobalContext();
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 6;

    if (currentDoctor)
        console.log(currentDoctor.patientList)

    useEffect(() => {
        async function fetchDoctor() {
            if (!currentDoctor && user.doctor) {
                let doctor = await getDoctor(user.doctor);
                await setPatients(doctor.patientList);
            }
        }
        try {
            fetchDoctor()
        } catch (error) {
            console.log("User is not a doctor");
        }
    }, [currentDoctor])
  
    // Logic for displaying patients
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    let pagePatients;
    if (patients)
        pagePatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);
  
    // Change page
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

  
    return (
        <>
            <Banner goBackPath={"/"} />
            <div className="min-h-screen bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-900 mb-8">My Patients</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pagePatients && pagePatients.map((patient) => (
                    <div
                        key={patient._id}
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6"
                    >
                        <h2 className="text-lg font-semibold text-blue-900">{patient.patientName}</h2>
                        <p className="text-sm text-gray-600 mt-1">Age: {patient.age}</p>
                        <p className="text-sm text-gray-600">Sex: {patient.sex}</p>
                        <p className="text-sm text-gray-600">Room: {patient.roomNo}</p>
                    </div>
                    ))}
                </div>
               {pagePatients && <div className="mt-8 flex justify-center">
                    <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="bg-white text-blue-500 hover:bg-blue-200 border border-blue-500 px-4 py-2 mx-1 rounded-full"
                    >
                    {"<"}
                    </button>
                    <button
                    onClick={nextPage}
                    disabled={indexOfLastPatient >= patients.length}
                    className="bg-white text-blue-500 hover:bg-blue-200 border border-blue-500 px-4 py-2 mx-1 rounded-full"
                    >
                    {">"}
                    </button>
                </div>}
                </div>
            </div>
        </>
    );
  };
  
  export default MyPatientsPage;