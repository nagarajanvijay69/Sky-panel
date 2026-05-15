'use client'

import { useState } from "react";
import EnvNav from "../EnvNav";
import ChatPage from "./components/ChatPage";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";

type messageType = {
   sender: string,
   message: string
}

const Chatbot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [welcomePage, setWelcomePage] = useState(true);
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState<messageType[]>([{
    message: "Hello",
    sender: "user"
  },{
    message: "Hello, how can i assist you today? these was a good day about this app",
    sender: "ai"
  },{
    message: "Nothing special how can i assist you today? these was a good day about this app.",
    sender: "user"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok, feel free to ask me!",
    sender: "ai"
  },
  {
    message: "ok",
    sender: "user"
  }]);

  return <>
    <div className="h-[100dvh] w-[100dvw] border-box overflow-hidden">
      <div className=""><EnvNav /></div>
      <div className="flex w-full">
        <div className={`${isSidebarOpen ? 'w-[320px]' : 'w-[60px]'} border-r shadow-lg border-gray-300
         transition-[width] duration-500 ease-in-out`}>
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div className="flex-1">
          {
            welcomePage ? <Welcome setWelcomePage={setWelcomePage} setQuery={setQuery} query={query} isSidebarOpen={isSidebarOpen} />
              : <ChatPage setQuery={setQuery} query={query} chats={chats} setWelcomePage={setWelcomePage} isSidebarOpen={isSidebarOpen} />
          }
        </div>
      </div>
    </div>
  </>
}

export default Chatbot;