'use client'

import { BLACK, Chess } from 'chess.js'
import { useState } from 'react'
import { ChessBishop, ChessKing, ChessKnight, ChessPawn, ChessQueen, ChessRook } from 'lucide-react'

const PlayChess = () => {
  const [chess, serChess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board());

  return (
    <>
      <div className="flex justify-center items-center h-[100dvh] text-black">
        <div className='flex flex-col border-2 border-gray-700 shadow-2xl w-min'>
          {board.map((row, i) => {
            return <div key={i} className='flex justify-center items-center'>
              {row.map((square, j) => {
                return <div key={j} className={`w-10 h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 ${square?.color === 'w' ? 'text-gray-700' : 'text-black' }  ${(i + j) % 2 ? 'bg-white' : 'bg-green-500'}`}>
                  <div className="flex justify-center items-center h-full w-full">
                    {square && (square.type == 'p' && <div className='size-full flex items-center justify-center'> <ChessPawn width={32} height={32} /> </div>)}
                    {square && (square.type == 'r' && <div className='size-full flex items-center justify-center'> <ChessRook width={32} height={32} /> </div>)}
                    {square && (square.type == 'n' && <div className='size-full flex items-center justify-center'> <ChessKnight width={32} height={32} /> </div>)}
                    {square && (square.type == 'b' && <div className='size-full flex items-center justify-center'> <ChessBishop width={32} height={32} /> </div>)}
                    {square && (square.type == 'k' && <div className='size-full flex items-center justify-center'> <ChessKing width={32} height={32} /> </div>)}
                    {square && (square.type == 'q' && <div className='size-full flex items-center justify-center'> <ChessQueen width={32} height={32} /> </div>)}
                  </div>
                </div>
              })}
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default PlayChess;
