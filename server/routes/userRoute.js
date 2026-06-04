const express = require('express');
const { addTicTacToe, addWin, addDraw } = require('../controller/userController');
const userRoute = express.Router();

userRoute.patch('/addTicTacToe', addTicTacToe);
userRoute.patch('/addWin', addWin);
userRoute.patch('/addDraw', addDraw);


module.exports = userRoute;