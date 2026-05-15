'use client'

import { Minus } from "lucide-react";
import { useState } from "react";

const PlayGame = () => {

  const [turnX, setTurnX] = useState(true);

  const select = (i: number) => {
    setData(prev => {
      let temp = [...prev];
      if (!temp[i]) {
        temp[i] = turnX ? "X" : "O";
        setTurnX(!turnX);
      }
      return temp;
    })
  };

  let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);

  return (<>
    <div className="box  md:bg-[url('/bg-pc.png')] bg-[url('/bg-mb.png')] bg-cover h-[100dvh] overflow-hidden pt-10 md:pt-8">
      <h1 className="text-4xl font-bold text-center text-gray-700 pt-10">Tic <span className="text-violet-700">Tac</span> Toe</h1>
      <div className="pb-10 text-center text-violet-700 flex justify-center items-center gap-2">
        <div><Minus /></div>
        <p>Best of Luck!</p>
        <div><Minus /></div>
      </div>
      <div className="text-center">
        <div className="inline-flex">
          <div className="grid grid-cols-3 bg-[url('/tic-play-board.jpeg')] bg-cover rounded-3xl p-1 mt-4 md:mt-auto">
            {
              data.map((d, i) => {
                return <div key={i} className={`h-30
                 w-31 flex justify-center items-center text-2xl cursor-pointer`}
                  onClick={() => select(i)}>
                    <img src={`${d === 'X' ?  '/tic-x.png' : d === 'O' ? '/tic-y.png' : '/bg.png'}`} className="p-10" />
                  </div>
              })
            }
          </div>
        </div>
      </div>
      <div className="text-gray-600 text-center mt-10 pb-5 text-lg font-semibold">
        {
          (data[0] && data[1] && data[2] && data[3] && data[4] && data[5] && data[6] && data[7] && data[8]) ? "Game Over" : (turnX ? "Turn : X" : "Turn : O")
        }
      </div>
      <div className="text-center pb-10">
        <button className="bg-violet-800 px-4 py-2 text-white border-violet-800 border-2 shadow-lg rounded cursor-pointer"
         onClick={()=> {
          setData(["", "", "", "", "", "", "", "", ""]);
          setTurnX(true);
          }}>New Game</button>
      </div>
    </div>
  </>);
}

export default PlayGame;