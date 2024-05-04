const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message-controller'); // Adjust path as necessary

// POST route to create new message
router.post('/', MessageController.createMessage);

// GET route to get all messages for a specific chat
router.get('/chat/:chatId', MessageController.getMessagesForChat);

module.exports = router;
