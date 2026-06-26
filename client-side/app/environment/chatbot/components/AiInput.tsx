import axios from "axios";
import { SendHorizonal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addAIConversation, addAIMessage, initAIMessage, messageType, RootState, addSelectedChatId, updateUser } from "@/app/store/store";

interface inputProps {
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
    setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>,
    userId: String,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}



const AiInput = (props: inputProps) => {
    const { query, setQuery, setWelcomePage, loading, setLoading } = props;
    const userId = useSelector((state: RootState) => state.user.value._id);
    const dispatch = useDispatch();
    const chatId = useSelector((state: RootState) => state.user.value.selectedChatId);
    console.log(loading);

    const handleMessage = async () => {
        if(!query) return;
        setLoading(true);
        if (chatId) {
            setWelcomePage(false);
            dispatch(addAIMessage({
                _id: "",
                chat_id: chatId,
                sender_id: userId.toString(),
                message: query,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }));
        }
        console.log(userId);


        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/chatbot/getResponse`,
            { userId, chatId, title: query.slice(0, 15), message: query.trim() });

        console.log(res);

        if (res?.data.success) {
            if (res?.data.idChatCreated) {
                console.log("chat created")
                dispatch(addAIConversation(res.data.chat));
                dispatch(addSelectedChatId(res.data.chat._id));
                dispatch(initAIMessage([{
                    _id: "",
                    chat_id: res.data.chat._id,
                    sender_id: userId.toString(),
                    message: query,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }]));
            }
            console.log(res);
            dispatch(updateUser(res.data.user));
            dispatch(addAIMessage(res.data.message));
            setWelcomePage(false);
        }
        setQuery("");
        setLoading(false);
    }

    return <>
        <div className="w-[90%] mx-auto max-w-3xl">
            <div className="border-3 border-violet-800 w-full h-15 overflow-hidden rounded-2xl text-gray-900 flex items-center">
                <textarea placeholder="Enter prompt here..."
                    className="px-6 outline-none w-full h-15 flex items-center resize-none pt-4 no-scrollbar"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                {/* send button */}
                <div className="mr-3 text-violet-800 cursor-pointer hover:text-purple-900">
                    <SendHorizonal height={30} width={30} onClick={handleMessage} />
                </div>
            </div>
        </div>
    </>
}

export default AiInput;