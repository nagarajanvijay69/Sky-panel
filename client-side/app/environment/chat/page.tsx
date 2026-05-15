'use client'

import { Plus, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ChatSidebar = () => {

  const chat = [{ name: 'Muthupandi', age: 29, _id: '0', lastseen: 'online', lastMsg: "good morning", unread: 2 },
  { name: 'Nagarajan', age: 19, _id: '1', lastseen: '2 hours ago', lastMsg: "how are you", unread: 0 },
  { name: 'Leo', age: 19, _id: '2', lastseen: '3 hours ago', lastMsg: "good bad ugly", unread: 2 },
  { name: 'Parthiban', age: 19, _id: '3', lastseen: '5 hours ago', lastMsg: "god bless you", unread: 0 },
  { name: 'Jeevan', age: 19, _id: '4', lastseen: 'online', lastMsg: "hello", unread: 3 },
  { name: 'Gandhi', age: 19, _id: '5', lastseen: '2 hours ago', lastMsg: "sweet", unread: 1 },
  { name: 'Mari', age: 19, _id: '6', lastseen: '4 hours ago', lastMsg: "master ", unread: 0 },
  { name: 'Vashu', age: 19, _id: '7', lastseen: 'online', lastMsg: "good morning", unread: 0 },
  { name: 'Cheenu', age: 19, _id: '8', lastseen: 'online', lastMsg: "great work", unread: 2 },
  { name: 'Vijay', age: 19, _id: '9', lastseen: '2 hours ago', lastMsg: "nothing.", unread: 5 },
  ];


  const [isShowChat, setIsShowChat] = useState(false);
  const [userId, setUserId] = useState("");
  const user = chat.filter(user => user._id === userId) || [];

  const chatMessage = [
    {
      sender: "self",
      message: "Hi, how are you"
    },
    {
      sender: "other",
      message: "im fine, what about you"
    },
    {
      sender: "self",
      message: "im fine."
    },
    {
      sender: "other",
      message: "Lorem ipsum, dolor sites blanditiis minima saepe esse quos deleniti. In, "
    },
    {
      sender: "self",
      message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, dolorem."
    },
    {
      sender: "self",
      message: "Good thing"
    },
    {
      sender: "other",
      message: "reiciendis voluptates blanditiis minima saepe esse quos deleniti. In, "
    },
    {
      sender: "self",
      message: "Lorem ipsum dolor sit amet."
    },
    {
      sender: "other",
      message: "Lorem ipsum, dolor sit amet saepe esse quos deleniti. In, "
    },
  ]

  return (
    <>
      <div className="h-[100dvh] lg:grid lg:grid-cols-5 xl:grid-cols-7 border-box overflow-y-hidden">
        <div className={`${isShowChat ? 'hidden lg:block' : ''} chat-sidebar lg:col-span-2 overflow-y-hidden`}>
          <div className="chat-title px-4 pl-5 py-3 mt-2 font-bold text-xl text-purple-900">
            ChatHub
          </div>
          <div className="search px-4 pb-3 mx-auto w-[97%]">
            <div className="flex items-center justify-center border pl-4 gap-2 bg-white mx-auto border-gray-200 h-[46px] w-full rounded-xl overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#6B7280">
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
              </svg>
              <input type="text" className="w-full h-full outline-none text-sm text-gray-500" placeholder="Search here..." />
            </div>
          </div>
          <div className="chats px-4 pl-5 flex flex-col gap-1 pb-20 mt-2 overflow-y-scroll h-[90dvh]">
            {
              chat.map((item, i) => {
                return <div key={i} className="bg-gray-200 rounded-md cursor-pointer flex items-center justify-between px-3 py-3"
                  onClick={() => {
                    setIsShowChat(true);
                    setUserId(item._id);
                  }}>
                  <div className="flex gap-3 justify-center items-center">
                    <div className="rounded-full bg-purple-200 h-10 w-10 flex justify-center items-center border-2 border-purple-900">
                      <i>{item.name.at(0)?.toUpperCase()}</i> </div>
                    <div className="">
                      <div className="">{item.name}</div>
                      <div className="text-gray-700 text-sm">{item.lastMsg.slice(0, 30)}{item.lastMsg[31] && '...'}</div>
                    </div>
                  </div>
                  {
                    item.unread > 0 && (
                      <div className="bg-purple-900 rounded-full text-white mr-2 h-5 w-5 text-sm flex justify-center items-center">
                        {
                          item.unread
                        }
                      </div>
                    )
                  }
                </div>
              })
            }
          </div>
        </div>
        <div className={`${isShowChat ? '' : 'hidden lg:block'} div lg:col-span-3 xl:col-span-5 h-full border-box overflow-hidden`}>
          <div className="chat-container h-[100dvh] relative">
            <nav className="bg-purple-900 h-18 px-2 flex items-center gap-1">
              <div className="text-white flex items-center cursor-pointer lg:hidden">
                <ArrowLeft width={35} height={35} onClick={() => setIsShowChat(false)} />
              </div>
              <div className="profile flex text-white justify-center items-center gap-3 ">
                <div className="circle h-10 w-10 flex justify-center items-center text-white text-2xl rounded-full bg-purple-500 border-2
             border-gray-300 shadow-lg">
                  {user[0]?.name.at(0)?.toUpperCase() ?? '?'}
                </div>
                <p className="text-lg">
                  <div>{`${user[0]?.name ?? 'Unknown User'}`}</div>
                  <div className="text-sm text-gray-200">{user?.[0]?.lastseen}</div>
                </p>
              </div>
            </nav>
            <div className="body h-[85dvh] overflow-y-scroll w-[95%] mx-auto my-3 px-3 pb-4 flex flex-col gap-3">
              {
                chatMessage.map((item, index) => (
                  <div key={index} className={`flex ${item.sender === "self" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex py-2 px-3 max-w-[85%] md:max-w-[45%] lg:max-w-[70%] xl:max-w-[45%]  ${item.sender === "self" ? "bg-purple-700 text-white justify-end rounded-lg" :
                      "justify-start bg-gray-400 rounded-lg"}`}>
                      {item.message}
                    </div>
                  </div>
                ))
              }
            </div>

            {/* input section */}
            <section className="absolute h-15 w-[95%] left-2 ml-auto xl:left-35 bottom-1 flex items-center gap-2 lg:gap-4">
              <input type="text" className="w-200 h-12 outline-none border-2 
              focus:border-3 focus:border-purple-700 focus:shadow-lg border-gray-700 rounded-lg px-5"
                placeholder="Enter your message....." />
              <div className="lg:h-9 lg:w-9 h-18 w-18 md:h-13 md:w-13 text-gray-700"><SendHorizontal className="h-full w-full" /></div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatSidebar;