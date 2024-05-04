const Message = require('../models/Message');
const Chat = require('../models/Chat');

async function createMessage(req, res) {
    try {
        const newMessage = new Message({
            sender: req.body.sender,
            content: req.body.content,
            chat: req.body.chat,
            sentAt: new Date(),
        });

        const savedMessage = await newMessage.save();

        // Optionally update the chat document to include new message
        await Chat.findByIdAndUpdate(
            req.body.chat,
            { $push: { messages: savedMessage._id } },
            { new: true }
        );

        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMessagesForChat(req, res) {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate('sender');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const MessageController = {
    createMessage,
    getMessagesForChat
};

module.exports = MessageController;
