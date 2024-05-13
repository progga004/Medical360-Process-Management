const { Server } = require("socket.io");
const axios = require('axios');  

const registerSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            //origin: "https://medical360-d65d823d7d75.herokuapp.com",  
            origin: "http://localhost:5173",
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
                
                const response = await axios.post('http://localhost:5173/message', message);
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

