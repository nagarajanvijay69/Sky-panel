import AiInput from "./AiInput";

interface pageProps {
   setQuery: React.Dispatch<React.SetStateAction<string>>,
   query: string,
   chats: messageType[],
   setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>,
   isSidebarOpen: boolean
}

type messageType = {
   sender: string,
   message: string
}



const ChatPage = (props: pageProps) => {
   const { query, setQuery, chats, setWelcomePage, isSidebarOpen } = props;

   return <>
      <div className="h-[calc(100dvh-150px)] w-[100%]  overflow-y-scroll">
         <div className="h-[calc(100dvh-60px)] my-3 px-3 pb-4 flex flex-col gap-3 lg:px-16">
            {
               chats.map((item, index) => (
                  <div key={index} className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"}`}>
                     <p className={`flex py-2 px-3 max-w-[70%] md:max-w-[45%] lg:max-w-[70%] xl:max-w-[45%] ${item.sender === "user" ? "bg-violet-800 text-white justify-end rounded-lg" :
                        "justify-start bg-gray-300 rounded-lg break-words"}`}>
                        {item.message}
                     </p>
                  </div>
               ))
            }
         </div>
         <div className={`h-[80px] w-[85%] fixed bottom-1 md:bottom-2 lg:bottom-3 flex justify-center items-center
             ${isSidebarOpen ? "opacity-0 lg:opacity-100" : "lg:ml-15"}`}>
            <AiInput query={query} setQuery={setQuery} setWelcomePage={setWelcomePage} />
         </div>
      </div>
   </>
}

export default ChatPage;