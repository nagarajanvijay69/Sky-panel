'use client'

import { initUser, RootState, setLogIn, updateUser } from "@/app/store/store";
import axios from "axios";
import { Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PlayGame = () => {

  const userId = useSelector((state: RootState) => state.user.value._id);
  console.log(userId)
  const [turnX, setTurnX] = useState(true);

  const select = (i: number) => {
    if (winner || data[i] || !turnX) return;

    const updatedBoard = [...data];
    updatedBoard[i] = 'X';
    setData(updatedBoard);
    setTurnX(false);

    const empty = updatedBoard
      .map((item, i) => item === "" ? i : null)
      .filter((i) => i !== null);

    if (empty.length > 0 && !getWinner(updatedBoard)) {
      setTimeout(() => {
        const index = empty[Math.floor(Math.random() * empty.length)] as number
        setData(prev => {
          const board = [...prev];
          board[index] = "O";
          return board
        })
        setTurnX(true)
      }, 700)
    }


  };

  let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  const getWinner = (board: string[]) => {
    for (const [a, b, c] of winPattern) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  useEffect(() => {
    setWin();
    setDraw();
  });

  const dispatch = useDispatch();

  const winner = getWinner(data);
  const isDraw = data.every(i => i !== "");

  const temp = useRef(false)

  useEffect(() => {
    if (temp.current) return;
    addMatch();
    temp.current = true
  }, []);

  const setWin = async () => {
    if (winner === 'X') {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/addWin`, { userId });
      if (res.data.success) {
        dispatch(updateUser(res.data.user));
      }
    }
  }

  const setDraw = async () => {
    if (isDraw) {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/addDraw`, { userId });
      if (res.data.success) {
        dispatch(updateUser(res.data.user));
      }
    }
  }

  const addMatch = async () => {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/addTicTacToe`, { userId });
    dispatch(updateUser(res.data.user));
  }

  const router = useRouter();
  const handleNewGame = () => {
    addMatch()
    setData(["", "", "", "", "", "", "", "", ""]);
    setTurnX(true);
  }

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
                  <img src={`${d === 'X' ? '/tic-x.png' : d === 'O' ? '/tic-y.png' : '/bg.png'}`} className="p-8" />
                </div>
              })
            }
          </div>
        </div>
      </div>
      <div className="text-gray-600 text-center mt-10 pb-5 text-lg font-semibold">
        {
          winner ? `${winner} Won the Match!` :
            isDraw ? "Draw" :
              `Turn: ${turnX ? "X" : "O"}`
        }
      </div>
      <div className="text-center pb-10">
        {
          (isDraw || winner) &&
          <div className="flex gap-3 justify-center">
            <button className="bg-violet-800 px-4 py-2 text-white border-violet-800 border-2 shadow-lg rounded cursor-pointer"
              onClick={handleNewGame}>New Game</button>
            <button className="bg-violet-800 px-4 py-2 text-white border-violet-800 border-2 shadow-lg rounded cursor-pointer"
              onClick={() => router.push("/environment/games/tic-tac-toe")}>Back</button>
          </div>
        }
      </div>
    </div>
  </>);
}

export default PlayGame;