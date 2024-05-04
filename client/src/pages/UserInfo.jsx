import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { Link } from 'react-router-dom';
import MyCalendar from './MyCalendar';

const UserInfoPage = () => {
  const { id } = useParams();
  const { getUser, getDepartment } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); 

  useEffect(() => {
    const fetchUser = async () => {
        console.log(id)
      const userData = await getUser(id);
      setUser(userData);
      
    };
    fetchUser();
  }, [id, getUser]);

  if (!user) return <div>Loading...</div>;
  return (
    <>
      <Banner goBackPath="/all-users" />
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-[#CAD6FF] p-8 rounded-lg shadow-lg max-w-5xl w-full min-h-[600px]">
          {!showCalendar ? (
            <>
              {/* User Information */}
              <div className="flex justify-center items-center bg-white p-4 rounded-lg mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-center text-[#2260FF]">{user.name}</h2>
                  <p className="text-center">{user.email}</p>
                </div>
              </div>
              {/* Details Section */}
              <div className="flex -mx-4 items-start">
                <div className="flex-1 px-4 space-y-4">
                  <div className="flex">
                    <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg mr-4">
                      <h3 className="font-semibold text-md">Email</h3>
                      <p>{user.email || 'No Department'}</p>
                    </div>
                    <div className="flex-grow bg-blue-600 text-white p-4 rounded-lg">
                      <h3 className="font-semibold text-md">Phone Number</h3>
                      <p>{user.phone_number || 'No Phone Number'}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg mt-4">
                    <h3 className="text-[#2260FF] font-semibold text-lg">Admin</h3>
                    <p className="text-gray-600">{user.isAdmin || "not an admin"}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Link to={`/change-password/${id}`} state={user}>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors">Change Password</button>
                </Link>
                <button
                  onClick={() => setShowCalendar(true)} 
                  className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors"
                >
                  View Schedule
                </button>
              </div>
            </>
          ) : (
            <MyCalendar userId={id} /> 
          )}
        </div>
      </div>
    </>
  );
};


export default UserInfoPage;
