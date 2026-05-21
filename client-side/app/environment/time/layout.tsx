'use client'

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const ClockLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

   const login = useSelector((state: RootState) => state.user.value.login);
   const router = useRouter();

   return <>
      {login && <div className=" md:bg-[url('/clock-lg.jpeg')] bg-[url('/clock-sm.jpeg')] bg-cover h-[100dvh] w-[100dvw]">
         <nav className={`text-white w-[100dvw] flex justify-between h-[60px] px-3 bg-violet-950`}>
            <div className="left h-full cursor-pointer flex items-center gap-1" onClick={() => router.push('/dashboard/apps')}>
               <div className="left-icon">
                  <ArrowLeft height={30} width={30} className="" />
               </div>
               <p className="text-xl cursor-pointer font-semibold">Back</p>
            </div>
         </nav>         
         {children}
      </div>}
   </>
}

export default ClockLayout;