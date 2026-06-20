const express = require('express');
const { signin, login, logout, googleAuth, googleSignup, getToken, failureRedirect, changeName, changePassword, deleteUser } = require('../controller/authController');
const authRoute = express.Router();

// Signup
authRoute.post('/signup', signin);


// login
authRoute.get('/login', login);

// logout
authRoute.get('/logout', logout);

// google auth
authRoute.get('/google', googleAuth, googleSignup);

// get token 
authRoute.get('/token', getToken);


// google failureRedirect
authRoute.get('/redirect', failureRedirect);

// change username
authRoute.patch('/updateUsername', changeName);

// change password
authRoute.patch('/updatePassword', changePassword);

// delete user
authRoute.delete('/deleteUser', deleteUser);




module.exports = authRoute;