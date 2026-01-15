'use client'

import { Clock, Cloudy, LeafyGreen, CodeXml, MessageCircle, AtSign, ChessQueen, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const app = () => {
  
     const router = useRouter();

     return <>
          <div className="w-[97%] mx-auto py-5">
               <div className="">
                    <div className="heading text-xl font-semibold mb-3">All Applications</div>
                    <div className="apps  w-[97%] mx-auto">
                         <div className="gen my-6">
                              <div className="text-gray-700">General</div>
                              <div className="flex my-3 gap-3">
                                   <div className="bg-white w-33 h-33 rounded-xl">
                                        <div className="w-17 cursor-pointer mx-auto h-17 text-white bg-orange-600 rounded-xl mt-3 flex justify-center items-center"
                                        onClick={()=> router.push('/weather')}>
                                             <Cloudy height={40} width={40} />
                                        </div>
                                        <p className='text-gray-900 text-base mt-3 text-center'>Weather</p>
                                   </div>
                                   <div className="bg-white w-33 h-33 rounded-xl">
                                        <div className="w-17 cursor-pointer h-17 mx-auto bg-gray-600 text-white rounded-xl mt-3 flex justify-center items-center"
                                        onClick={()=> router.push('/time/stopwatch')} >
                                             <Clock height={40} width={40} />
                                        </div>
                                        <p className='text-gray-900 text-base mt-3 w-full text-center'>Stopwatch</p>
                                   </div>
                              </div>
                         </div>
                         <div className="dev my-6">
                              <div className="text-gray-700">Development</div>
                              <div className="flex my-3 gap-3">
                                   <div className="bg-white w-33 h-33 rounded-xl">
                                        <div className="w-17 cursor-pointer mx-auto h-17 text-white bg-purple-600 rounded-xl mt-3 flex justify-center items-center">
                                             <LeafyGreen height={40} width={40} />
                                        </div>
                                        <p className='text-gray-900 text-base mt-3 text-center'>SkyPanel AI</p>
                                   </div>
                                   <div className="bg-white w-33 h-33 rounded-xl">
                                        <div className="w-17 h-17 cursor-pointer mx-auto bg-blue-600 text-white rounded-xl mt-3 flex justify-center items-center">
                                             <CodeXml height={40} width={40} />
                                        </div>
                                        <p className='text-gray-900 text-base mt-3 w-full text-center'>Code Editor</p>
                                   </div>
                              </div>
                         </div>
                         <div className="chat my-6">
                              <div className="text-gray-700">Communication</div>
                              <div className="flex my-3 gap-3">
                                   <div className="bg-white w-33 h-33 rounded-xl">
                                        <div className="w-17 mx-auto h-17 cursor-pointer text-white bg-green-600 rounded-xl mt-3 flex justify-center items-center"
                                        onClick={()=> router.push('/chat')} >
                                             <MessageCircle height={40} width={40} />
                                        </div>
                                        <p className='text-gray-900 text-base mt-3 text-center'>Chat Hub</p>
                                   </div>
                                   <div className="bg-white w-33 h-33 rounded-xl">
                                        <div className="w-17 h-17 mx-auto cursor-pointer bg-pink-600 text-white rounded-xl mt-3 flex justify-center items-center">
                                             <AtSign height={40} width={40} />
                                        </div>
                                        <p className='text-gray-900 text-base mt-3 w-full text-center'>Mail</p>
                                   </div>
                              </div>
                         </div>
                         <div className="game my-6">
                              <div className="text-gray-700">Games</div>
                              <div className="flex my-3 gap-3">
                                   <div className="bg-white w-33 h-33 rounded-xl">
                                        <div className="w-17 mx-auto cursor-pointer h-17 text-white bg-red-600 rounded-xl mt-3 flex justify-center items-center"
                                        onClick={()=> router.push('/games/chess/playchess')}>
                                             <ChessQueen height={40} width={40} />
                                        </div>
                                        <p className='text-gray-900 text-base mt-3 text-center'>Chess</p>
                                   </div>
                                   <div className="bg-white w-33 h-33 rounded-xl">
                                        <div className="w-17 h-17 cursor-pointer mx-auto bg-yellow-600 text-white rounded-xl mt-3 flex justify-center items-center"
                                        onClick={()=> router.push('/games/tic-tac-toe')}>
                                             <X height={40} width={40} />
                                        </div>
                                        <p className='text-gray-900 text-base mt-3 w-full text-center'>Tic Tac Toe</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </>
}

export default app;