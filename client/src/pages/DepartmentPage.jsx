import React, { useState ,useEffect } from "react";
import DepartmentList from "../components/DepartmentList";
import DepartmentHead from "../components/DepartmentHead";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";



const DepartmentPage = () => {
  const { user } = useAuthContext();
  const { BASE_URL } = useGlobalContext();
  const navigate = useNavigate();
  const { departments, getAllDepartments } = useGlobalContext();

  useEffect(() => {
    localStorage.setItem("lastRoute", "/departmentpage");
    async function getDepartments() {
        await getAllDepartments();
        
    }
    getDepartments();
}, []);
  
  const deleteDepartment = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/departments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the department.');
      }
      getAllDepartments();  
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <>
      <Banner goBackPath="/apppage" />
      <div className="my-8">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold text-center flex-1">
            Departments List
          </h2>
          {user.isAdmin && (
            <button onClick={() => navigate("/department-form")} className="p-2 bg-blue-500 text-white rounded-md mb-5">
              Create Department
            </button>
          )}
        </div>
        {departments ? (
        <DepartmentList departments={departments} onDelete={deleteDepartment} isAdmin={user.isAdmin} />
      ) : (
        <p>Loading departments...</p> // Placeholder while data is loading
      )}
      </div>
      {/* <DepartmentHead /> */}
    </>
  );
};
export default DepartmentPage;