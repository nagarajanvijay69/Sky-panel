'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ClockLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

   const router = useRouter();
   const [dark, setDark] = useState(false);
   const login = useSelector((state: RootState) => state.user.value.login);



   return <>
     {login && <div className="bg-gray-100 w-[100dvw]">
         <nav className={`text-white w-full flex justify-between h-15 px-3 ${dark ? 'bg-gray-800' : 'bg-purple-900'}`}>
            <div className="left h-full flex items-center gap-1" onClick={() => router.push('/dashboard/home')}>
               <div className="left-icon">
                  <ArrowLeft height={30} width={30} className="cursor-pointer" />
               </div>
               <p className="text-xl cursor-pointer font-semibold">Dashboard</p>
            </div>
         </nav>
         {children}
      </div>}
   </>
}

export default ClockLayout;