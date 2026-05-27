const createMessage = require('../services/createMessage');
const createConversation = require('../services/createConversation');
const userModel = require('../model/userModel')


const connectedUsers = {}

const chatSocket = (chat) => {
    chat.on("connection", (socket) => {
        // console.log("user Connected: ", socket.id);

        socket.on("init", (userId) => {
            if (userId) {
                connectedUsers[userId] = socket.id;
                console.log("users", connectedUsers);
            }
        });

        socket.on("send_message", async (data) => {

            // console.log(data, connectedUsers);
            const newMessage = await createMessage(data.chatId, data.senderId, data.message);
            chat.to(connectedUsers[data.senderId]).emit("new_message_added", newMessage);
            if (connectedUsers[data.receiverId]) {
                chat.to(connectedUsers[data.receiverId]).emit("new_message_added", newMessage);
            }
        });

        socket.on("create_conversation", async (data) => {
            const newConversation = await createConversation(data.senderId, data.receiverId, "");
            if(!newConversation) return;
            // console.log("data", data, "conversation1", newConversation)
            chat.to(connectedUsers[data.senderId]).emit("new_conversation_added", newConversation);

            const user = await userModel.findById(data.senderId);
            newConversation.username = user.username
            // console.log("data", data, "conversation2", newConversation)

            if (connectedUsers[data.receiverId]) {
                chat.to(connectedUsers[data.receiverId]).emit("new_conversation_added", newConversation);
            }
        })

        socket.on("disconnect", () => {
            for (const userId in connectedUsers) {
                connectedUsers[userId].toString() === socket.id.toString() ?
                    delete connectedUsers[userId] : null
            }
        });
    });
}


module.exports = chatSocket;