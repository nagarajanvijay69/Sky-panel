'use client'

import { Chess, Square } from 'chess.js'
import { useEffect, useRef, useState } from 'react'
import { Flag, Handshake, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, updateUser } from '@/app/store/store'
import chessSocket from '@/app/chessSocket'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const PlayChess = () => {
  const [chess, setChess] = useState(new Chess());
  const turn = useSelector((state: RootState) => state.user.value.color);
  const matchCode = useSelector((state: RootState) => state.user.value.matchCode);
  const userId = useSelector((state: RootState) => state.user.value._id);
  const user = useSelector((state: RootState) => state.user.value);
  const [color, setColor] = useState(turn);
  const [board, setBoard] = useState(chess.board());
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const tempRef = useRef(false);
  const redirectRef = useRef(false)
  const router = useRouter();

  useEffect(() => {
    if (!tempRef.current && turn) {
      setBoard(turn === 'white' ? chess.board() : chess.board().reverse().map((item) => [...item].reverse()));
      tempRef.current = true
    }
  });

  useEffect(() => {
    if (!redirectRef.current && userId) {
      if (!turn) {
        router.push("/environment/games/chess")
      }
      redirectRef.current = true;
    }
  })


  // //checking match status
  // const checkMatch = () => {
  //   if (chess.isCheckmate()) {
  //     setGameStatus('win');
  //     const win = chess.turn() === 'w' ? 'black' : 'white';
  //     setwinner(win)
  //     alert(`${winner} won the match!`)
  //   } else if (chess.isDraw()) {
  //     setGameStatus('draw');
  //     alert("Match Draw!")
  //   } else {
  //     setGameStatus('playing');
  //   }
  // }

  const getSquareName = (i: number, j: number) => {
    let elements = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    if (turn === 'black') return `${elements[7 - j]}${i + 1}`
    return `${elements[j]}${8 - i}`
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const handleGame = ({ fen }: { fen: string }) => {
      const newChess = new Chess(fen);
      setChess(newChess);
      setBoard(
        turn === 'white' ? newChess.board() : newChess.board().reverse().map((item) => [...item].reverse())
      )
    }

    const handleGameOver = async ({ winner }: { winner: 'black' | 'white' | null }) => {
      if (winner) {
        if (winner === turn) {
          await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/addChessWin`, { userId })
          const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/incrementRating`, { userId })
          dispatch(updateUser(res.data.user));
        } else {
          const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/decrementRating`, { userId })
          dispatch(updateUser(res.data.user));
        }

        alert(`${winner} won the match!`);
        setTimeout(() => {
          router.push("/environment/games/chess")
        }, 2000)
      }
      else {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/addChessDraw`, { userId })
        dispatch(updateUser(res.data.user));
        alert("Match Draw!")
        setTimeout(() => {
          router.push("/environment/games/chess")
        }, 2000);
      }
    }

    chessSocket.on("get-game", handleGame);
    chessSocket.on("game-over", handleGameOver);

    return () => {
      chessSocket.off("get-game", handleGame);
      chessSocket.off("game-over", handleGameOver);
    }
  }, [turn]);

  useEffect(() => {
    const handleDrawRequested = () => {
      const confirm = window.confirm("Opponent offered a draw. Accept?");
      chessSocket.emit("draw-response", { matchCode, accepted: confirm })
    }
    chessSocket.on("draw-requested", handleDrawRequested);

    return () => {
      chessSocket.off("draw-requested", handleDrawRequested);
    }

  }, []);

  useEffect(() => {
    const handleDrawDeclined = () => {
      alert("Draw Offer Declined!")
    }

    chessSocket.on("draw-declined", handleDrawDeclined);

    return () => {
      chessSocket.off("draw-declined", handleDrawDeclined);
    }
  }, []);


  // ask draw function
  const askDraw = () => {
    chessSocket.emit("draw-request", { matchCode })
  }

  // resign function
  const resign = () => {
    const confirm = window.confirm("Are you sure you want to resign?")
    if (confirm) {
      chessSocket.emit("resign", { matchCode });
    }
  }

  // making move
  const makeMove = (i: number, j: number) => {
    const turn2 = chess.turn();
    console.log("turn", turn2)
    const sq = getSquareName(i, j);
    const existingPiece = chess.get(sq as Square);


    // selecting piece
    const playerColor = turn === 'white' ? 'w' : 'b';

    if (playerColor !== chess.turn()) return;

    if (!selectedSquare) {
      if (!existingPiece || existingPiece.color !== playerColor) return;
      setSelectedSquare(sq);

      const moves = chess.moves({
        square: sq as Square,
        verbose: true
      })

      const legalMovesTemp = moves.map((move) => move.to);
      setLegalMoves(legalMovesTemp);
      return;
    }

    //selecting other piece
    if (existingPiece && existingPiece.color === playerColor) {
      setSelectedSquare(sq);

      const moves = chess.moves({
        square: sq as Square,
        verbose: true
      })
      const legalMovesTemp = moves.map((move) => move.to);
      setLegalMoves(legalMovesTemp);
      return;
    }


    // move piece logic
    if (selectedSquare && legalMoves.includes(sq as Square)) {
      const validMove = chess.move({
        from: selectedSquare,
        to: sq,
        promotion: 'q'
      });

      if (validMove) {
        chessSocket.emit("makeMove", {
          matchCode,
          move: validMove
        })
        setSelectedSquare(null);
        setLegalMoves([]);
        // setChess(new Chess(chess.fen()));
        // setBoard(color === 'white' ? chess.board() : chess.board().reverse().map((item) => [...item].reverse()));
        return;
      }
    }
  }

  // console.log(legalMoves)


  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[url('/chess-mb.png')] md:bg-[url('/chess-lg.png')]
       bg-cover h-[100dvh] max-w-[100dvw]">
        <div className=''>
          {/* oppenent */}
          {/* <div className='flex items-center bg-[#1A1333] text-white p-3 rounded-lg justify-between w-96 md:w-120'>
            <div className='flex gap-2'>
              <div className='bg-purple-800 p-2 rounded-lg h-min text-white'><User width={30} height={30} /></div>
              <div className='flex flex-col'>
                <p className='text-lg'>Leo Dass</p>
                <p className='text-gray-400'>Rating: <span>2023</span></p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <div className='border-2 border-purple-900 p-1 px-3 bg-purple-800 text-white rounded shadow-lg'>
                09 : 85
              </div>
            </div>
          </div> */}
          {/* board */}
          <div className='flex flex-col my-1  mt-8 lg:mt-auto'>
            {board.map((row, i) => {
              return <div key={i} className='flex justify-center items-center'>
                {row.map((square, j) => {
                  let sq = getSquareName(i, j);
                  let isLegal = legalMoves.includes(sq as Square);
                  return <div key={j} className={`w-12  h-12  md:w-16 md:h-16 lg:h-18 lg:w-18  ${(i + j) % 2 ? 'bg-violet-400' : 'bg-gray-100'}`}>
                    <div className="flex justify-center items-center h-full w-full relative" onClick={() => makeMove(i, j)}>
                      {square && (square.type == 'p' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-pawn.png' : '/black-pawn.png'}`} className='' /> </div>)}
                      {square && (square.type == 'r' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-rook.png' : '/black-rook.png'}`} className='' /> </div>)}
                      {square && (square.type == 'n' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-knight.png' : '/black-knight.png'}`} className='' /> </div>)}
                      {square && (square.type == 'b' && <div className='size-full cursor-pointer flex items-center justify-center'>  <img src={`${square.color === 'w' ? '/white-bishop.png' : '/black-bishop.png'}`} className='' /> </div>)}
                      {square && (square.type == 'k' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-king.png' : '/black-king.png'}`} className='' /> </div>)}
                      {square && (square.type == 'q' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-queen.png' : '/black-queen.png'}`} className='' /> </div>)}
                      {isLegal && <div className='absolute rounded-full bg-gray-600/60 h-4 w-4 shadow-2xl'></div>}
                    </div>
                  </div>
                })}
              </div>
            })}
          </div>
          {/* self */}
          <div className='flex items-center bg-[#1A1333] text-white p-3 rounded-lg justify-between w-96 md:w-128 lg:w-144'>
            <div className='flex gap-2'>
              <div className='bg-purple-800 p-2 rounded-lg h-min text-white'><User width={30} height={30} /></div>
              <div className='flex flex-col'>
                <p className='text-lg'>{user.username}</p>
                <p className='text-gray-400'>Rating: <span>{user.rating}</span></p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              {/* <div className='border-2 border-purple-900 p-1 px-3 bg-purple-800 text-white rounded shadow-lg'>
                09 : 85
              </div> */}
            </div>
          </div>
          <div className='text-white flex h-12 mt-1 justify-around'>
            {/* draw */}
            <div className='bg-violet-900 rounded w-[49%] cursor-pointer flex justify-center items-center gap-1' onClick={askDraw}>
              <div><Handshake /></div>
              <p>Draw</p>
            </div>
            {/* resign */}
            <div className='bg-red-500 rounded w-[49%] cursor-pointer flex justify-center items-center gap-1' onClick={resign}>
              <div><Flag /></div>
              <p>Resign</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayChess;
