const express = require('express');
const { addTicTacToe, addWin, addDraw, addChessTotal, addChessWin, addChessDraw, incrementRating, decrementRating } = require('../controller/userController');
const userRoute = express.Router();

//tic tack toe
userRoute.patch('/addTicTacToe', addTicTacToe);
userRoute.patch('/addWin', addWin);
userRoute.patch('/addDraw', addDraw);


//chess
userRoute.patch('/addChess', addChessTotal);
userRoute.patch('/addChessWin', addChessWin);
userRoute.patch('/addChessDraw', addChessDraw);
userRoute.patch('/incrementRating', incrementRating);
userRoute.patch('/decrementRating', decrementRating);

module.exports = userRoute;