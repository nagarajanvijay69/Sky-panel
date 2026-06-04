'use client'

import { useState } from "react";
import EnvNav from "../EnvNav";
import { Editor } from "@monaco-editor/react";
import { ArrowLeft, Copy, Play } from "lucide-react";


type CodeLang = "html" | "css" | "javascript";

const Code = () => {

    const [language, setLanguage] = useState<CodeLang>("html");
    const [html, setHtml] = useState("<h1>Hello World!</h1>");
    const [css, setCss] = useState("h1{\n background-color: red;\n }");
    const [js, setJs] = useState("const heading = document.getElementsByTagName('h1')[0];\nheading.onclick = () => {\n heading.style.backgroundColor = 'blue';\n}");
    const [code, setCode] = useState("");
    console.log(code);
    const [src, setSrc] = useState("");

    const [isOutputPage, setIsOutputPage] = useState(false);

    const validateOutput = () => {
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
                    <div>
                        <EnvNav />
                        <div className="flex justify-between items-center">
                            <div className="option flex gap-2 mt-5 ml-5 items-center">
                                <div className="">Language</div>
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
                            <div className="mr-10">
                                <div className="play text-purple-800 cursor-pointer" onClick={validateOutput}>
                                    <Play />
                                </div>
                            </div>
                        </div>
                        {language === 'html' && (
                            <div className="editor h-[80dvh] mx-auto overflow-hidden mt-5">
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
                            <div className="editor h-[80dvh] mx-auto overflow-hidden mt-5">
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
                            <div className="editor h-[80dvh] mx-auto overflow-hidden mt-5">
                                <Editor
                                    language={'javascript'}
                                    value={js}
                                    onChange={(val) => setJs(val || "")}
                                    className="mx-auto"
                                />
                            </div>
                        )
                        }
                    </div>
            }
        </div>
    )
}

export default Code;