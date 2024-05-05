const { Server } = require("socket.io");
const axios = require('axios');  // Make sure axios is installed on the backend

const registerSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",  // Adjust as per your frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);

        socket.on('joinRoom', (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.id} joined room ${chatId}`);
        });

        socket.on('sendMessage', async (message) => {
            // Emit the message first to ensure real-time response
            io.to(message.chat).emit('receiveMessage', message);
            
            // Then save the message to the database
            try {
                // Replace 'http://localhost:3000/message' with your actual API endpoint if different
                const response = await axios.post('http://localhost:3000/message', message);
                console.log('Message saved:', response.data);
            } catch (error) {
                console.error('Failed to save message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ' + socket.id);
        });
    });

    return io;
};

module.exports = registerSocketServer;

