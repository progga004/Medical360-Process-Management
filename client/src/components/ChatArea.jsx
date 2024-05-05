import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useAuthContext } from "../hooks/useAuthContext";

const socket = io("http://localhost:3000");

const ChatArea = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { getChat, getMessages } = useGlobalContext();
  const { user } = useAuthContext();
  useEffect(() => {
  if (chatId) {
    const fetchMessages = async () => {
      try {
        // Ensure that chatData and chatData.messages are defined
        const chatData = await getChat(chatId);
        const messagesFromChat = await getMessages(chatId); // Make sure this is awaited
        
        if (Array.isArray(messagesFromChat)) {
          setMessages(messagesFromChat);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
        setMessages([]); // Handle error by setting messages to an empty array
      }
    };

    fetchMessages();

    const handleMessageReceive = message => {
      if (message.chat === chatId) {
        setMessages(messages => [...messages, message]);
      }
    };

    socket.on('receiveMessage', handleMessageReceive);

    return () => {
      socket.off('receiveMessage', handleMessageReceive);
    };
  }
}, [chatId, getChat, getMessages]);


  const sendMessage = () => {
    console.log(chatId)
    if (input && chatId) {
        const message = {
            content: input,
            sender: user["id"], // Adjust this as needed to capture the actual user ID
            chat: chatId
        };
        socket.emit('sendMessage', message);
        setInput('');
    }
};

// Add joining to the room
useEffect(() => {
    if (chatId) {
        socket.emit('joinRoom', chatId);
    }
}, [chatId]);

  return (
    <div className="w-3/4 flex flex-col">
      {/* Chat header and other UI elements */}
      <div className="flex-1 p-5 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`rounded px-4 py-2 max-w-xs mb-2 ${msg.sender === 'User_Id' ? 'bg-blue-300 self-end' : 'bg-blue-100'}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <input className="w-full p-2 rounded border" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message here..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatArea;


