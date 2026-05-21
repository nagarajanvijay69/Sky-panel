// import require packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const auth = require('./routes/authRoute');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const weather = require('./routes/weatherRoute');
require('./passport/passport');
const http = require("http");

// server setup
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
     origin: [
          "http://localhost:3000",
     ],
     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
     credentials: true
}));

//auth router
app.use('/', auth);

//weather router
app.use('/', weather);


//mongoDB connect
mongoose.connect('mongodb://localhost:27017/skyPanel')
.then(()=> console.log('database connected'))
.catch((e)=> console.log('error: ', e));

// port
app.listen(8000, () => {
     console.log(`server is running on the port ${process.env.BACKEND_PORT}`);
})


