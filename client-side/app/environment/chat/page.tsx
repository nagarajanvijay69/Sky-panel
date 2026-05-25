'use client'

import { BadgePlus, Plus, SendHorizontal } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import socket from "@/app/socket.js";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setConversation, initMessage, addMessage, clearMessage } from "@/app/store/store";
import { messageType, conversationType } from "@/app/store/store";


const ChatSidebar = () => {

  const userId = useSelector((state: RootState) => state.user.value._id);
  const router = useRouter();
  const dispatch = useDispatch()
  // const userData = useSelector((state: RootState) => state.user.value);
  const conversation: conversationType[] = useSelector((state: RootState) => state.user.value.conversation)
  // const conversation = [...useSelector((state: RootState) => state.user.value.conversation)].sort((a, b) =>
  //   new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  // );


  const message = useSelector((state: RootState) => state.user.value.message);
  const [userMessage, setUserMessage] = useState("");
  const [isShowChat, setIsShowChat] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const [selectedUser, setSelectedUser] = useState<conversationType>();

  const getConversation = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/chat/getConversation`,
      { userId });
    dispatch(setConversation(res.data?.conversations));
  }


  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    socket.emit("init", userId);
    console.log("socket initial emit");
  }, []);




  const addChatMessage = async () => {
    console.log("Function called", userMessage)
    if (!userMessage.trim()) return;
    const mes = {
      _id: "",
      chat_id: conversationId,
      sender_id: userId,
      message: userMessage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      receiverId: selectedUser?.receiverId
    }

    socket.emit("send_message", mes);
    setUserMessage("");
  }


  const getAllMessage = async (id: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/chat/getMessage`, { id });
    dispatch(initMessage(response.data.messages));
  }
  useEffect(() => {

    const handleMessage = (data: messageType) => {
      console.log("message added", data)
      dispatch(addMessage(data));
    }
    socket.on("new_message_added", handleMessage)

    return () => {
      socket.off("new_message_added", handleMessage);
    }
  }, []);


  const handleMessagePage = async (id: string, user: conversationType) => {
    setIsShowChat(true);
    setConversationId(id);
    setSelectedUser(user);
    getAllMessage(id);
  }

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [message, isShowChat]);


  return (
    <>
      <div className="h-[100dvh] lg:grid lg:grid-cols-5 xl:grid-cols-7 border-box overflow-y-hidden">
        <div className={`${isShowChat ? 'hidden lg:block' : ''} chat-sidebar lg:col-span-2 overflow-y-hidden relative`}>
          <div className="chat-title px-4 pl-5 py-3 mt-2 font-bold text-xl text-violet-900">
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
          <div className="chats px-4 pl-5 flex flex-col gap-1 pb-15 md:pb-10 mt-2 overflow-y-scroll h-[90dvh] md:h-[80dvh]">
            {
              conversation?.map((item, i) => {
                return <div key={i} className="bg-gray-200 rounded-md cursor-pointer flex items-center justify-between px-3 py-3"
                  onClick={() => handleMessagePage(item?._id, item)}>
                  <div className="flex gap-3 justify-center items-center">
                    <div className="rounded-full bg-violet-200 h-10 w-10 flex justify-center items-center border-2 border-violet-900">
                      <i>{item?.username?.at(0)?.toUpperCase()}</i>
                    </div>
                    <div className="">
                      <div className="">{item?.username}</div>
                      <div className="text-gray-700 text-sm">{item?.last_message?.slice(0, 30)}{item.last_message && '...'}</div>
                    </div>
                  </div>
                  {
                    item.unread_message > 0 && (
                      <div className="bg-violet-900 rounded-full text-white mr-2 h-5 w-5 text-sm flex justify-center items-center">
                        {
                          item.unread_message
                        }
                      </div>
                    )
                  }
                </div>
              })
            }
          </div>
          <div className="absolute bottom-20 md:bottom-10 cursor-pointer right-7  md:right-10 bg-violet-900 text-white p-2 rounded-full"
            onClick={() => router.push('/environment/chat/addUser')} >
            <BadgePlus height={40} width={40} />
          </div>
        </div>
        <div className={`${isShowChat ? '' : 'hidden lg:block'} div lg:col-span-3 xl:col-span-5 h-full border-box overflow-hidden`}>
          <div className="chat-container h-[100dvh] relative">
            <nav className="bg-violet-800 h-18 px-2 flex items-center gap-1">
              <div className="text-white flex items-center cursor-pointer lg:hidden">
                <ArrowLeft width={35} height={35} onClick={() => {
                  dispatch(clearMessage());
                  setIsShowChat(false);
                }} />
              </div>
              <div className="profile flex text-white justify-center items-center gap-3 ">
                <div className="circle h-10 w-10 flex justify-center items-center text-white text-2xl rounded-full bg-violet-500 border-2
             border-gray-300 shadow-lg">
                  {selectedUser?.username.at(0)?.toUpperCase() ?? "?"}
                </div>
                <div className="text-lg">
                  <div>{`${selectedUser?.username ?? 'Unknown User'}`}</div>
                  {/* <div className="text-sm text-gray-200">{userData.last_seen}</div> */}
                </div>
              </div>
            </nav>
            <div className="body h-[79dvh] md:h-[80dvh] overflow-y-scroll w-[95%] mx-auto my-3  px-3 pb-4 flex flex-col gap-3">
              {
                message?.map((item, index) => (
                  <div key={index}
                    className={`flex ${item.sender_id === userId ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex py-2 px-3 max-w-[85%] md:max-w-[45%] lg:max-w-[70%] xl:max-w-[45%]  ${item.sender_id === userId ? "bg-violet-700 text-white justify-end rounded-lg" :
                        "justify-start bg-gray-300 rounded-lg"}`}>
                      {item.message}
                    </div>
                  </div>
                ))
              }
              {/* scroll ref */}
              <div ref={scrollRef}></div>
            </div>

            {/* input section */}
            <section className="absolute h-15 w-[95%] left-2 ml-auto xl:left-35 bottom-1 flex items-center gap-2 lg:gap-4">
              <input type="text" className="w-200 h-12 outline-none border-2 
              focus:border-3 focus:border-violet-700 focus:shadow-lg border-gray-700 rounded-lg px-5"
                placeholder="Enter your message....." value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
              <div className="lg:h-9 lg:w-9 h-18 w-18 md:h-13 md:w-13 text-gray-700 cursor-pointer"
                onClick={addChatMessage}><SendHorizontal className="h-full w-full" /></div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatSidebar;