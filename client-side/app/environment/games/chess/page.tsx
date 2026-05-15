'use client'

import { Merge, Shield, Star, } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import EnvNav from "../../EnvNav";
import Footer from "./components/Footer";


const Chess = () => {

     const router = useRouter();

     return <>
          <div className="max-w-[100dvw] overflow-x-hidden">
               <div className="bg-purple-900">
                    <EnvNav />
                    <div className="px-4 mt-5 w-full md:w-[80%] lg:w-[60%] xl:w-[50%]">
                         <p className="text-lg text-gray-50">Strategic Elegance</p>
                         <p className="text-base text-gray-300">Step into the gallery of grandmasters. Every move is a stroke
                              of genius in the digital arena of the world's most prestigious game.</p>
                    </div>
                    <div className="flex flex-col w-[97%] mt-5 mx-auto mb-12">
                         <div className="xl:w-[48%] flex flex-col gap-3 mx-auto">
                              <div className="bg-purple-800 p-5 h-65 rounded-lg flex flex-col justify-center">
                                   <div className="flex justify-between items-center">
                                        <div className="bg-purple-800 p-2 rounded"><Star height={38} width={38} /></div>
                                        <div className="font-semibold">New Challenge</div>
                                   </div>
                                   <div className="mt-5">
                                        <p className="text-lg mb-1">Create Game</p>
                                        <p className="text-gray-200">Host a private match or open a table for the global lobby.
                                             Customize time controls and stakes.</p>
                                   </div>
                                   <div className="mt-3 cursor-pointer bg-purple-800 w-35 px-3 py-2 text-center rounded-lg"
                                    onClick={()=> router.push('/environment/games/chess/createGame')}>Initialize Game</div>
                              </div>
                              <div className="bg-purple-800 p-5 h-65 rounded-lg flex flex-col justify-center">
                                   <div className="flex justify-between items-center">
                                        <div className="bg-purple-800 p-2 rounded"><Shield height={38} width={38} /></div>
                                        <div className="font-semibold">Random Challenge</div>
                                   </div>
                                   <div className="mt-5">
                                        <p className="text-lg mb-1">Randow Game</p>
                                        <p className="text-gray-200">Jump into a quick match with a randomly selected
                                              opponent from around the world.</p>
                                   </div>
                                   <div className="mt-3 cursor-pointer bg-purple-800 w-35 px-3 py-2 text-center rounded-lg"
                                    onClick={()=> router.push('/environment/games/chess/randomGame')}>Start Game</div>
                              </div>
                              <div className="bg-purple-800 p-5 h-65 rounded-lg flex flex-col justify-center">
                                   <div className="flex justify-between items-center">
                                        <div className="bg-purple-800 p-2 rounded"><Merge height={38} width={38} /></div>
                                        <div className="font-semibold">Active Lobby</div>
                                   </div>
                                   <div className="mt-5">
                                        <p className="text-lg mb-1">Join Game</p>
                                        <p className="text-gray-200">Browse open challenges across all skill levels.
                                             Enter the fray and climb the rankings.</p>
                                   </div>
                                   <div className="mt-3 cursor-pointer bg-purple-800 w-35 px-3 py-2 text-center rounded-lg"
                                    onClick={()=> router.push('/environment/games/chess/joinGame')}>Find Opponent</div>
                              </div>
                         </div>
                    </div>
                    <Footer />
               </div>
          </div>
     </>
}

export default Chess;