import React, { use, useEffect, useState } from "react";
import AiInput from "./AiInput";
import { Code, Cog, Rabbit } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface pageProps {
    setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
    query: string,
    isSidebarOpen: boolean,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Welcome = (props: pageProps) => {
    const { setWelcomePage, setQuery, query, isSidebarOpen, loading, setLoading } = props;
    const userId = useSelector((state: RootState) => state.user.value._id);
    useEffect(() => {
        setLoading(false)
    }, [])


    return <>
        <div className="h-[calc(100dvh-60px)] overflow-y-scroll w-[100%] flex justify-center">
            <div className="w-full pt-20 lg:w-[80%]">
                {/*input */}
                <div className=" w-full ">
                    {
                        loading ?
                            <div className="h-[70dvh] md:h-[60dvh] w-full flex justify-center items-center
                             bg-[url('/load.gif')] bg-center bg-no-repeat bg-[length:150px_150px]"></div>
                            :
                            <div className="w-full flex flex-col items-center">
                                <div className="flex flex-col items-center mb-5 w-[90%] mx-auto text-center">
                                    <p className="text-2xl md:text-3xl text-violet-800 font-semibold mb-3">Hello, how can i help you today?</p>
                                    <p className="text-base text-gray-800 mb-5">Experience the next generation of intelligence.
                                        Ask anything, from complex coading to creative writing.</p>
                                </div>

                                <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 md:mt-10 px-5 pb-10">
                                    <div className="bg-violet-600 shadow-2xl h-45 text-white
                         rounded-lg flex justify-center items-center flex-col p-10 gap-2">
                                        <div className="flex justify-start w-full">
                                            <Code height={50} width={50} />
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <div className="text-lg font-semibold">Write Code</div>
                                            <div className="text-sm text-gray-100">React, Python, Java, C++, SQL help, etc.</div>
                                        </div>
                                    </div>
                                    <div className="bg-violet-600 shadow-2xl h-45 text-white
                         rounded-lg flex justify-center items-center flex-col p-10 gap-2">
                                        <div className="flex justify-start w-full">
                                            <Cog height={50} width={50} />
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <div className="text-lg font-semibold">Debug Errors</div>
                                            <div className="text-sm text-gray-100">Fix bugs and understand issues.</div>
                                        </div>
                                    </div>
                                    <div className="bg-violet-600 shadow-2xl h-45 text-white
                         rounded-lg flex justify-center items-center flex-col p-10 gap-2">
                                        <div className="flex justify-start w-full">
                                            <Rabbit height={50} width={50} />
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <div className="text-lg font-semibold">Learn Faster</div>
                                            <div className="text-sm text-gray-100">Concepts, examples, and interview prep.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    <div className={`w-full ${isSidebarOpen && "opacity-0 lg:opacity-100"} mb-4 pb-5 md:mt-8`}>
                        <AiInput query={query} setQuery={setQuery} setWelcomePage={setWelcomePage} userId={userId}
                            loading={loading} setLoading={setLoading} />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Welcome;