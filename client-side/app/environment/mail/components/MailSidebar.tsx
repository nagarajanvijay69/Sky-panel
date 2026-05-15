'use client'

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const MailSidebar = () => {
  const [user, setUser] = useState(1);
  return <div>
    <div className="text-center text-2xl mt-5 mb-2 lg:mr-15">Mail</div>
    <div className="pt-5 flex h-[100%] justify-center md:pr-10 w-[97%] mx-auto">
      <div className="flex flex-col w-full lg:w-lg gap-2">
        <div className="flex flex-col gap-4 pb-5">
          <div className="text-gray-700">To</div>
          {Array.from({ length: user }).map((item, i) => (
            <div key={i} className="flex gap-1">
              <input type="mail" className="outline-none border border-gray-400 text-gray-600 w-full rounded px-5 h-10"
                placeholder="Enter email" />
              {i === user - 1 &&
                <div className="flex gap-2">
                  <button className="bg-purple-800 text-white cursor-pointer h-10 w-13 flex
           justify-center items-center rounded-lg" onClick={() => {
                      if (user < 5) setUser(user + 1)
                    }}>
                    <Plus />
                  </button>
                  {i !== 0 &&
                    <button className="bg-purple-800 text-white cursor-pointer h-10 w-13 flex
           justify-center items-center rounded-lg" onClick={() => {
                        if (user !== 1) setUser(user - 1)
                      }}>
                      <Minus />
                    </button>
                  }
                </div>
              }
            </div>
          ))}
        </div>
        <div className="flex justify-center flex-col gap-3">
          <p className="text-gray-700">Subject</p>
          <input type="text" className="outline-none border border-gray-400 text-gray-600 rounded px-5 w-full h-10"
            placeholder="Enter subject" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Message</p>
          <textarea className="w-full h-40 outline-none border border-gray-400 p-5 resize-none rounded text-gray-600"
            placeholder="Enter your message"></textarea>
        </div>
      </div>
    </div>
      <div className="send text-center mt-5 lg:mr-15 pb-10">
        <button className="bg-purple-800 h-10 w-30 text-white rounded">Send Mail</button>
      </div>
  </div>
}

export default MailSidebar;