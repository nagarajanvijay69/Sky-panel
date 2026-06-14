import { io } from "socket.io-client";

const chessSocket = io(`${process.env.NEXT_PUBLIC_SERVER_URI}/socket/chess`);

export default chessSocket;
