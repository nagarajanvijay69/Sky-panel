'use client'

import { useEffect, useState } from "react";
import { Sun, Moon, Hourglass, Timer } from "lucide-react";
import { useRouter } from "next/navigation";


const Clock = () => {

   const [format12, setFormat12] = useState(true);
   const [dark, setDark] = useState(false);
   const router = useRouter();

   const now = new Date();

   const [currentDate, setCurrentDate] = useState(now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric"
   }));

   const [currentTime, setCurrentTime] = useState(now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "numeric"
   }));

   const [Time, setTime] = useState(now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
   }));


   useEffect(() => {
      const timer = setInterval(() => {
         const now = new Date();

         const time = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "numeric"
         });

         const time24 = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
         });

         const date = now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric"
         });

         setTime(time24);
         setCurrentTime(time);
         setCurrentDate(date);
      }, 1000);

      return () => clearInterval(timer); // cleanup
   }, []);

   return <>
      <div className="w-[97%] mx-auto pt-10">
         <div className={`w-[90%] mx-auto h-[80dvh] border-violet-900/70 text-white bg-purple-900/40
         border-2 shadow-2xl rounded-lg flex flex-col justify-between`}>
            <div className="one flex justify-between mx-5 mt-5">
               <button className="text-lg text-gray-300 font-semibold flex justify-center items-center gap-1 cursor-pointer" onClick={() => setFormat12(!format12)}>
                  <div className="">
                     <Hourglass />
                  </div>
                  {format12 ? "12 Hour" : "24 Hour"}
               </button>
               <div className="theme flex gap-2">
                  <div className="border-gray-500 text-gray-300  border-2 rounded-2xl p-2 cursor-pointer" onClick={() => router.push('/environment/time/stopwatch')}>
                     <Timer height={32} width={32} />
                  </div>
               </div>
            </div>
            <div className="flex justify-center items-center">
               <div className={`two my-10 flex justify-center bg-purple-900/20 text-2xl md:text-4xl lg:text-6xl font-bold py-10 md:py-15 lg:py-20 mx-5 lg:mx-17 xl:mx-20 rounded-3xl w-162 border-2
                   border-violet-900/70 shadow-lg`}>
                  <div>{format12 ? currentTime.split(':').join(' : ') : <div>{Time.split(':').join(' : ')}</div>}</div>
               </div>
            </div>
            <div className="three">
               <div className="text-center text-lg md:text-xl lg:text-2xl font-semibold mb-7">
                  {currentDate}
               </div>
            </div>
         </div>
      </div>
   </>
}

export default Clock;