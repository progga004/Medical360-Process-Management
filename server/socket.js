// socket.js
const { Server } = require("socket.io");

const registerSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);

        // Join a room
        socket.on('joinRoom', (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.id} joined room ${chatId}`);
        });

        // Handle message event
        socket.on('sendMessage', (message, chatId) => {
            io.to(chatId).emit('receiveMessage', message);
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected: ' + socket.id);
        });
    });

    return io;
};

module.exports = registerSocketServer;
