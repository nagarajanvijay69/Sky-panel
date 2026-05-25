const mongoose = require('mongoose');

const aiConversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId ,
        required: true
    },
    title: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const aiConversationModel = mongoose.model('aiConversationModel', mongoose.models.aiConversationSchema || aiConversationSchema);

module.exports = aiConversationModel;