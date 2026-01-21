'use client'

import { useRef, useState } from "react";
import { Sun, Moon, Clock, } from "lucide-react";
import { useRouter } from "next/navigation";


const Stopwatch = () => {

   const [dark, setDark] = useState(false);
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
      <div className="w-[97%] mx-auto">
         <div className={`w-[90%] mx-auto h-[80dvh] text-white mt-10 ${dark ? 'bg-gray-800' : 'bg-purple-900'} 
         border-2 shadow-lg rounded-lg flex flex-col justify-between`}>
            <div className="one flex justify-between mx-5 mt-5">
               <div className="opacity-0">
                  .
               </div>
               <div className="theme flex gap-2">
                  <div className="border-white text-white  border-2 rounded-2xl p-2 cursor-pointer" onClick={() => router.push('/environment/time/clock')}>
                     <Clock height={32} width={32} />
                  </div>
                  {
                     dark ?
                        <div className="border-white text-white  border-2 rounded-2xl p-2 cursor-pointer" onClick={() => setDark(false)}>
                           <Moon height={32} width={32} />
                        </div> : <div className="border-white text-white  border-2 rounded-2xl p-2 cursor-pointer" onClick={() => setDark(true)}>
                           <Sun height={32} width={32} />
                        </div>
                  }
               </div>
            </div>
            <div className="flex items-center flex-col">
               <div className={`two my-10 text-2xl md:text-4xl lg:text-6xl font-bold px-13 md:px-20 lg:px-30 py-10 md:py-15 lg:py-20 mx-5 lg:mx-17 xl:mx-20 rounded-full border-2 ${dark ? 'border-gray-500' : 'border-white'} shadow-lg`}>
                  {format(time)}
               </div>
               <div className="btns text-lg flex gap-2 font-semibold">
                  <button className="bg-green-700 w-20 md:w-25 py-2 rounded-xl border-2 border-white cursor-pointer" onClick={startWatch}>{isStop ? "Resume" : "Start"}</button>
                  <button className="bg-yellow-700 w-20 md:w-25 py-2 rounded-xl border-2 border-white cursor-pointer" onClick={stop}>Stop</button>
                  <button className="bg-red-700 w-20 md:w-25 py-2 rounded-xl border-2 border-white cursor-pointer" onClick={reset}>Reset</button>
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