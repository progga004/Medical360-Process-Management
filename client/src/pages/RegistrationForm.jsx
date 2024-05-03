import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import { useGlobalContext } from '../hooks/useGlobalContext';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const { departments, getAllDepartments, createUser, createDoctor, getDoctor } = useGlobalContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        department: '',
        pwConfirm: '',
    });
    const [formError, setFormError] = useState(false);

    useEffect(() => {
        async function fetchDepartments() {
            if (!departments) {
                await getAllDepartments();
            }
        }
        fetchDepartments();
    }, [departments]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation example
        if (!formData.name || !formData.email || !formData.phoneNumber) {
            alert('Please fill in all required fields.');
            return;
        }
        if (formData.password !== formData.pwConfirm) {
          alert("Passwords must match!");
          return;
        }

        // create user and doctor if department is not null
        try {
          let docId = null;
          let dep = null;
          if (formData.department) {
            dep = formData.department;
            console.log("department found here: " + dep)
            const doc = await createDoctor({ name: formData.name, department: dep });
            docId = doc._id
          }
            
          await createUser(
            { 
              name: formData.name, 
              email: formData.email, 
              password: formData.password, 
              departmentName: dep, 
              phone_number: formData.phoneNumber,
              doctor: docId,
            }
          );
          console.log("user created!!!");
        } catch (err) {
          console.log(err.message);
        }
        navigate("/all-users");
        
    };

    return (
        <>
            <Banner goBackPath={"/all-users"} />
            <div className="flex justify-center">
                <form className="w-full max-w-lg p-4" onSubmit={handleSubmit}>
                    <h2 className="text-2xl text-center font-semibold mb-4">New User Form</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pwConfirm">
                            Confirm Password
                        </label>
                        <input
                            type="text"
                            name="pwConfirm"
                            value={formData.pwConfirm}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {departments && <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                            Department
                        </label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            
                        >
                            <option value="">Select Department</option>
                            {departments && departments.map((dept) => (
                                <option key={dept._id} value={dept.departmentName}>{dept.departmentName}</option>
                            ))}
                        </select>
                    </div>}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create New User
                        </button>
                    </div>
                    {formError && (
                        <p className="text-red-500 text-xs italic">Error submitting form. Please try again.</p>
                    )}
                </form>
            </div>
        </>
    );
};

export default RegistrationForm;
