const express = require('express');
const { createChatbotConversationMessage, getAiConversation, getAiMessage } = require('../controller/chatbotController');
const chatbotRoute = express.Router();


chatbotRoute.post('/getResponse', createChatbotConversationMessage);
chatbotRoute.post('/getAiConversation',getAiConversation);
chatbotRoute.post('/getAiMessage', getAiMessage);


module.exports = chatbotRoute;