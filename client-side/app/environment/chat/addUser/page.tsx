'use client'

import { RootState } from "@/app/store/store";
import axios from "axios";
import { ArrowLeft, ChevronRight, Mail, Search, UserSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSearchUser, clearSearchUser } from "@/app/store/store"
import socket from "@/app/socket"


const AddUser = () => {
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.user.value._id);
    const [receiverId, setReceiverId] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.value.searchUser) || [];
    console.log("user data", userData)

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const searchUser = async () => {
        if (!email.trim()) return;
        dispatch(clearSearchUser());
        setSuccess(true);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/chat/searchUser`, { email });
        if (response.data.success) {
            dispatch(addSearchUser(response.data.userData));
        }
    }


    const createConversation = async () => {
        const data = {
            senderId: userId, receiverId: userData[0]._id, last_message: ""
        }
        socket.emit("create_conversation", data);
        router.push("/environment/chat");
    }

    return <>
        <div className="h-dvh bg-[url('/chat-sm.jpeg')] md:bg-[url('/chat-lg.jpeg')] bg-cover">
            <div className="bg-black/30 h-full">
                <nav className={`text-white w-[100dvw] flex justify-between h-[60px] px-3 bg-violet-800`}>
                    <div className="left h-full cursor-pointer flex items-center gap-1" onClick={() => router.push('/environment/chat')}>
                        <div className="left-icon">
                            <ArrowLeft height={30} width={30} className="" />
                        </div>
                        <p className="text-xl cursor-pointer font-semibold">Back</p>
                    </div>
                </nav>
                <div className="w-[95%] md:w-[90%] lg:w-[70%] mx-auto bg-violet-700/50 mt-5 rounded-lg shadow-2xl py-10 px-5">
                    <div className="flex flex-col items-center text-white">
                        <p className="text-3xl font-bold">Add New User</p>
                        <p className="text-gray-300">Search by email to start a new chat</p>
                    </div>
                    <div className="flex bg-violet-700 text-white px-2 h-12 rounded-lg items-center gap-1 border border-violet-700 shadow-lg mt-5">
                        <div className="bg-violet-800 p-1 rounded-md shadow"><Mail width={28} height={28} /></div>
                        <input type="search" className="w-full h-full text-gray-200 outline-none px-1 pl-3" placeholder="Enter email address"
                            onChange={(e) => setEmail(e.target.value)} value={email} onKeyDown={(k) => console.log(k.key)} />
                        <div className="bg-violet-900 p-1 rounded-md shadow cursor-pointer" onClick={searchUser}><Search width={27} height={27} /></div>
                    </div>
                    <div className="text-gray-200 mt-5">
                        {success &&
                            <p className="text-lg font-semibold text-white">Search Results</p>
                        }
                        <div className="mt-2 flex flex-col gap-2 h-[36dvh]">
                            <div>
                                <>
                                    {userData[0] ? (
                                        userData.map((item, i) => (
                                            <div key={i} className="h-14 border border-violet-600  shadow-xl flex items-center px-2 rounded-lg gap-3 md:gap-5">
                                                <div className="bg-violet-500 rounded-full flex h-11 w-11 justify-center items-center
                                                font-bold border-2 border-violet-900 shadow-lg">{item.username[0]}</div>
                                                <div className="mr-auto">
                                                    <p className="">{item.username}</p>
                                                    <p className="text-sm text-gray-300 max-w-50 md:max-w-98 md:overflow-none
                                               overflow-hidden">{item.email}</p>
                                                </div>
                                                <div className="mr-3 flex cursor-pointer" onClick={createConversation}>
                                                    <p className="hidden md:block">Start Chat</p>
                                                    <div><ChevronRight /></div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                        :

                                        <>
                                            {success && <p className="pl-5">No user Found</p>}
                                        </>
                                    }
                                </>
                            </div>
                        </div>
                        <hr className="mt-5 text-violet-500" />
                        <div className="flex gap-2 mt-5 justify-center items-center">
                            <div className="bg-violet-700 p-2 rounded-full text-violet-100 border border-violet-100 shadow-2xl"><UserSearch width={40} height={40} /></div>
                            <div>
                                <p className="">Can't find the user you're looking for?</p>
                                <p className="text-sm text-gray-300">Make sure the email is correct</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default AddUser;