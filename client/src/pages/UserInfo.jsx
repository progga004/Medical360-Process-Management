import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import MyCalendar from './MyCalendar';
Modal.setAppElement('#root');

const UserInfoPage = () => {
  const { id } = useParams();
  const { getUser, getDepartment,BASE_URL } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); 
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);

const openModal = () => setModalIsOpen(true);
const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
        console.log(id)
      const userData = await getUser(id);
      setUser(userData);
      // setImagePreview(`${BASE_URL}/${user.image}`);
      
    };
    fetchUser();
  }, [id, getUser]);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
        setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    closeModal(); // Close modal after selecting the image
};
// const handleImageUpload = async () => {
//   const formData = new FormData();
//   formData.append('image', image);
//   console.log("Form data",formData);
//   console.log("Id",id);
  

//   try {
//       const response = await fetch(`${BASE_URL}/users/${id}/upload-image`, {
//           method: 'POST',
//           body: formData,
//       });
//       const data = await response.json();
//       console.log("Data",data);
//       if (!response.ok) throw new Error(data.message || 'Could not upload image');
//       alert('Image uploaded successfully');
//       setImagePreview(`${BASE_URL}/${data.imagePath}`);
//       // Optionally refresh user info or re-fetch the user data
//   } catch (error) {
//       console.error('Upload error:', error);
//   }
// };
const handleImageUpload = async () => {
  const formData = new FormData();
  formData.append('image', selectedFile);
  try {
    const response = await fetch(`${BASE_URL}/users/${id}/upload-image`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not upload image');
    alert('Image uploaded successfully');
    setImagePreview(`${BASE_URL}/${data.imagePath}`);
  } catch (error) {
    console.error('Upload error:', error);
  }
  closeModal();
};

  if (!user) return <div>Loading...</div>;
  return (
    <>
      <Banner goBackPath="/apppage" />
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-[#CAD6FF] p-8 rounded-lg shadow-lg max-w-5xl w-full min-h-[600px]">
          <div className="flex justify-center items-center bg-white p-4 rounded-lg mb-4">
            <div>
            {/* <img src={`${BASE_URL}/${user.image}`} alt="Profile" className="rounded-full h-24 w-24 object-cover" />
              <input type="file" onChange={handleImageChange} accept="image/*" />
              <button onClick={handleImageUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload Image</button> */}
              <img src={imagePreview || `${BASE_URL}/${user.image}`} alt="Profile" className="rounded-full h-24 w-24 object-cover" />
              <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded-md">Choose Image</button>
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h2>Select Image</h2>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <button onClick={handleImageUpload} className="bg-green-500 text-white px-4 py-2 rounded-md">Upload Image</button>
              </Modal>
              <h2 className="text-xl font-semibold text-center text-[#2260FF]">{user.name}</h2>
              <p className="text-center">{user.email}</p>
            </div>
          </div>
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
                <p className="text-gray-600">{user.isAdmin ? "Admin" : "Not an admin"}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link to={`/change-password/${id}`} state={user}>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors">Change Password</button>
            </Link>
            <Link
              to={`/user-schedule/${id}`}
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};


export default UserInfoPage;
