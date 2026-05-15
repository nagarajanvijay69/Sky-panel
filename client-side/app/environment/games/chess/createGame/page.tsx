'use client'

import { AlarmClockCheck, Award, ChessQueen, Globe, Share, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const InitGame = () => {

  const router = useRouter();

  const handleCancel = () => {
    router.push('/environment/games/chess');
  }

  return <>
    <div className="">
      <Header />
      <div className="text-2xl text-violet-800 text-center mt-7">Gam<span className="border-b-2">e L</span>obby</div>
      <div className="w-[90%] md:w-[95%] mx-auto lg:w-[70%] xl:w-[60%] bg-violet-800 mt-5 rounded-lg p-5">
        <div className="text-center">Your invitation code</div>
        {/* code */}
        <div>
          <input className="w-[95%] rounded-lg bg-violet-900 mx-auto mt-5 h-20 flex justify-center text-center items-center text-3xl 
          outline-none"
            defaultValue={123456} readOnly />
        </div>
        <div className="flex justify-center items-center mt-5 text-lg gap-3">
          <div><ChessQueen height={30} width={30} /></div>
          <p>Waiting for opponent...</p>
        </div>
        <div className="flex flex-col gap-3 mt-10 mb-5">
          <div className="flex justify-center items-center">
            <button className="bg-violet-900 flex justify-center items-center rounded gap-2 px-3 py-3 w-[90%] md:w-[80%]
             lg:w-[60%] cursor-pointer">
              <Share />
              Share Code
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-violet-600 text-white flex justify-center items-center rounded
             gap-1 px-3 py-3 w-[90%] md:w-[80%] lg:w-[60%] cursor-pointer" onClick={handleCancel}>
              <X />
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto md:w-[95%] lg:w-[70%] xl:w-[60%] py-10 mt-5 rounded-lg
      grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 border-box">
        <div className="bg-violet-800 h-40  flex flex-col items-center justify-center rounded">
          <AlarmClockCheck width={40} height={40} />
          <p className="text-gray-400 mt-3">Format</p>
          <p className="">10min | Rapid</p>
        </div>
        <div className="bg-violet-800 h-40 p-3 flex flex-col items-center justify-center rounded">
          <Award width={40} height={40} />
          <p className="text-gray-400 mt-3">Ranked</p>
          <p className="">Yes (+10 / -10)</p>
        </div>
        <div className="bg-violet-800 h-40 p-3 flex flex-col items-center justify-center rounded">
          <Globe width={40} height={40} /> 
          <p className="text-gray-400 mt-3">Region</p>
          <p className="">Global</p>
        </div>
  </div> 
      <Footer />
    </div>
  </>
}

export default InitGame;