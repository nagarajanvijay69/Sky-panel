'use client'

import { addSelectedChatId, clearSelectedChatId, initAIConversation, initAIMessage, RootState } from "@/app/store/store";
import axios from "axios";
import { BadgePlus, LeafyGreen, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


interface sidebarProps {
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = (props: sidebarProps) => {
    const conversations = useSelector((state: RootState) => state.user.value.aiConversation);
    const userId = useSelector((state: RootState) => state.user.value._id);
    const { isSidebarOpen, setIsSidebarOpen, setWelcomePage } = props;
    const [delay, setDelay] = useState(isSidebarOpen);
    const dispatch = useDispatch();
    const selectedChatId = useSelector((state: RootState) => state.user.value.selectedChatId);
    console.log(selectedChatId)
    const onetimeRef = useRef(false);



    const getAiConversations = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/chatbot/getAiConversation`, { userId });
        // console.log("Response", res.data.conversations);
        dispatch(initAIConversation(res.data.conversations));
    }

    const selectParticularChat = (id: string) => {
        console.log("setting id", id);

        dispatch(addSelectedChatId(id));

        console.log("setted id", selectedChatId)
        getAiMessage(id);
        setIsSidebarOpen(false)
        setWelcomePage(false);
    }

    const getAiMessage = async (id: string) => {
        console.log("gettion message for id", selectedChatId)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/chatbot/getAiMessage`, { chatId: id });
        console.log("Response", res.data.messages);
        dispatch(initAIMessage(res.data.messages));
    }

    useEffect(() => {
        if (userId && !onetimeRef.current) {
            getAiConversations();
            onetimeRef.current = true
            console.log("One time siderbar");
        }
    });

    useEffect(() => {
        if (isSidebarOpen) {
            const timer = setTimeout(() => {
                setDelay(true);
            }, 400)
        } else {
            setDelay(false);
        }
    }, [isSidebarOpen]);

    const handlenewChat = () => {
        setWelcomePage(true);
        setIsSidebarOpen(false)
        dispatch(clearSelectedChatId());
    }

    return <>
        <div className="h-[calc(100dvh-60px)] bg-violet-800">
            <div className="px-2 py-2 pt-3">
                {/* top content */}
                <div className="text-white flex justify-between items-center overflow-hidden">
                    {
                        isSidebarOpen && <div className={`flex gap-2 items-center opacity-0  
                         ${delay && 'opacity-100 transistion-[opacity] duration-300'}`}>
                            <LeafyGreen height={30} width={30} />SkyPanel AI</div>
                    }
                    <div className="cursor-pointer mr-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <X height={35} width={35} /> : <Menu height={35} width={35} />}
                    </div>
                </div>
                {/* List of Options */}
                <ul className="mt-5 text-white flex flex-col gap-2">
                    <li className={`flex gap-2 justify-center items-center h-10 cursor-pointer
                     ${isSidebarOpen && 'pr-10'} hover:bg-violet-900 bg-violet-700 rounded-lg`} onClick={handlenewChat}>
                        <div><BadgePlus /></div>
                        {isSidebarOpen && <p className={`${delay ? 'h-auto w-auto opacity-100' : 'h-0 w-0 overflow-hidden opacity-0'}
                         transistion-all duration-500`}>New Chat</p>}
                    </li>
                    {/* <li className={`flex gap-2 justify-center items-center h-10 cursor-pointer
                     ${isSidebarOpen && 'pr-10'} hover:bg-violet-900 bg-violet-700 rounded-lg`}>
                        <div><Search /></div>
                        {isSidebarOpen && <p className={`${delay ? 'h-auto w-auto opacity-100' : 'h-0 w-0 overflow-hidden opacity-0'}
                         transistion-all duration-500`}>Search</p>}
                    </li> */}
                </ul>
                {/* Recent chats */}
                <div className={`mt-6 text-white w-[300px] mx-auto overflow-hidden transistion-[opacity]
                             duration-500 ease-in-out
                         ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <p>Recent Chats</p>
                    {/* Chats */}
                    <div className=" h-[60dvh] rounded  overflow-y-scroll no-scrollbar">
                        <ul className={`flex flex-col gap-2 py-1 ${!delay && "hidden"}`}>
                            {conversations?.map((item, i) => (
                                <li key={i}
                                    className={`px-3 h-8 flex items-center rounded-lg hover:bg-violet-950 cursor-pointer 
                                        ${item._id == selectedChatId && 'bg-violet-900'}`}
                                    onClick={() => selectParticularChat(item._id)}
                                >{item.title.slice(0, 30)}{item.title[30] && "..."}</li>
                            ))}
                            {
                                !conversations?.[0] && (
                                    <li className={`px-3 h-8 flex items-center `}>
                                        No Chat Found
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Sidebar;