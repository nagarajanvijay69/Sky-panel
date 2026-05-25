const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.Schema.ObjectId, mongoose.Schema.ObjectId],
        required: true
    },
    last_message: {
        type: String,
        default: ""
    },
    unread_message: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

const conversationModel = mongoose.model('conversationModel', mongoose.models.conversationSchema || conversationSchema);

module.exports = conversationModel;