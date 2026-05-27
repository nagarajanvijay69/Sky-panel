const express = require('express');
const { createChatbotConversationMessage } = require('../controller/chatbotController');
const chatbotRoute = express.Router();


chatbotRoute.post('/getResponse', createChatbotConversationMessage);


module.exports = chatbotRoute;