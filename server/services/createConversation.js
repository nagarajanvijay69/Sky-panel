const createConversation = async (senderId, receiverId, lastMessage) => {
    const newConversation = new conversationModel({
        participants: [senderId, receiverId],
        last_message: lastMessage
    });
    await newConversation.save();
}

