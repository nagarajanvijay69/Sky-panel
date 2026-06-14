'use client'

import { useState } from "react";
import EnvNav from "../EnvNav";
import axios from 'axios'
import { Editor } from "@monaco-editor/react";
import { ArrowLeft, Copy, Play, Send, SendHorizonal, Sparkles, X, LucideAlignStartHorizontal } from "lucide-react";


type CodeLang = "html" | "css" | "javascript";

const Code = () => {

    const [language, setLanguage] = useState<CodeLang>("html");
    const [html, setHtml] = useState("<h1>Hello World!</h1>");
    const [css, setCss] = useState("h1{\n background-color: red;\n }");
    const [js, setJs] = useState("const heading = document.getElementsByTagName('h1')[0];\nheading.onclick = () => {\n heading.style.backgroundColor = 'blue';\n}");
    const [code, setCode] = useState("");
    const [src, setSrc] = useState("");
    const [isAI, setIsAI] = useState(false);
    const [query, setQuery] = useState("");
    const [load, setLoad] = useState(false);

    const [isOutputPage, setIsOutputPage] = useState(false);

    const validateOutput = () => {
        setIsAI(false);
        const template = `
          <DOCTYPE html>
          <html lan="en">
             <head>
              <style>${css}</style>
             </head>
             <body>
              ${html}
               <script>${js}</script>
             </body>
          </html>
        `
        setSrc(template);
        setIsOutputPage(true);
    };

    const getAiResponse = async () => {
        if (!query) return;
        setLoad(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/ai/getCodeEditorResponse`, {
                query, code: {
                    html, css, js
                }
            });

            setHtml(response.data.response.html);
            setCss(response.data.response.css);
            setJs(response.data.response.js);
            setIsAI(false);
            setQuery("");
        } catch (e) {
            alert(e);
        }
        setLoad(false)
    }

    return (
        <div className="bg-white">
            {
                isOutputPage ?
                    <div className="h-[100dvh]">
                        <nav className={`text-white w-[100dvw] flex justify-between h-15 px-3 bg-purple-800`}>
                            <div className="left h-full cursor-pointer flex items-center gap-1" onClick={() => setIsOutputPage(false)}>
                                <div className="left-icon">
                                    <ArrowLeft height={30} width={30} className="" />
                                </div>
                                <p className="text-xl cursor-pointer font-semibold">Back to Code</p>
                            </div>
                        </nav>
                        <div className="w-[95%] h-[80dvh] mx-auto mt-5">
                            <p className="text-xl mb-4">Output</p>
                            {/* output container */}
                            <div className="bg-gray-100 px-1 py-4 rounded-lg h-full w-full">
                                {/* output content */}
                                <iframe srcDoc={src} sandbox="allow-scripts" className="h-full w-full"></iframe>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="relative">
                        <EnvNav />
                        <div className="flex justify-between items-center">
                            <div className="option flex gap-2 mt-5 ml-5 items-center">
                                <div className="hidden md:block">Language</div>
                                <select value={language} onChange={(e) => {
                                    setLanguage(e.target.value as CodeLang);
                                }}
                                    className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700
                 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition">
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="javascript">Javascript</option>
                                </select>
                            </div>
                            <div className="mr-10 pt-5 flex gap-2 items-center">
                                <div className="play text-purple-800 cursor-pointer flex z-10" onClick={() => setIsAI(!isAI)}>
                                    <div><Sparkles /></div>
                                </div>
                                <div className="play text-purple-800 md:text-white md:bg-violet-800 cursor-pointer flex gap-2 md:px-2 md:py-2 rounded-lg"
                                    onClick={validateOutput}>
                                    <div><Play /></div>
                                    <div className="hidden md:block">Run Code</div>
                                </div>
                            </div>
                        </div>
                        {language === 'html' && (
                            <div className="editor h-[80dvh] mx-auto overflow-hidden mt-5 flex z-10" onClick={() => setIsAI(false)}>
                                <Editor
                                    language={'html'}
                                    value={html}
                                    onChange={(val) => setHtml(val || "")}
                                    className="mx-auto"
                                />
                            </div>
                        )
                        }
                        {language === 'css' && (
                            <div className="editor h-[80dvh] mx-auto overflow-hidden mt-5 flex z-10" onClick={() => setIsAI(false)}>
                                <Editor
                                    language={'css'}
                                    value={css}
                                    onChange={(val) => setCss(val || "")}
                                    className="mx-auto"
                                />
                            </div>
                        )
                        }
                        {language === 'javascript' && (
                            <div className="editor h-[80dvh] mx-auto overflow-hidden mt-5 flex z-10" onClick={() => setIsAI(false)}>
                                <Editor
                                    language={'javascript'}
                                    value={js}
                                    onChange={(val) => setJs(val || "")}
                                    className="mx-auto"
                                />
                            </div>
                        )
                        }
                        {
                            isAI && (
                                <div className="absolute w-[95%] md:w-[80%] lg:w-[50%] mx-auto top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        flex flex-col items-center gap-2 z-20 bg-white">
                                    <div className="bg-gray-100 rounded-3xl border-3 border-violet-400 flex gap-3 justify-center
                             items-center p-2 text-violet-700 shadow-lg w-30">
                                        <div><Sparkles size={20} /></div>
                                        <div className="text-lg font-bold">Ask AI</div>
                                    </div>
                                    <div className="border-2 border-violet-500 shadow-lg rounded-2xl w-full p-3">
                                        <div className="w-full">
                                            <div className="w-full justify-between flex">
                                                <p className="text-gray-800">What would you like to do?</p>
                                                <div className="text-gray-500 cursor-pointer" onClick={() => setIsAI(false)}><X /></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="text" className="border-2 border-gray-400 shadow-lg w-full mt-4 rounded-lg h-12 outline-none px-3"
                                                placeholder="Describe your changes or anything..." value={query} onChange={(e) => setQuery(e.target.value)} />
                                            <div className="flex items-center mt-3 bg-violet-700 text-white px-2 py-2 rounded-lg cursor-pointer"
                                            >
                                                {load ?
                                                    <div className="flex items-center justify-center">
                                                        <div className="w-6 h-6 border-4 border-gray-300 border-t-violet-700 rounded-full animate-spin"></div>
                                                    </div>
                                                    :
                                                    <SendHorizonal onClick={getAiResponse} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default Code;