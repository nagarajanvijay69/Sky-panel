'use client'

import { ChessKnight, Merge, Shield, Star, } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import EnvNav from "../../EnvNav";
import Footer from "./components/Footer";


const Chess = () => {

     const router = useRouter();

     return <>
          <div className="max-w-[100dvw] overflow-x-hidden">
               <div className="bg-[url('/chess-mb.png')] md:bg-[url('/chess-lg.png')] bg-cover">
                    <EnvNav />
                    <div className="px-4 mt-5 w-full md:w-[80%] lg:w-[60%] xl:w-[50%] flex gap-2">
                         <div className="text-violet-900 bg-gray-100 p-2 h-min rounded-lg flex justify-center items-center">
                          <ChessKnight height={35} width={35} />
                         </div>
                         <div>
                              <p className="text-lg text-violet-900 font-semibold">Strategic Elegance</p>
                              <p className="text-base text-gray-700">Step into the gallery of grandmasters. Every move is a stroke
                                   of genius in the digital arena of the world's most prestigious game.</p>
                         </div>
                    </div>
                    <div className="flex flex-col w-[97%] mt-5 mx-auto mb-12 text-violet-800">
                         <div className="xl:w-[48%] flex flex-col gap-3 mx-auto">
                              <div className="bg-gray-100 p-5 h-65 rounded-lg flex flex-col justify-center shadow-lg">
                                   <div className="flex justify-between items-center">
                                        <div className="bg-violet-300 p-2 rounded"><Star height={38} width={38} /></div>
                                        <div className="font-semibold">New Challenge</div>
                                   </div>
                                   <div className="mt-5">
                                        <p className="text-lg mb-1">Create Game</p>
                                        <p className="text-gray-700">Host a private match or open a table for the global lobby.
                                             Customize time controls and stakes.</p>
                                   </div>
                                   <button className="mt-3 cursor-pointer text-white bg-violet-700 w-35 px-3 py-2 text-center rounded-lg"
                                        onClick={() => router.push('/environment/games/chess/createGame')}>Initialize Game </button>
                              </div>
                              {/* <div className="bg-gray-100 p-5 h-65 rounded-lg flex flex-col justify-center shadow-lg">
                                   <div className="flex justify-between items-center">
                                        <div className="bg-violet-300 p-2 rounded"><Shield height={38} width={38} /></div>
                                        <div className="font-semibold">Random Challenge</div>
                                   </div>
                                   <div className="mt-5">
                                        <p className="text-lg mb-1">Randow Game</p>
                                        <p className="text-gray-700">Jump into a quick match with a randomly selected
                                             opponent from around the world.</p>
                                   </div>
                                   <button className="mt-3 cursor-pointer text-white bg-violet-700 w-35 px-3 py-2 text-center rounded-lg"
                                        onClick={() => router.push('/environment/games/chess/randomGame')}>Start Game</button>
                              </div> */}
                              <div className="bg-gray-100 p-5 h-65 rounded-lg flex flex-col justify-center shadow-lg">
                                   <div className="flex justify-between items-center">
                                        <div className="bg-violet-300 p-2 rounded"><Merge height={38} width={38} /></div>
                                        <div className="font-semibold">Active Lobby</div>
                                   </div>
                                   <div className="mt-5">
                                        <p className="text-lg mb-1">Join Game</p>
                                        <p className="text-gray-700">Browse open challenges across all skill levels.
                                             Enter the fray and climb the rankings.</p>
                                   </div>
                                   <button className="mt-3 cursor-pointer text-white bg-violet-700 w-35 px-3 py-2 text-center rounded-lg"
                                        onClick={() => router.push('/environment/games/chess/joinGame')}>Find Opponent</button>
                              </div>
                         </div>
                    </div>
                    <Footer />
               </div>
          </div>
     </>
}

export default Chess;