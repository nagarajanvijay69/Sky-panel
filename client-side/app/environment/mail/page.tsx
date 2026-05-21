'use client'

import { Mail, Pen, Send, Tag, Trash } from "lucide-react";
import EnvNav from "../EnvNav";
import { useState } from "react";


const MailPage = () => {
  const [count, setCount] = useState(1);

  return <>
    <div className="bg-[url('/mail-sm.jpeg')] min-h-dvh md:bg-[url('/mail-lg.jpeg')] bg-cover">
      <EnvNav />
      <div className="flex items-center mt-14 md:mt-10">
        <div className="bg-violet-900/90 h-[80dvh] rounded-2xl w-[90dvw] shadow-2xl border-2 border-violet-900/20
         md:w-[70dvw] lg:w-[60dvw] mx-auto p-5">
          <div className="flex gap-2 justify-center items-center text-white">
            <div className=""><Send height={38} width={38} /></div>
            <p className="text-2xl font-bold">Send Mail</p>
          </div>
          <p className="text-center text-gray-300">Compose and send your message</p>
          {/* to */}
          <div className="mt-2 text-white mb-3">
            <p>To</p>
            <div className="border-violet-600 border-2 flex shadow-2xl h-14 items-center gap-2 px-3 rounded-lg">
              <div className="bg-violet-600 p-2 rounded-full"><Mail /></div>
              <input type="text" className="outline-none w-full h-full " placeholder="Leodass@example.com" />
            </div>
            <div className="border-violet-600 border-2 flex shadow-2xl h-14 items-center gap-2 px-3 rounded-lg mt-1">
              <div className="bg-violet-600 p-2 rounded-full"><Mail /></div>
              <input type="text" className="outline-none w-full h-full " placeholder="Parthiban@example.com" />
            </div>
          </div>
          {/* subject */}
          <div className="text-white mb-3">
            <p>Subject</p>
            <div className="border-violet-600 border-2 flex shadow-2xl h-14 items-center gap-2 px-3 rounded-lg mt-1">
              <div className="bg-violet-600 p-2 rounded-full"><Tag /></div>
              <input type="text" className="outline-none w-full h-full " placeholder="Enter subject" />
            </div>
          </div>
          <div className="text-white mb-3">
            <p>Message</p>
            <div className="border-violet-600 border-2 flex shadow-2xl h-28 gap-2 px-3 rounded-lg mt-1">
              <div className="bg-violet-600 p-2 rounded-full h-10 w-10 flex justify-center items-center mt-2"><Pen /></div>
              <textarea className="outline-none resize-none w-full h-full mt-3" placeholder="Enter your message here..."></ textarea>
            </div>
          </div>
          {/* buttons */}
          <div className="flex w-full justify-center gap-5 mt-10">
            <button className="flex bg-gradient-to-r from-violet-500 via-violet-600 p-2 gap-1 rounded-lg
             shadow-lg to-purple-800 text-white cursor-pointer">
              <div><Send /></div>
              <p>Send Mail</p>
            </button>
            <button className="flex border-2 border-gray-400  rounded-lg px-3 shadow-2xl gap-1 p-2 text-white cursor-pointer">
              <div className="text-violet-200"><Trash /></div>
              <p>Clear</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default MailPage;