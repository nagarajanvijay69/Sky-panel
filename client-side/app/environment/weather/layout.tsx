'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EnvNav from "../EnvNav";

const ClockLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   const login = useSelector((state: RootState) => state.user.value.login);

   return <>
      {login && <div className="bg-gray-100 h-[100dvh] overflow-x-hidden">
         <EnvNav />
         {children}
      </div>}
   </>
}

export default ClockLayout;