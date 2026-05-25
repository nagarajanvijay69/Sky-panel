const messageModel = require('../model/messageModel');

const createMessage = async (chatId, senderId, message) => {
    const newMessage = new messageModel({
        chat_id: chatId,
        sender_id: senderId,
        message
    });
    await newMessage.save();
    return newMessage;
}

module.exports = createMessage;