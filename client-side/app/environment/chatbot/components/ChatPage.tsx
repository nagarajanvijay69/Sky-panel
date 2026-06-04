import { useDispatch, useSelector } from "react-redux";
import AiInput from "./AiInput";
import { initAIMessage, RootState } from "@/app/store/store";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { messageType } from "@/app/store/store";
import 'highlight.js'

interface pageProps {
   setQuery: React.Dispatch<React.SetStateAction<string>>,
   query: string,
   setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>,
   isSidebarOpen: boolean,
   loading: boolean,
   setLoading: React.Dispatch<React.SetStateAction<boolean>>
}




const ChatPage = (props: pageProps) => {
   const selectedChatId = useSelector((state: RootState) => state.user.value.selectedChatId);
   const dispatch = useDispatch();
   const { query, setQuery, setWelcomePage, isSidebarOpen, loading, setLoading } = props;
   const onetimeRef = useRef(false);

   const getAiMessage = async () => {
      console.log("id", selectedChatId);

      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/chatbot/getAiMessage`, { chatId: selectedChatId });
      console.log("Response", res);
      dispatch(initAIMessage(res.data.messages));
   }

   useEffect(() => {
      setLoading(false)
      if (selectedChatId) {
         if (userId && !onetimeRef.current) {
            getAiMessage();
            onetimeRef.current = true
         }
      }
   });


   console.log("loading", loading)
   const messages = useSelector((state: RootState) => state.user.value.aiMessage);
   const userId = useSelector((state: RootState) => state.user.value._id);

   const perfectRes = (item: messageType) => {
      if (item.sender_id === "AI") return <ReactMarkdown
         rehypePlugins={[rehypeHighlight]}
         remarkPlugins={[remarkGfm]}
      >
         {item.message}
      </ReactMarkdown>

      return item.message
   }

   const scrollRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      scrollRef.current?.scrollIntoView({
         behavior: "smooth"
      });
   }, [messages]);

   return <>
      <div className="h-[calc(100dvh-150px)] w-[100%]  overflow-y-scroll">
         <div className=" my-3 px-3 pb-4 flex flex-col gap-5 lg:px-16">
            {
               messages?.map((item, index) => (
                  <div key={index} className={`flex ${item.sender_id === userId ? "justify-end" : "justify-start"} mx-auto md:mx-0 w-[80dvw] md:w-auto`}>
                     <div className={`py-2 px-3 max-w-[90%] lg:max-w-[70%] xl:max-w-[45%]
                      ${item.sender_id === userId ? "bg-violet-800 text-white justify-end rounded-lg" :
                           "justify-start bg-gray-300 rounded-lg overflow-scroll no-scrollbar"} whitespace-pre-wrap`}>
                        {perfectRes(item as messageType)}
                     </div>
                  </div>
               ))
            }
            {
               loading && (
                  <div className={`flex justify-start mx-auto md:mx-0 w-[80dvw] md:w-auto relative right-12`}>
                     <div className={`px-3 w-42 h-12
                              justify-start rounded-lg no-scrollbar bg-[url('/dot-load.gif')] bg-cover bg-center`}>
                     </div>
                  </div>
               )
            }
            <div ref={scrollRef}></div>
         </div>
         <div className={`h-[80px] w-[85%] fixed bottom-1 md:bottom-2 lg:bottom-0 flex justify-center items-center
             ${isSidebarOpen ? "hidden opacity-0 lg:opacity-100 lg:block lg:-ml-10" : "lg:ml-15"}`}>
            <AiInput query={query} setQuery={setQuery} setWelcomePage={setWelcomePage} userId={userId}
               loading={loading} setLoading={setLoading} />
         </div>
      </div>
   </>
}

export default ChatPage;