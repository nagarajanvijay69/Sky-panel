'use client'

import { Users, X } from "lucide-react";
import { useRouter } from "next/navigation";

const RandomGame = () => {
  const router = useRouter();
  return <>
    <div className="min-h-dvh bg-[url('/chess-mb.png')] md:bg-[url('/chess-lg.png')] bg-cover flex justify-center pt-24 md:pt-14">
      <div className="flex flex-col items-center">
        <div className="bg-gray-100 rounded-full p-3 border shadow-xl w-min">
          <Users height={40} width={40} className="text-violet-800" />
        </div>
        <p className="text-3xl font-bold text-gray-800 mt-3">Finding Your Opponent</p>
        <p className="text-gray-600 mt-2">We are searching for a player for 10min match</p>
        <div className="mt-14 md:mt-6">
          <div className="bg-gray-200 h-48 border-5 border-violet-900 w-48 rounded-full flex justify-center items-center">
            <img src="/chess-piece.jpg" alt="chess-loading" className="rounded-full object-cover h-40 w-40" />
          </div>
        </div>
        <p className="text-xl text-violet-900 font-bold mt-5">Searching...</p>
        <p className="text-gray-700">This may take a few seconds</p>
        <div className="mt-14 md:mt-6 flex flex-col items-center">
          <div className="bg-gray-100 rounded-full cursor-pointer p-2 border border-gray-300 text-violet-900 shadow-xl" onClick={()=> router.back()}>
            <X height={40} width={40} />
          </div>
          <p className="text-purple-800 font-medium mt-1">Cancel</p>
        </div>
      </div>
    </div>
  </>
}

export default RandomGame;