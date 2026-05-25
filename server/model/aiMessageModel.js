const mongoose = require('mongoose');

const aiMessageSchema = new mongoose.Schema({
    chat_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    sender_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const aiMessageModel = mongoose.model("aiMessageModel", mongoose.models.aiMessageSchema || aiMessageSchema);

module.exports = aiMessageModel;