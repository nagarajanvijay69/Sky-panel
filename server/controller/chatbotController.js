const aiConversationModel = require("../model/aiConversationModel");
const aiMessageModel = require("../model/aiMessageModel");
const aiResponse = require("../services/ai")

exports.createChatbotConversationMessage = async (req, res) => {
    const { userId, title, chatId, message } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "UserId required!"
    })
    try {
        if (!chatId) {
            const newChat = new aiConversationModel({
                user: userId, title
            });

            await newChat.save();

            if (newChat?._id) {
                const newMessage = new aiMessageModel({
                    chat_id: newChat._id,
                    sender_id: userId,
                    message
                });
                await newMessage.save();
                return res.status(201).json({
                    success: true,
                    message: "Conversation and Message Created!"
                })
            }

        } else {

            const previousChat = await aiConversationModel.findById(chatId);
            if (!previousChat) return res.status(200).json({
                success: false,
                message: "Invalid ChatId!"
            })
            const newMessage = new aiMessageModel({
                chat_id: chatId,
                sender_id: userId,
                message
            });
            await newMessage.save();

            // getting ai respone 
            const ai = aiResponse(req.message);
            const newAIMessage = new aiMessageModel({
                chat_id: chatId,
                sender_id: "AI",
                message: ai
            });
            await newAIMessage.save();

            res.status(201).json({
                success: true,
                message: "Message Created!"
            })

        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}