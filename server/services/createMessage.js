const messageModel = require('../model/messageModel');
const conversationModel = require('../model/conversationModel')

const createMessage = async (chatId, senderId, message) => {
    const newMessage = new messageModel({
        chat_id: chatId,
        sender_id: senderId,
        message
    });
    await newMessage.save();

    try {
        await conversationModel.findByIdAndUpdate(chatId, {
            last_message: message
        });
    } catch (e) {
        console.log(e.message);
    }

    return newMessage;
}

module.exports = createMessage;