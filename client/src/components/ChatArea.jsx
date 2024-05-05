import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useGlobalContext } from '../hooks/useGlobalContext';

const socket = io("http://localhost:5173");

const ChatArea = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { getChat } = useGlobalContext();

  useEffect(() => {
    console.log("test message")
    if (chatId) {
      // Fetch chat data and safely handle potential undefined values
      getChat(chatId).then(chatData => {
        // Ensure that chatData and chatData.messages are defined
        if (chatData && Array.isArray(chatData.messages)) {
          setMessages(chatData.messages);
        } else {
          setMessages([]); // Set to empty array if no messages are found
        }
      }).catch(error => {
        console.error("Failed to fetch chat messages:", error);
        setMessages([]); // Handle error by setting messages to an empty array
      });

      socket.on('receiveMessage', message => {
        if (message.chat === chatId) {
          setMessages(messages => [...messages, message]);
        }
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [chatId]);

  const sendMessage = () => {
    if (input && chatId) {
      socket.emit('sendMessage', { content: input, sender: 'User_Id', chat: chatId });
      setInput('');
    }
  };

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


