'use client'

import { BadgePlus, LeafyGreen, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";


interface sidebarProps {
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = (props: sidebarProps) => {
    const { isSidebarOpen, setIsSidebarOpen } = props;
    const [delay, setDelay] = useState(isSidebarOpen);

    useEffect(() => {
        if (isSidebarOpen) {
            const timer = setTimeout(() => {
                setDelay(true);
            }, 300)
        } else {
            setDelay(false);
        }
    }, [isSidebarOpen])
    return <>
        <div className="h-[calc(100dvh-60px)] bg-purple-800">
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
                     ${isSidebarOpen && 'pr-10'} hover:bg-purple-900 bg-purple-700 rounded-lg`}>
                        <div><BadgePlus /></div>
                        {isSidebarOpen && <p className={`${delay ? 'h-auto w-auto opacity-100' : 'h-0 w-0 overflow-hidden opacity-0'}
                         transistion-all duration-500`}>New Chat</p>}
                    </li>
                    <li className={`flex gap-2 justify-center items-center h-10 cursor-pointer
                     ${isSidebarOpen && 'pr-10'} hover:bg-purple-900 bg-purple-700 rounded-lg`}>
                        <div><Search /></div>
                        {isSidebarOpen && <p className={`${delay ? 'h-auto w-auto opacity-100' : 'h-0 w-0 overflow-hidden opacity-0'}
                         transistion-all duration-500`}>Search</p>}
                    </li>
                </ul>
                {/* Recent chats */}
                <div className={`mt-6 text-white w-[300px] mx-auto overflow-hidden transistion-[opacity]
                             duration-500 ease-in-out
                         ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <p>Recent Chats</p>
                    {/* Chats */}
                    <div className=" h-[60dvh] rounded  overflow-y-scroll no-scrollbar">
                        <ul className="flex flex-col gap-2 py-1">
                            <li className="px-3 h-8 flex items-center rounded-lg
                             hover:bg-purple-900 cursor-pointer">One</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Sidebar;