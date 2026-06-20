// import require packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const http = require("http");
const { Server } = require('socket.io');
require('./passport/passport');
const frontendUri = process.env.FRONTEND_URI;
const chatSocket = require('./socket/chatSocket');
const chessSocket = require('./socket/chessSocket');

const authRoute = require('./routes/authRoute');
const weatherRoute = require('./routes/weatherRoute');
const chatRoute = require('./routes/chatRoute');
const chatbotRoute = require('./routes/chatbotRoute');
const userRoute = require('./routes/userRoute');
const AiRoute = require('./routes/aiRoute');

// server setup
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
     origin: [
          frontendUri,
          "http://localhost:3000"
     ],
     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
     credentials: true
}));


// socket.io setup
const io = new Server(server, {
     cors: {
          origin: frontendUri,
          methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
     }
});


//chat socket
const chat = io.of("/socket/chat");
chatSocket(chat);

//chess socket
const chess = io.of("/socket/chess");
chessSocket(chess)


//ping
app.get('/ping', async (req, res) => {
   res.send("API Working!")
});


//auth router
app.use('/', authRoute);

//weather router
app.use('/', weatherRoute);

//chat router
app.use('/chat', chatRoute);

//chatbot router
app.use('/chatbot', chatbotRoute);

//user router
app.use('/user', userRoute);

//ai router
app.use('/ai', AiRoute)


//mongoDB connect
mongoose.connect(`${process.env.MONGODB_URI}`)
     .then(() => console.log('database connected'))
     .catch((e) => console.log('error: ', e));

// port
server.listen(8000, () => {
     console.log(`server is running on the port ${process.env.BACKEND_PORT}`);
})


