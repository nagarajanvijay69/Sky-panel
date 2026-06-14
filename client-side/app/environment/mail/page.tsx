'use client'

import { Mail, Pen, Pencil, Pointer, Send, Sparkles, Tag, Trash } from "lucide-react";
import EnvNav from "../EnvNav";
import { useState } from "react";
import axios from 'axios';


const MailPage = () => {
  const [mail1, setMail1] = useState("");
  const [mail2, setMail2] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [subjectAI, setSubjectAI] = useState("");
  const [messageAI, setMessagetAI] = useState("");
  const [query, setQuery] = useState("");
  const [load, setLoad] = useState(false);

  const sendMail = () => {
    if (!mail1.trim()) return alert("Enter mail id");
    if (!subject.trim()) return alert("Enter subject");
    if (!message.trim()) return alert("Enter Message");
    else {
      const encodeSubject = encodeURIComponent(subject);
      const encodeMessage = encodeURIComponent(message);
      console.log(encodeMessage, encodeSubject)
      if (!mail2.trim()) {
        window.location.href = `mailto:${mail1}?subject=${encodeSubject}&body=${encodeMessage}`;
      } else {
        window.location.href = `mailto:${mail1},${mail2}?subject=${encodeSubject}&body=${encodeMessage}`;
      }
      clearMail()
    }
  }

  const clearMail = () => {
    setMail1("");
    setMail2("");
    setSubject("");
    setMessage("");
  }

  const getAiResponse = async () => {
    if (!query) return;
    setLoad(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/ai/getMailResponse`, { query });
      setSubjectAI(response.data?.response.subject ?? "");
      setMessagetAI(response.data?.response.message ?? "");
      setQuery("");
    } catch (e) {
      alert(e)
    }
    setLoad(false);
  }

  return <>
    <div className="bg-[url('/mail-sm.jpeg')] min-h-dvh md:bg-[url('/mail-lg.jpeg')] bg-cover overflow-hidden">
      <EnvNav />
      <div className="flex flex-col lg:flex-row lg:justify-center gap-5 px-2">
        <div className="w-full lg:w-[65%]">
          <div className="flex items-center mt-14 md:mt-10">
            <div className="bg-violet-900/90 w-full rounded-2xl shadow-2xl border-2 border-violet-500
          p-5">
              <div className="flex gap-2 justify-center items-center text-white">
                <div className=""><Send height={38} width={38} /></div>
                <p className="text-2xl font-bold">Send Mail</p>
              </div>
              <p className="text-center text-gray-300">Compose and send your message</p>
              <div className="mt-2 text-white mb-3">
                <p>To</p>
                <div className="border-violet-600 border-2 flex shadow-2xl h-14 items-center gap-2 px-3 rounded-lg">
                  <div className="bg-violet-600 p-2 rounded-full"><Mail /></div>
                  <input type="text" className="outline-none w-full h-full" value={mail1} placeholder="Leodass@example.com"
                    onChange={(e) => setMail1(e.target.value)} />
                </div>
                <div className="border-violet-600   border-2 flex shadow-2xl h-14 items-center gap-2 px-3 rounded-lg mt-1">
                  <div className="bg-violet-600 p-2 rounded-full"><Mail /></div>
                  <input type="text" className="outline-none w-full h-full" value={mail2} placeholder="Parthiban@example.com"
                    onChange={(e) => setMail2(e.target.value)} />
                </div>
              </div>
              <div className="text-white mb-3">
                <p>Subject</p>
                <div className="border-violet-600 border-2 flex shadow-2xl h-14 items-center gap-2 px-3 rounded-lg mt-1">
                  <div className="bg-violet-600 p-2 rounded-full"><Tag /></div>
                  <input type="text" className="outline-none w-full h-full" value={subject} placeholder="Enter subject"
                    onChange={(e) => setSubject(e.target.value)} />
                </div>
              </div>
              <div className="text-white mb-3">
                <p>Message</p>
                <div className="border-violet-600 border-2 flex shadow-2xl h-52 lg:h-28 gap-2 px-3 rounded-lg mt-1">
                  <div className="bg-violet-600 p-2 rounded-full h-10 w-10 flex justify-center items-center mt-2"><Pen /></div>
                  <textarea className="outline-none resize-none w-full h-full lg:h-[85%] mt-3 no-scrollbar" value={message} placeholder="Enter your message here..."
                    onChange={(e) => setMessage(e.target.value)}></ textarea>
                </div>
              </div>
              <div className="flex w-full justify-center gap-5 lg:mt-10 mt-6">
                <button className="flex bg-gradient-to-r from-violet-500 via-violet-600 p-2 gap-1 rounded-lg
             shadow-lg to-purple-800 text-white cursor-pointer" onClick={sendMail}>
                  <div><Send /></div>
                  <p>Send Mail</p>
                </button>
                <button className="flex border-2 border-gray-400  rounded-lg px-3 shadow-2xl gap-1 p-2 text-white
             cursor-pointer" onClick={clearMail}>
                  <div className="text-violet-200"><Trash /></div>
                  <p>Clear</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[28%] lg:mt-10 pb-5">
          <div className=" bg-violet-900/90 lg:h-[80dvh] rounded-2xl shadow-2xl border-2 border-violet-500
          mx-auto p-5">
            <div className="flex gap-2 items-center">
              <Sparkles className="text-gray-200" size={26} />
              <p className="text-white text-lg font-bold">AI Assistant</p>
            </div>
            <p className="text-gray-400/100 mt-1 ml-9 lg:ml-0 text-sm">Generate subject and message using AI</p>
            <div className="text-gray-100 mt-4">
              <p className="text-[16px]">Your Prompt</p>
              <input type="text" placeholder="e.g., Invite client for product demo"
                className="outline-none border-2 border-violet-500 w-full h-12 px-5 rounded text-gray-200 mt-1"
                value={query} onChange={(e) => setQuery(e.target.value)} />
              <button className="flex w-full justify-center bg-gradient-to-r from-violet-700
               to-purple-800 h-12 items-center rounded mt-2 cursor-pointer shadow-lg gap-2 pr-5" onClick={getAiResponse}>
                {
                  load ? <div className="flex items-center gap-1 text-white">
                    <span className="h-3 w-3 rounded-full bg-white animate-pulse"></span>
                    <span
                      className="h-3 w-3 rounded-full bg-white animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="h-3 w-3 rounded-full bg-white animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                    : <>
                      <Sparkles className="text-gray-200" size={22} />
                      <p>Generate</p>
                    </>
                }
              </button>
            </div>
            <div className="mt-7 lg:mt-4">
              <div className="flex gap-2 items-center text-gray-200">
                <p>AI Generated Content</p>
                <Sparkles className="" size={17} />
              </div>
            </div>
            <div className="border-2 border-violet-500 p-2 mt-3 lg:mt-1 text-gray-200 rounded-lg shadow-xl">
              <div className="text-[15px]">Subject</div>
              <div className="flex mt-1 gap-2 items-center">
                <div className="p-2 rounded-full bg-violet-600 text-gray-200"><Tag className="" size={19} /></div>
                <input type="text" readOnly placeholder="AI will generate subject here"
                  className="outline-none w-full text-gray-200 text-[14px] overflow-hidden" value={subjectAI} />
                <div className="flex items-center justify-around gap-1 border border-gray-400 cursor-pointer px-2 py-1 rounded-lg"
                  onClick={() => {
                    setSubject(subjectAI);
                    setSubjectAI("")
                  }} >
                  <Pointer className="" size={15} />
                  <p>use</p>
                </div>
              </div>
            </div>
            <div className="border-2 border-violet-500 p-2 mt-1 text-gray-200 rounded-lg shadow-xl">
              <div className="text-[15px]">Message</div>
              <div className="flex mt-1 gap-2 items-start h-full">
                <div className="p-2 rounded-full bg-violet-600 text-gray-200"><Pencil className="" size={19} /></div>
                <textarea readOnly placeholder="AI will generate subject here" value={messageAI}
                  className="outline-none w-full text-gray-200 text-[14px] overflow-y-auto no-scrollbar resize-none h-30" />
                <div className="flex items-center justify-around gap-1 h-full mt-auto border border-gray-400 cursor-pointer px-2 py-1 rounded-lg"
                  onClick={() => {
                    setMessage(messageAI);
                    setMessagetAI("");
                  }} >
                  <Pointer className="" size={15} />
                  <p>use</p>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-2 flex lg:text-[14px] justify-center flex items-center text-gray-200 overflow-hidden">
              <p>AI can make mistakes. Please review before sending.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default MailPage;