const { Chess } = require('chess.js')

const match = {}

const chessSocket = (chess) => {
    chess.on("connection", (socket) => {
        console.log("user connected", socket.id);

        socket.on("connectMatch", ({ matchCode, role }) => {
            console.log("in socket", matchCode, role)
            if (role === 'creator') {
                if (match[matchCode]) {
                    return socket.emit("room-exists");
                }

                socket.join(matchCode);
                match[matchCode] = {
                    chess: new Chess(),
                    white: socket.id,
                    black: null
                }
                socket.emit("player-color", "white");
            } else if (role === 'joiner') {
                if (!match[matchCode]) {
                    return socket.emit("invalid-code");
                }

                if (match[matchCode].black) {
                    return socket.emit("room-full");
                }

                socket.join(matchCode);
                match[matchCode].black = socket.id;
                socket.emit("player-color", "black");
                chess.to(matchCode).emit("game-start");
            }

            socket.emit("get-game", {
                fen: match[matchCode].chess.fen()
            });

            console.log("match", match)

        });

        socket.on("makeMove", ({ matchCode, move }) => {
            const existiongMatch = match[matchCode];
            if (!existiongMatch) return;

            const chessMatch = existiongMatch.chess;
            const validMove = chessMatch.move(move);
            if (!validMove) {
                return socket.emit("invalid-move")
            }

            chess.in(matchCode).emit("get-game", {
                fen: match[matchCode].chess.fen()
            });

            if (chessMatch.isCheckmate()) {
                chess.in(matchCode).emit("game-over", {
                    winner: chessMatch.turn() === 'b' ? 'white' : 'black'
                });
            }

            if (chessMatch.isDraw()) {
                chess.in(matchCode).emit("game-over", {
                    winner: null
                });
            }
        });

        socket.on("resign", ({ matchCode }) => {
            const currentMatch = match[matchCode]
            if (!currentMatch) return;
            let winner = null;
            if (currentMatch.white == socket.id) {
                winner = 'black'
            } else {
                winner = 'white'
            }

            chess.in(matchCode).emit("game-over", { winner });
            delete match[matchCode];
        });


        socket.on("draw-request", ({ matchCode }) => {
            if (!match[matchCode]) return;
            socket.to(matchCode).emit("draw-requested");
        });

        socket.on("draw-response", ({ matchCode, accepted }) => {
            if (!match[matchCode]) return;
            if (accepted) {
                chess.in(matchCode).emit("game-over", { winner: null })
                delete match[matchCode];
            } else {
                socket.to(matchCode).emit("draw-declined")
            }
        });

        socket.on("disconnect", () => {
            for (const matchCode of Object.keys(match)) {
                const currentMatch = match[matchCode];
                if (currentMatch.black === socket.id || currentMatch.white === socket.id) {
                    let winner = null;
                    if (currentMatch.white === socket.id) winner = "black";
                    else winner = "white"

                    chess.to(matchCode).emit("game-over", { winner })
                    delete match[matchCode]
                    return;
                }
            }
        });
    });
}

module.exports = chessSocket;