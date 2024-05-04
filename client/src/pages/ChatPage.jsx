
import React, { useState,useEffect } from 'react';
import Banner from '../components/Banner';
import ChatArea from '../components/ChatArea';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Await } from 'react-router-dom';
const ChatPage = () => {
  return (
    <div>
      {/* Include the Banner component */}
      <Banner goBackPath={"/apppage"} />

      {/* Sidebar and ChatArea components */}
      <div className="flex h-screen" style={{ backgroundColor: '#CAD6FF' }}>
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
};


const Sidebar = () => {
  const [userId, setUserId] = useState('');
  const [chats, setChats] = useState([]);
  const [curUser, setCurUser] = useState([]);
  const { user } = useAuthContext();
  const { getUser } = useGlobalContext();

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user["id"]) { // Check if user exists and has an id
        const fetchedUser = await getUser(user.id);
        setCurUser(fetchedUser); // Assuming getUser returns the user data
      } else {
        console.log('User data is not available.');
      }
    };
    
    fetchUser();
  }, [user]); // Depend on user to re-run the effect when user changes

  const handleCreateChat = async () => {
    if (userId) {
      try {
        const response = await axios.post('http://localhost:3000/chat', {
          members: [curUser]  
        });
        setChats([...chats, response.data]);
        setUserId('');
      } catch (error) {
        console.error('Failed to create chat:', error);
      }
    }
  };

  return (
    <div className="w-1/4 p-5 border-r overflow-y-auto" style={{ backgroundColor: '#CAD6FF' }}>
      <div className="p-2">
        <input
          className="w-full p-2 rounded border"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleCreateChat}>Create Chat</button>
      </div>
      <div className="mt-4 bg-white">
        <h3 className="font-bold text-lg">Chats</h3>
        {chats.map((chat, index) => (
          <div key={index} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded">
            {chat.members.join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
};



// ChatArea component remains unchanged
// const ChatArea = () => {
//   return (
//     <div className="w-3/4 flex flex-col">
//       <div className="p-5 border-b flex items-center">
//         <div className="rounded-full h-8 w-8 bg-blue-500 flex items-center justify-center text-white text-sm">P</div>
//         <h2 className="ml-2">Peter</h2>
//       </div>
//       <div className="flex-1 p-5 overflow-y-auto">
//         {/* Messages will be dynamic, but here are static examples */}
//         <div className="rounded px-4 py-2 bg-blue-100 max-w-xs mb-2">Hey There!</div>
//         <div className="rounded px-4 py-2 bg-blue-300 max-w-xs mb-2 self-end">Hello!</div>
//       </div>
//       <div className="p-4 border-t">
//         <input className="w-full p-2 rounded border" placeholder="Type your message here..." />
//       </div>
//     </div>
//   );
// };

export default ChatPage;
