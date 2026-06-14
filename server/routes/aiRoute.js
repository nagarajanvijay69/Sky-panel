const express = require('express');
const { mailResponse, codeEditorResponse } = require('../controller/AiController')

const AiRoute = express.Router();

AiRoute.post('/getMailResponse', mailResponse);
AiRoute.post('/getCodeEditorResponse', codeEditorResponse);


module.exports = AiRoute;