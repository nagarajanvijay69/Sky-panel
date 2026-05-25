const express = require('express')
const chatRoute = express.Router();
const { createConversation, getConversation, getMessage, createMessage, searchUser } = require('../controller/chatController');

chatRoute.post('/createConversation', createConversation);
chatRoute.post('/getConversation', getConversation);
chatRoute.post('/getMessage', getMessage);
chatRoute.post('/createMessage', createMessage);
chatRoute.post('/searchUser', searchUser);

module.exports = chatRoute;