const conversationModel = require("../model/conversationModel");
const userModel = require("../model/userModel")

const createConversation = async (senderId, receiverId, lastMessage) => {

    const conversation = await conversationModel.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
    });

    if (conversation) {
        console.log("conversation founded", conversation)
        return;
    }

    try {
        const newConversation = new conversationModel({
            participants: [senderId, receiverId],
            last_message: lastMessage
        });
        await newConversation.save();

        const getUserName = async (id) => {
            const user = await userModel.findById(id);
            return user.username ?? user.email
        }

        const id =  newConversation.participants.find((i) => i.toString() !== senderId.toString());
        return {
            ...newConversation.toObject(),
            username: await getUserName(id),
            receiver_id: id.toString()
        }
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = createConversation;