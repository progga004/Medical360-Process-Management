import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5173");

const ChatArea = ({}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', message => {
      setMessages(messages => [...messages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (input) {
      socket.emit('sendMessage', { content: input, sender: 'User_Id', chat: 'Chat_Id' }, 'Chat_Id');
      setInput('');
    }
  };

  return (
    <div className="w-3/4 flex flex-col">
      <div className="p-5 border-b flex items-center">
        <div className="rounded-full h-8 w-8 bg-blue-500 flex items-center justify-center text-white text-sm">P</div>
        <h2 className="ml-2">Peter</h2>
      </div>
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
