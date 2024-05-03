import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../components/Banner";
import { useGlobalContext } from "../hooks/useGlobalContext";

const BugReport = () => {
  const [bug, setBug] = useState({
    contactName: "",
    phone: "",
    email: "",
    bugEncountered: "",
  });
  const { createBug } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBug({ ...bug, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBug(bug);
      toast.success("Bug report submitted successfully!", {
        position: "top-center",
        autoClose: 1000,
        onClose: () => navigate("/apppage"),
      });
    } catch (error) {
      toast.error("Failed to submit bug report. Please try again later.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Banner goBackPath={"/apppage"} />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl text-gray-700 font-bold mb-6">Bug Report</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Contact Name</label>
              <input
                type="text"
                name="contactName"
                onChange={handleChange}
                value={bug.contactName}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={bug.phone}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={bug.email}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Bug Encountered</label>
              <textarea
                name="bugEncountered"
                onChange={handleChange}
                value={bug.bugEncountered}
                className="mt-1 block w-full border border-gray-300 shadow-sm rounded p-2 h-28"
                placeholder="Describe the bug..."
              ></textarea>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate("/apppage")}
                className="px-4 py-2 rounded text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 shadow-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BugReport;
