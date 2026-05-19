'use client'

import { BLACK, Chess } from 'chess.js'
import { useState } from 'react'
import { ChessBishop, ChessKing, ChessKnight, ChessPawn, ChessQueen, ChessRook, EllipsisVertical, Flag, Handshake, User, X } from 'lucide-react'

const PlayChess = () => {
  const [chess, serChess] = useState(new Chess())
  const [color, setColor] = useState<'white' | 'black'>('white');
  const [board, setBoard] = useState(
    color === 'white' ? chess.board() : chess.board().reverse().map((item) => [...item].reverse())
  );
  const [show, setShow] = useState(false);


  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[url('/chess-mb.png')] md:bg-[url('/chess-lg.png')]
       bg-cover h-[100dvh] max-w-[100dvw]">
        <div className=''>
          {/* oppenent */}
          <div className='flex items-center bg-[#1A1333] text-white p-3 rounded-lg justify-between w-96 md:w-120'>
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
          </div>
          {/* board */}
          <div className='flex flex-col my-1'>
            {board.map((row, i) => {
              return <div key={i} className='flex justify-center items-center'>
                {row.map((square, j) => {
                  return <div key={j} className={`w-12  h-12  md:w-15 md:h-15  ${(i + j) % 2 ? 'bg-violet-400' : 'bg-gray-100'}`}>
                    <div className="flex justify-center items-center h-full w-full">
                      {square && (square.type == 'p' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-pawn.png' : '/black-pawn.png'}`} className='p-1' draggable={true} /> </div>)}
                      {square && (square.type == 'r' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-rook.png' : '/black-rook.png'}`} className='p-1' /> </div>)}
                      {square && (square.type == 'n' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-knight.png' : '/black-knight.png'}`} className='p-1' /> </div>)}
                      {square && (square.type == 'b' && <div className='size-full cursor-pointer flex items-center justify-center'>  <img src={`${square.color === 'w' ? '/white-bishop.png' : '/black-bishop.png'}`} className='p-1' /> </div>)}
                      {square && (square.type == 'k' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-king.png' : '/black-king.png'}`} className='p-1' /> </div>)}
                      {square && (square.type == 'q' && <div className='size-full cursor-pointer flex items-center justify-center'> <img src={`${square.color === 'w' ? '/white-queen.png' : '/black-queen.png'}`} className='p-1' /> </div>)}
                    </div>
                  </div>
                })}
              </div>
            })}
          </div>
          {/* self */}
          <div className='flex items-center bg-[#1A1333] text-white p-3 rounded-lg justify-between w-96 md:w-120'>
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
          </div>
          <div className='text-white flex h-12 mt-1 justify-around'>
            {/* draw */}
            <div className='bg-violet-900 rounded w-[49%] cursor-pointer flex justify-center items-center gap-1'>
              <div><Handshake /></div>
              <p>Draw</p>
            </div>
            {/* resign */}
            <div className='bg-red-500 rounded w-[49%] cursor-pointer flex justify-center items-center gap-1'>
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
