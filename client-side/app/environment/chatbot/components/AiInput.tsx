import { SendHorizonal } from "lucide-react";

interface inputProps{
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
    setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>
}

const AiInput = (props: inputProps) => {
    const {query, setQuery, setWelcomePage} = props;
    return <>
        <div className="w-[90%] mx-auto max-w-3xl">
            <div className="border-3 border-purple-700 w-full h-15 rounded-2xl text-gray-900 flex items-center">
                <input type="text" placeholder="Enter prompt here..."
                    className="px-6 outline-none w-full h-15" 
                    onChange={(e)=> setQuery(e.target.value)}
                    value={query}
                    />
                {/* send button */}
                <div className="mr-3 text-purple-800 cursor-pointer hover:text-purple-900">
                  <SendHorizonal height={30} width={30} onClick={()=> setWelcomePage(false)} />
                </div>
            </div>
        </div>
    </>
}

export default AiInput;