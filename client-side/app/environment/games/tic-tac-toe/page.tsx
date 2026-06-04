'use client'

import { RootState } from "@/app/store/store";
import { Equal, Frown, Gamepad2, Laptop, Medal, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const TicTacToe = () => {

   const router = useRouter();
   const user = useSelector((state: RootState) => state.user.value);

   return (
      <div className="h-[100dvh] md:bg-[url('/bg-pc.png')] bg-[url('/bg-mb.png')] bg-cover flex">
         <div className="flex flex-col items-center justify-center md:py-20 xl:w-[73%] w-full">
            <div className="md:mb-5">
               <div className="bg-violet-200 text-violet-900 rounded-lg p-3 flex gap-1 items-center shadow-md">
                  <div><Laptop /></div>
                  <p>Play With Computer</p>
               </div>
            </div>
            <div className="text-5xl md:text-6xl font-bold md:my-7 my-5 text-gray-800 flex gap-3">
               <span>Tic</span>
               <span className="text-purple-700">Tac </span>
               <span>Toe</span>
            </div>
            <div className="text-center text-gray-800 mb-3 md:mb-auto">
               <p>The classic game. Endless fun.</p>
               <p>Challenge the computer and test your skills!</p>
            </div>
            <div className="md:hidden">
               <img src="/tic-board.png" className="h-62 w-86 object-cover" />
            </div>
            <div>
               <button className="flex gap-4 my-1 md:my-6 md:mt-12 bg-violet-600 text-white px-6 py-2 rounded-2xl items-center jsutify-center 
                  cursor-pointer" onClick={() => router.push('/environment/games/tic-tac-toe/playGame')}>
                  <div className="rounded-full bg-violet-900 p-2"><Play /></div>
                  <p>Play Game</p>
               </button>
            </div>
            <div>
               <p className="text-gray-700">Start a new match and beat the computer</p>
            </div>
            <div className="w-[90%] md:w-auto text-sm md:text-base">
               <div className="bg-white grid grid-cols-4 text-center gap-3 rounded-lg shadow-lg p-5 md:mt-10 mt-4 text-violet-900">
                  <div className="md:w-40 flex flex-col items-center gap-1 border-r border-gray-300">
                     <div className="p-2 bg-purple-200 rounded-full w-min"><Medal height={30} width={30} /></div>
                     <div className="text-lg font-semibold">{user.tic_win}</div>
                     <p className="text-gray-700">Wins</p>
                  </div>
                  <div className="md:w-40 flex flex-col items-center gap-1 border-r border-gray-300">
                     <div className="p-2 bg-purple-200 rounded-full w-min"><Gamepad2 height={30} width={30} /></div>
                     <div className="text-lg font-semibold">{user.tic_total}</div>
                     <p className="text-gray-700">Total Matches</p>
                  </div>
                  <div className="md:w-40 flex flex-col items-center gap-1 border-r border-gray-300">
                     <div className="p-2 bg-purple-200 rounded-full w-min"><Frown height={30} width={30} /></div>
                     <div className="text-lg font-semibold">{Number(user.tic_total) - (Number(user.tic_win) + Number(user.tic_draw))}</div>
                     <p className="text-gray-700">Losses</p>
                  </div>
                  <div className="md:w-40 flex flex-col items-center gap-1">
                     <div className="p-2 bg-purple-200 rounded-full w-min"><Equal height={30} width={30} /></div>
                     <div className="text-lg font-semibold">{user.tic_draw}</div>
                     <p className="text-gray-700">Draws</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="xl:w-[23%] h-full flex justify-center items-center -ml-26 hidden xl:flex">
            <img src="/tic-board.png" className="h-100 w-[600] object-cover" />
         </div>
      </div>
   )
}

export default TicTacToe; 