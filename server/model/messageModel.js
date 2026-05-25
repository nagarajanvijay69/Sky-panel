const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    sender_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const messageModel = mongoose.model("messageModel", mongoose.models.messageSchema || messageSchema);

module.exports = messageModel;