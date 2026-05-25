const conversationModel = require('../model/conversationModel');
const messageModel = require('../model/messageModel');
const userModel = require('../model/userModel');



exports.createConversation = async (req, res) => {
    const { senderId, receiverId, lastMessage } = req.body;

    if (!senderId || !receiverId) {
        return res.status(200).json({
            success: false,
            message: "All fields are required"
        });
    }
    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);

    if (!sender || !receiver) {
        return res.status(200).json({
            success: false,
            message: "Invalid id"
        });
    }

    const conversation = await conversationModel.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
    })

    if (conversation) {
        return res.status(200).json({
            success: false,
            message: "Conversation Already created"
        })
    }

    try {
        const newConversation = new conversationModel({
            participants: [senderId, receiverId],
            last_message: lastMessage ?? ""
        });
        await newConversation.save();
        res.status(201).json({
            success: true,
            message: "Conversation created successfully"
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }

}

exports.createMessage = async (req, res) => {
    const { chatId, senderId, message } = req.body;

    if (!chatId || !senderId || !message) {
        return res.status(200).json({
            success: false,
            message: "All fields are required"
        });
    }

    const newMessage = new messageModel({
        chat_id: chatId,
        sender_id: senderId,
        message: message
    });

    await newMessage.save();

    const allMessage = await messageModel.find({ chat_id: chatId });

    res.status(201).json({
        success: true,
        message: "Message created successfully",
        messages: allMessage
    });
}

exports.getConversation = async (req, res) => {
    const { userId } = req.body;

    if (!userId) return res.status(200).json({
        success: false,
        message: "userId is required"
    });

    try {
        const conversations = await conversationModel.find({
            participants: userId
        });

        const getUserName = async (id) => {
            const user = await userModel.findById(id);
            return user.username ?? user.email
        }


        const updatedconversations = await Promise.all(
            conversations.map(async (item) => {
                const id = item.participants.find((i) => i.toString() !== userId.toString());
                return {
                    ...item.toObject(),
                    username: await getUserName(id),
                    receriver_id: id.toString()
                }
            })
        )
        res.status(200).json({
            success: true,
            conversations: updatedconversations
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        });
    }

}

exports.getMessage = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(200).json({
        success: false,
        message: "Id must required"
    });

    try {
        const message = await messageModel.find({ chat_id: id });
        res.status(200).json({
            success: true,
            messages: message
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

exports.searchUser = async () => {
  const {email} = req.body;
  if(!email) return res.status(200).json({
    success: false,
    message: "Email or username reuired"
  });

  const user = await userModel.findOne({email});
  const userData = {
    _id: user._id,
    username: user.username,
    email: user.email
  }

  res.status(200).json({
    success: true,
    userData
  })
}