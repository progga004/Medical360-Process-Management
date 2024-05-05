
import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ChatArea from '../components/ChatArea';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div>
      <Banner goBackPath={"/apppage"} />

      <div className="flex h-screen" style={{ backgroundColor: '#CAD6FF' }}>
        <Sidebar onSelectChat={setSelectedChatId} />
        <ChatArea chatId={selectedChatId} />
      </div>
    </div>
  );
};

const Sidebar = ({ onSelectChat }) => {
  const [userId, setUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);  // Default to an empty array
  const [curUser, setCurUser] = useState(null);
  const { user } = useAuthContext();
  const { users, getUser, getAllUsers, getUserChats } = useGlobalContext();

  useEffect(() => {
      const fetchUser = async () => {
          if (user && user.id) {
              const fetchedUser = await getUser(user.id);
              setCurUser(fetchedUser);
              const userChats = await getUserChats(user["id"]);
              
              setChats(userChats || []); // Ensure userChats is an array, default to empty array if falsy
          } else {
              console.log('User data is not available.');
          }
      };
      fetchUser();
  }, [user]);

  useEffect(() => {
      getAllUsers().catch(error => console.error('Error fetching users:', error));
  }, []); // Only on component mount

  const handleUserChange = async (e) => {
      let newUserId = e.target.value;
      setUserId(newUserId); // Update the user ID
      if (newUserId) {
          const userDetails = await getUser(newUserId); // Fetch the user details based on ID
          setSelectedUser(userDetails); // Store the user details
      } else {
          setSelectedUser(null); // Reset if no user is selected
      }
  };

  const handleCreateChat = async () => {
      if (userId && selectedUser) {
          try {
              const response = await axios.post('https://medical360-d65d823d7d75.herokuapp.com/chat', {
                  members: [curUser, selectedUser]
              });
              setChats(prevChats => [...prevChats, response.data]);  // Use prevChats to ensure correct state updates
              setUserId('');
              setSelectedUser(null); // Clear the selected user after creating the chat
          } catch (error) {
              console.error('Failed to create chat:', error);
          }
      }
  };

  return (
      <div className="w-1/4 p-5 border-r overflow-y-auto" style={{ backgroundColor: '#CAD6FF' }}>
          <div className="p-2">
              <select
                  className="w-full p-2 rounded border"
                  value={userId}
                  onChange={handleUserChange}
              >
                  <option value="">Select a User</option>
                  {(users || []).map(user => (
                      <option key={user._id} value={user._id}>
                          {user.name} ({user["_id"]})
                      </option>
                  ))}
              </select>
              <button onClick={handleCreateChat}>Create </button>
              <button onClick={() => getAllUsers()} className="mt-2"> Refresh</button>
          </div>
          <div className="mt-4 bg-white">
              <h3 className="font-bold text-lg">Chats</h3>
              {Array.isArray(chats) && chats.length > 0 ? (
                  chats.map((chat, index) => (
                      <div onClick={() => onSelectChat(chat._id)} key={index} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded">
                          {chat.members.map(member => getUser(member).name).join(', ')}
                      </div>
                  ))
              ) : (
                  <div>No chats available</div>  // Display a message if no chats are found
              )}
          </div>
      </div>
  );
};


export default ChatPage;

