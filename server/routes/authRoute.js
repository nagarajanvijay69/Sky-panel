const express = require('express');
const { signin, login, logout, googleAuth, googleSignup, getToken, failureRedirect } = require('../controller/authController');
const auth = express.Router();

// Signup
auth.post('/signup', signin);


// login
auth.get('/login', login);

// logout
auth.get('/logout', logout);

// google auth
auth.get('/google', googleAuth, googleSignup);

// get token 
auth.get('/token', getToken);


// google failureRedirect
auth.get('/redirect', failureRedirect);




module.exports = auth;