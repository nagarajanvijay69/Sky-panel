'use client'

import { useEffect, useState } from "react";
import EnvNav from "../EnvNav";
import ChatPage from "./components/ChatPage";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";
import { useDispatch } from "react-redux";
import { clearSelectedChatId } from "@/app/store/store";

const Chatbot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [welcomePage, setWelcomePage] = useState(true);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearSelectedChatId());
    // setLoading(false)
  }, []);


  const [loading, setLoading] = useState(true);



  return <>
    <div className="h-[100dvh] w-[100dvw] bg-white border-box overflow-hidden">
      <div className=""><EnvNav /></div>
      <div className="flex w-full">
        <div className={`${isSidebarOpen ? 'w-[320px]' : 'w-[60px]'} border-r shadow-lg border-gray-300
         transition-[width] duration-500 ease-in-out`}>
          <Sidebar isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen} setWelcomePage={setWelcomePage} />
        </div>
        <div className="flex-1">
          {
            welcomePage ? <Welcome setWelcomePage={setWelcomePage} setQuery={setQuery} query={query}
             isSidebarOpen={isSidebarOpen} loading={loading} setLoading={setLoading} />
              : <ChatPage setQuery={setQuery} query={query} setWelcomePage={setWelcomePage}
               isSidebarOpen={isSidebarOpen} loading={loading} setLoading={setLoading} />
          }
        </div>
      </div>
    </div>
  </>
}

export default Chatbot;