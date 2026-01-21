'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ClockLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   const login = useSelector((state: RootState) => state.user.value.login);

   return <>
      {login && <div className="bg-gray-100">
         {children}
      </div>}
   </>
}

export default ClockLayout;