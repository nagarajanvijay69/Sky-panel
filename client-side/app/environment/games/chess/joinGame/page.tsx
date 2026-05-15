'use client'

import { Swords, X } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

const JoinGame = () => {

  const [teamCode, setTeamCode] = useState("");
  const router = useRouter();

  const handleCancel = () => {
    router.push('/environment/games/chess');
  }

  return <>
    <div className="">
      <Header />
      <div className="min-h-[calc(100dvh-112px)] flex flex-col justify-center mt-2">
        <div className="w-[90%] md:w-[95%] mx-auto lg:w-[70%] xl:w-[60%] text-violet-800 bg-gray-100 shadow-xl my-5 rounded-lg p-5">
          <div className="text-2xl font-semibold text-center mt-7 mb-4">Joi<span className="border-b-2">n Ga</span>me</div>
          <div className="px-5 text-center text-gray-700">Enter the code shared by your opponent to start the game</div>
          <div className="text-center mt-10">Enter your Team Code</div>
          {/* code */}
          <div>
            <input className="w-[95%] rounded-lg bg-violet-200 border mx-auto mt-3 border h-20 flex justify-center text-center
          outline-none focus:border-0 shadow-xl items-center text-3xl text-violet-900 font-bold"
              value={teamCode} type="text" onChange={(e) => setTeamCode(e.target.value)} placeholder="984587" />
          </div>
          <div className="flex flex-col gap-3 my-5">
            <div className="flex justify-center items-center">
              <button className="bg-violet-800 text-white flex justify-center items-center rounded
             gap-1 px-3 py-3 w-[90%] md:w-[80%] lg:w-[60%] cursor-pointer">
                <Swords />
                Join Match
              </button>
            </div>
            <div className="flex justify-center items-center mb-5">
              <button className="border border-violet-800 shadow flex justify-center items-center rounded
             gap-1 px-3 py-3 w-[90%] md:w-[80%] lg:w-[60%] cursor-pointer" onClick={handleCancel}>
                <X />
                Cancel
              </button>
            </div>
            {/* <div className="flex gap-4 mt-5 justify-center">
              <div className="bg-violet-300 h-15 w-15 rounded-lg flex justify-center items-center">user1</div>
              <div className="flex justify-center items-center h-15">VS</div>
              <div className="bg-violet-300 h-15 w-15 rounded-lg flex justify-center items-center">user1</div>
            </div> */}
          </div>
        </div>
        <p className="w-[88%] md:w-[93%] text-violet-800 mx-auto lg:w-[68%] xl:w-[58%] text-center my-8">Standard tournment rules apply. 10 Rapid time control.
          Rating points will be calculated upon completion
        </p>
      </div>
      <Footer />
    </div>
  </>
}

export default JoinGame;