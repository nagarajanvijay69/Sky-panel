const aiConversationModel = require("../model/aiConversationModel");
const aiMessageModel = require("../model/aiMessageModel");
const aiResponse = require("../services/ChatbotAI")
const userModel = require("../model/userModel")

exports.createChatbotConversationMessage = async (req, res) => {
    const { userId, title, chatId, message } = req.body;
    console.log("Message API", userId, title, chatId, message);

    if (!userId) return res.status(200).json({
        success: false,
        message: "UserId required!"
    })
    if (!message) return res.status(200).json({
        success: false,
        message: "Message required!"
    });

    try {
        if (!chatId) {
            console.log("chat create start");

            const newChat = new aiConversationModel({
                user: userId, title
            });

            await newChat.save();

            console.log("chat id create end");

            if (newChat?._id) {
                const newMessage = new aiMessageModel({
                    chat_id: newChat._id,
                    sender_id: userId,
                    message
                });
                await newMessage.save();



                console.log("user message saved in new chat");

                // getting ai respone 
                const ai = await aiResponse(message);
                const newAIMessage = new aiMessageModel({
                    chat_id: newChat._id,
                    sender_id: "AI",
                    message: ai
                });
                await newAIMessage.save();

                console.log("ai message saved in new chat");

                const user = await userModel.findByIdAndUpdate(userId, {
                    $inc: { total_ai_message: 1 }
                }, {
                    new: true
                });

                return res.status(201).json({
                    success: true,
                    message: newAIMessage,
                    idChatCreated: true,
                    chat: newChat
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
            const ai = await aiResponse(message);
            const newAIMessage = new aiMessageModel({
                chat_id: chatId,
                sender_id: "AI",
                message: ai
            });
            await newAIMessage.save();

            const user = await userModel.findByIdAndUpdate(userId, {
                $inc: { total_ai_message: 1 }
            }, {
                new: true
            });

            res.status(201).json({
                success: true,
                message: newAIMessage,
                idChatCreated: false,
                user
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

exports.getAiConversation = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "UserId required!"
    });

    const conversations = await aiConversationModel.find({
        user: userId
    });

    res.status(200).json({
        success: true,
        conversations
    });
}

exports.getAiMessage = async (req, res) => {
    const { chatId } = req.body;

    if (!chatId) return res.status(200).json({
        success: false,
        message: "ChatId required!"
    });
    const messages = await aiMessageModel.find({
        chat_id: chatId
    });

    res.status(200).json({
        success: true,
        messages
    });
}