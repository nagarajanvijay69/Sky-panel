'use client'

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
    <div className="box">
      <h1 className="text-2xl font-bold text-center text-gray-800 py-10">Tic Tac Toe</h1>
      <div className="text-center">
        <div className="inline-flex">
          <div className="grid grid-cols-3 border-2 border-gray-500">
            {
              data.map((d, i) => {
                return <div key={i} className="bg-gray-300 border-2 border-gray-500 h-30
                 w-30 flex justify-center items-center text-2xl"
                  onClick={() => select(i)}>{d}</div>
              })
            }
          </div>
        </div>
      </div>
      <div className="text-gray-600 text-center mt-10 pb-10 text-lg font-semibold">
        {
          (data[0] && data[1] && data[2] && data[3] && data[4] && data[5] && data[6] && data[7] && data[8]) ? "Game Over" : (turnX ? "Turn : X" : "Turn : O")
        }
      </div>
      <div className="text-center pb-10">
        <button className="bg-green-600 px-4 py-2 text-white rounded cursor-pointer"
         onClick={()=> {
          setData(["", "", "", "", "", "", "", "", ""]);
          setTurnX(true);
          }}>New Game</button>
      </div>
    </div>
  </>);
}

export default PlayGame;