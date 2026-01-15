'use client'

import { useEffect, useState } from "react";
import { Bell, Settings } from "lucide-react";

const Nav = () => {

     const now = new Date();


     const [currentDate, setCurrentDate] = useState(now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
     }));
     
     const [currentTime, setCurrentTime] = useState(now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
     }));


     useEffect(() => {
          const timer = setInterval(() => {
               const now = new Date();

               const time = now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
               });


               const date = now.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
               });

               // console.log(time, date);

               setCurrentTime(time);
               setCurrentDate(date);
          }, 1000);

          return () => clearInterval(timer); // cleanup
     }, []);



     return <>
          <nav className="flex gap-2 justify-between px-5 py-5 bg-gray-200">
               <div className="left ">
                    <div className="font-bold text-xl">
                         {currentTime}
                    </div>
                    <div className="text-base text-gray-700">
                         {currentDate}
                    </div>
               </div>
               <div className="right">
                    <div className="flex items-center justify-end gap-2">
                         <div className="text-gray-600 rounded-full bg-white p-2 border border-gray-300 cursor-pointer">
                              <Bell />
                         </div>
                         <div className="text-gray-600 rounded-full bg-white p-2 border border-gray-300 cursor-pointer">
                              <Settings />
                         </div>
                    </div>
               </div>
          </nav>
     </>
}

export default Nav