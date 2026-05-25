const createMessage = require('../services/createMessage');


const connectedUsers = {}

const chatSocket = (chat) => {
    chat.on("connection", (socket) => {
        console.log("user Connected: ", socket.id);

        socket.on("init", (userId) => {
            if (userId) {
                connectedUsers[userId] = socket.id;
                console.log("users", connectedUsers);
            }
        });

        socket.on("send_message", async (data) => {
            console.log("message received in backed socket", data);
            const newMessage = await createMessage(data.chat_id, data.sender_id, data.message);
            chat.emit("new_message_added", newMessage);
            // chat.to(connectedUsers[data.sender_id]).emit("new_message_added", newMessage);
            // if (connectedUsers[data.receiverId]) {
            //     chat.to(connectedUsers[data.receiverId]).emit("new_message_added", newMessage);
            // }
            console.log("users", connectedUsers);
        });

        socket.on("disconnect", () => {
            for (const userId in connectedUsers) {
                connectedUsers[userId].toString() === socket.id.toString() ?
                    delete connectedUsers[userId] : null
            }
            console.log("disconnect", connectedUsers);
        })
    });
}

module.exports = chatSocket;