'use client'

import { useRef, useState } from "react";
import { Sun, Moon, Clock, Play, Square, RotateCw, Pause, Timer, Hourglass, AlarmClock, } from "lucide-react";
import { useRouter } from "next/navigation";


const Stopwatch = () => {

   const router = useRouter();
   const [time, setTime] = useState(0);
   const start = useRef<any>(null);
   const interval = useRef<any>(null);
   const [isStop, setIsStop] = useState(false)

   const startWatch = () => {
      if (interval.current) {
         return;
      }
      setIsStop(false);
      start.current = Date.now() - time;
      // console.log(start.current);

      interval.current = setInterval(() => {
         setTime(Date.now() - start.current);
      }, 10);
   }

   const stop = () => {
      if (time !== 0) setIsStop(true);
      clearInterval(interval.current);
      interval.current = null;
   }

   const reset = () => {
      stop();
      setIsStop(false);
      setTime(0);
   }

   const format = (time: number) => {
      const minutes = Math.floor(time / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
      const milliseconds = Math.floor((time % 1000) / 10);

      const f = (v: number) => String(v).padStart(2, "0");

      return `${f(minutes)} : ${f(seconds)} : ${f(milliseconds)}`;
   };




   return <>
      <div className="w-[97%] mx-auto pt-10">
         <div className={`w-[90%] mx-auto h-[80dvh] text-white border-violet-900/70 bg-purple-900/40 
         border-2 shadow-lg rounded-lg flex flex-col`}>
            <div className="w-full flex justify-between p-5">
               <div className="opacity-0">.</div>
               <div className="text-gray-300 w-min border-2 border-gray-500 shadow-2xl rounded-2xl p-2 cursor-pointer" onClick={() => router.push('/environment/time/clock')}>
                  <Timer height={32} width={32} />
               </div>
            </div>
            <div className="h-full flex flex-col justify-center pb-10 md:pb-auto">
               <div className="flex flex-col w-full items-center">
                  <div className="rounded-full bg-violet-800 p-3 border border-violet-950 shadow-2xl"><AlarmClock height={40} width={40} /></div>
                  <p className="text-4xl font-semibold mt-2">Stopwatch</p>
                  <p className="text-gray-300">Measure your Time</p>
               </div>
               <div className="flex items-center justify-center flex-col">
               <div className={`two my-10 flex justify-center items-center text-2xl bg-purple-900/20 md:text-4xl lg:text-6xl font-bold
                   px-13 md:px-20 lg:px-30 py- m8d:py-15 h-20 lg:h-auto lg:py-15 mx-5 lg:mx-17 xl:mx-20 rounded-full border-2 border-violet-900/70 shadow-lg`}>
                  {format(time)}
               </div>
               <div className="btns text-lg flex gap-2 font-semibold">
                  <button className="bg-gradient-to-r from-violet-600 via-purple-900 to-violet-700 flex px-5 gap-2 justify-center items-center py-2 rounded-3xl border-2
                   border-violet-500 cursor-pointer shadow-2xl" onClick={startWatch}>
                     <div className="hidden md:block">
                        <Play />
                     </div><p>{isStop ? "Resume" : "Start"}</p></button>
                  <button className="bg-gradient-to-r from-violet-700 via-purple-900 to-violet-800 flex px-5 gap-2 justify-center items-center py-2 rounded-3xl border-2
                   border-violet-500 cursor-pointer shadow-2xl" onClick={stop}>
                     <div className="hidden md:block"><Square /></div>
                     <p>Stop</p>
                  </button>
                  <button className="bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 flex px-5 gap-2 justify-center items-center py-2 rounded-3xl border-2
                   border-violet-500 cursor-pointer shadow-2xl" onClick={reset}>
                     <div className="hidden md:block"><RotateCw /></div>
                     <p>Reset</p>
                  </button>
               </div>
            </div>
            </div>
            <div className="three">
               <div className="text-center text-lg md:text-xl lg:text-2xl font-semibold mb-7"></div>
            </div>
         </div>
      </div>
   </>
}

export default Stopwatch;