'use client'

import { useState } from "react";
import EnvNav from "../EnvNav";
import { Editor } from "@monaco-editor/react";
import { ArrowLeft, Copy, Play } from "lucide-react";


type CodeLang = "python" | "java" | "c" | "cpp" | "csharp";

const Code = () => {


    const defaultValue = {
        python: "# Default Python code\nprint(\"Hello, World!\")",
        java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
        c: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\");\n    return 0;\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\";\n    return 0;\n}",
        cs: "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}"
    };
    const [language, setLanguage] = useState<CodeLang>("python");
    const [code, setCode] = useState("");
    console.log(code);

    const [isOutputPage, setIsOutputPage] = useState(false);

    const validateOutput = () => {
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
                        <div className="w-[95%] mx-auto mt-5">
                            <p className="text-xl mb-4">Output</p>
                            {/* output container */}
                            <div className="bg-gray-100 p-5 rounded-lg">
                                <div className="flex justify-end items-center h-10"><Copy className="text-gray-500 cursor-pointer"
                                 height={30} width={30} /></div>
                                {/* output content */}
                                <div>
                                    Hello, World!
                                </div>
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
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="c">C</option>
                                    <option value="cpp">C++</option>
                                    <option value="csharp">C#</option>
                                </select>
                            </div>
                            <div className="mr-10">
                                <div className="play text-purple-800 cursor-pointer" onClick={validateOutput}>
                                    <Play />
                                </div>
                            </div>
                        </div>
                        <div className="editor h-[80dvh] mx-auto overflow-hidden mt-5">
                            <Editor
                                language={language}
                                value={
                                    language === 'python' ? defaultValue["python"] :
                                        language === 'java' ? defaultValue["java"] :
                                            language === 'c' ? defaultValue["c"] :
                                                language === 'cpp' ? defaultValue["cpp"] : defaultValue["cs"]
                                }
                                onChange={(val) => setCode(val || "")}
                                className="mx-auto"
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default Code;