'use client'

import { RootState } from "@/app/store/store"
import { MessageCircle, Gamepad2, Sun, Activity, BrainCog, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"


const home = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const router = useRouter();
  return <>
    <div className="w-[98%] mx-auto lg:h-[calc(100dvh-70px)]">
      <div className="part-1 py-5 flex flex-col lg:flex-row gap-8 w-[95%] mx-auto">
        <div className="part-1-1 bg-gradient-to-r from-violet-800 to-violet-900 text-white h-130 lg:w-[50%] rounded-2xl p-4 py-6">
          <div className="flex justify-between items-center pr-2">
            <div className="flex gap-3">
              <div className="bg-violet-600 shadow-lg p-3 rounded-xl"><BrainCog width={40} height={40} /></div>
              <div className="flex flex-col justify-center">
                <p className="text-xl font-semibold">AI Analytics</p>
                <p className="text-gray-200">Real-time platform insights</p>
              </div>
            </div>
            <div className="flex gap-2 items-center border-2 border-violet-600 px-3 py-1 rounded-lg hidden lg:flex">
              <div className="h-3 w-3 bg-green-500 rounded-full "></div>
              <p className="text-lg">online</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap">
            <p className="text-gray-100 text">Welcome to SkyPanel</p>
            <p className="text-4xl lg:text-5xl font-bold">Nagarajan👋</p>
            <p className="text-gray-200 mt-2 lg:w-[60%]">Your personal workspace for conversations, games, whether tracking and intelligent insights</p>
          </div>
          <div className="flex flex-col gap-3 mt-5 lg:mt-8">
            <div className="flex w-full h-26 gap-3">
              <div className="w-full bg-violet-700 rounded-lg p-3 flex flex-col justify-center hover:scale-[1.01] transision duration-100">
                <p className="text-3xl font-bold">{user.total_message}</p>
                <p className="text-gray-100">Messages</p>
              </div>
              <div className="w-full bg-violet-700 rounded-lg p-3 flex flex-col justify-center hover:scale-[1.01] transision duration-100">
                <p className="text-3xl font-bold">{user.tic_draw + user.chess_total}</p>
                <p className="text-gray-100">Games</p>
              </div>
            </div>
            <div>
              <div className="flex w-full h-26 gap-3">
                <div className="w-full bg-violet-700 rounded-lg p-3 flex flex-col justify-center hover:scale-[1.01] transision duration-100">
                  <p className="text-3xl font-bold">{user.weather}</p>
                  <p className="text-gray-100">Weather</p>
                </div>
                <div className="w-full bg-violet-700 rounded-lg p-3 flex flex-col justify-center hover:scale-[1.01] transision duration-100">
                  <p className="text-3xl font-bold">{user.total_ai_message}</p>
                  <p className="text-gray-100">AI Request</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="part-1-2 lg:h-130 w-full lg:w-[50%] rounded-2xl flex flex-col overflow-hidden gap-5 md:gap-10 mb-24">
          <div className="one grid w-full h-full grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 gap-5">
            <div className="b bg-white rounded-2xl h-70 lg:h-auto w-full shadow-lg hover:scale-[1.01] transision duration-100 p-5
             flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="bg-blue-200 p-2 text-blue-600 rounded-lg"><MessageCircle size={30} /></div>
                <div className="text-blue-600 p-1 bg-blue-100 h-min rounded-xl px-2">Active</div>
              </div>
              <div>
                <p className="font-bold lg:text-xl text-2xl">Chat App</p>
                <p className="text-gray-700 w-[70%] lg:w-auto">Connect and communicate instantly</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="font-bold lg:text-lg text-2xl">{user.total_message}</p>
                  <p className="text-sm text-gray-700">Messages</p>
                </div>
                <div className="flex gap-1 text-blue-600 cursor-pointer" onClick={()=> router.push("/environment/chat")}>
                  <p>Open</p>
                  <div><ArrowRight /></div>
                </div>
              </div>
            </div>
            <div className="b bg-white rounded-2xl h-70 lg:h-auto w-full shadow-lg hover:scale-[1.01] transision duration-100 p-5
             flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="bg-purple-200 p-2 text-purple-800 rounded-lg"><MessageCircle size={30} /></div>
                <div className="text-purple-800 p-1 bg-purple-200 h-min rounded-xl px-2 opacity-0">Active</div>
              </div>
              <div>
                <p className="font-bold lg:text-xl text-2xl">Games Hub</p>
                <p className="text-gray-700 w-[70%] lg:w-auto">Chess & Tic Tac Toe Challenges</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="font-bold lg:text-lg text-2xl">{user.tic_total + user.chess_total}</p>
                  <p className="text-sm text-gray-700">Games Playes</p>
                </div>
                <div className="flex gap-1 text-purple-800 cursor-pointer" onClick={()=> router.push("/environment/games/tic-tac-toe")}>
                  <p>Play</p>
                  <div><ArrowRight /></div>
                </div>
              </div>
            </div>
            <div className="b bg-white rounded-2xl h-70 lg:h-auto w-full shadow-lg hover:scale-[1.01] transision duration-100 p-5
             flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="bg-yellow-100 p-2 text-yellow-600 rounded-lg"><Sun size={30} /></div>
                <div className="text-yellow-600 p-1 bg-yellow-100 h-min rounded-xl px-2 opacity-0">Active</div>
              </div>
              <div>
                <p className="font-bold lg:text-xl text-2xl">Weather</p>
                <p className="text-gray-700 w-[60%] lg:w-auto">Current conditions and forecast</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="font-bold lg:text-lg text-2xl">{user.weather}</p>
                  <p className="text-sm text-gray-700">{user.weatherCity}</p>
                </div>
                <div className="flex gap-1 text-yellow-600 cursor-pointer" onClick={()=> router.push("/environment/weather")}>
                  <p>View</p>
                  <div><ArrowRight /></div>
                </div>
              </div>
            </div>
            <div className="b bg-white rounded-2xl h-70 lg:h-auto w-full shadow-lg hover:scale-[1.01] transision duration-100 p-5
             flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="bg-green-200 p-2 text-green-600 rounded-lg"><Activity size={30} /></div>
                <div className="text-green-600 p-1 bg-green-100 h-min rounded-xl px-3">Live</div>
              </div>
              <div>
                <p className="font-bold lg:text-xl text-2xl">AI Assistant</p>
                <p className="text-gray-700 w-[70%] lg:w-auto">Smart Analysis & Insights</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="font-bold  lg:text-lg text-2xl">{user.total_ai_message}</p>
                  <p className="text-sm text-gray-700">Requests</p>
                </div>
                <div className="flex gap-1 text-green-600 cursor-pointer" onClick={()=> router.push("/environment/chatbot")}>
                  <p>Ask now</p>
                  <div><ArrowRight /></div>
                </div>
              </div>
            </div>
            {/* <div className="b bg-white rounded-2xl h-70 lg:h-auto w-full shadow-lg"><Gamepad2 /></div>
            <div className="a bg-white rounded-2xl h-70 lg:h-auto w-full shadow-lg"><Sun /></div>
            <div className="b bg-white rounded-2xl h-70 lg:h-auto w-full shadow-lg"><Activity /></div> */}
          </div>
        </div>
      </div>
    </div>
  </>
}

export default home