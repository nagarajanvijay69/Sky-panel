'use client'

import { House, Layers, Settings } from "lucide-react";
import {useRouter} from "next/navigation";

const Menu = () => {
  const router = useRouter();
  return <>
    <div className="bg-gray-200 fixed bottom-3 left-1/2 left-1/2 -translate-x-1/2 border-2 border-gray-300 rounded-xl">
      <div className="bg-white flex gap-5  py-3 px-5 rounded-xl justify-center">
        <div className="home bg-orange-600 text-white p-3 rounded-xl cursor-pointer" 
        onClick={()=> router.push('/dashboard/home')}><House width={30} height={30} /></div>
        <div className="apps bg-purple-700 text-white p-3 rounded-xl cursor-pointer" 
        onClick={()=> router.push('/dashboard/apps')} ><Layers width={30} height={30} /></div>
        <div className="setting bg-gray-700 text-white p-3 rounded-xl cursor-pointer" 
        onClick={()=> router.push('/dashboard/setting')} ><Settings width={30} height={30} /></div>
      </div>
    </div>
  </>
}

export default Menu;