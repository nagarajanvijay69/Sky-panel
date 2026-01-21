'use client'

import Image from "next/image";
import ai from '../public/ai.jpg'
import chat from '../public/chat.jpg'
import game from '../public/game.jpg'
import {
   Sparkles, BrainCog, MessageCircle, Gamepad2, ArrowRight,
   UserStar, Gauge, Play
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { initUser, RootState, setLogIn } from "./store/store";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home = () => {

   const router = useRouter();
   const login = useSelector((state: RootState) => state.user.value.login);



   return <>
      <div className="home w-[95%] md:w-[97%] mx-auto">
         <div className="flex justify-center items-center mt-10">
            <div className="rounded-xl flex text-purple-900 py-2 border-1 border-purple-700 bg-purple-100 w-55 justify-center items-center">
               <div className="mx-2"><Sparkles size={20} /></div>
               <p className="mr-3">Welcome to Sky Panel!</p>
            </div>
         </div>
         <div className="flex justify-center items-center mt-5 text-gray-700 ">
            <div className="">
               <p className="text-center">Everything you need in one place - chat, play and get AI Assistant in Sky Panel
               </p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 md:mx-10 lg:grid-cols-auto md:mt-10 xl:grid-cols-3 xl:mx-30 place-items-center gap-6 my-5 mx-auto">
            <div className="mx-auto card border-2 border-gray-300 w-80 rounded-xl shadow-xl overflow-hidden">
               <div className="img">
                  <Image loading="eager" src={ai} alt="AI img" className="h-35 object-bottom object-cover"></Image>
               </div>
               <div className="define mx-5">
                  <div className="flex text-purple-900 gap-2 justify-start items-center mt-5">
                     <div className="AI icon bg-purple-100 justify-center items-center p-1.5 rounded border-purple-300 border-1"><BrainCog /></div>
                     <div className="text-lg font-semibold">AI Assistant</div>
                  </div>
                  <p className="text-gray-700 ml-11">Smater interactions with real time AI response</p>
               </div>
               <div className="points mx-5 mt-2">
                  <ul className="flex flex-col gap-2">
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">1</div>
                           <p className="">Ask questions instantly</p>
                        </span>
                     </li>
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">2</div>
                           <p className="">Genereate smart replies</p>
                        </span>
                     </li>
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">3</div>
                           <p className="">Smart guide and support</p>
                        </span>
                     </li>
                  </ul>
               </div>
               <div className="btn mx-5 my-5 flex justify-center">
                  <button onClick={() => {
                     if (login) router.push('/');
                     else router.push('/auth/login');
                  }} className="bg-purple-800 cursor-pointer text-white w-full py-3 rounded-xl flex items-center justify-center">
                     Explore Now
                     <ArrowRight className="ml-1 mt-1" />
                  </button>
               </div>
            </div>
            <div className="mx-auto card border-2 border-gray-300 w-80 rounded-xl shadow-xl overflow-hidden">
               <div className="img">
                  <Image loading="eager" src={chat} alt="AI img" className="h-35 object-bottom object-cover"></Image>
               </div>
               <div className="define mx-5">
                  <div className="flex text-purple-900 gap-2 justify-start items-center mt-5">
                     <div className="AI icon bg-purple-100 justify-center items-center p-1.5 rounded border-purple-300 border-1"><MessageCircle /></div>
                     <div className="text-lg font-semibold">Live chat app</div>
                  </div>
                  <p className="text-gray-700 ml-11">Connect with your friends through fast, reliable, and secure</p>
               </div>
               <div className="points mx-5 mt-2">
                  <ul className="flex flex-col gap-2">
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">1</div>
                           <p className="">Real time message</p>
                        </span>
                     </li>
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">2</div>
                           <p className="">One to one chat</p>
                        </span>
                     </li>
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">3</div>
                           <p className="">Online / Offline status</p>
                        </span>
                     </li>
                  </ul>
               </div>
               <div className="btn mx-5 my-5 flex justify-center">
                  <button onClick={() => {
                     if (login) router.push('/');
                     else router.push('/auth/login');
                  }} className="bg-purple-800 cursor-pointer text-white w-full py-3 rounded-xl flex items-center justify-center">
                     Chat Now
                     <ArrowRight className="ml-1 mt-1" />
                  </button>
               </div>
            </div>
            <div className="mx-auto card border-2 border-gray-300 w-80 rounded-xl shadow-xl overflow-hidden">
               <div className="img">
                  <Image loading="eager" src={game} alt="AI img" className="h-35 object-bottom object-cover"></Image>
               </div>
               <div className="define mx-5">
                  <div className="flex text-purple-900 gap-2 justify-start items-center mt-5">
                     <div className="AI icon bg-purple-100 justify-center items-center p-1.5 rounded border-purple-300 border-1"><Gamepad2 /></div>
                     <div className="text-lg font-semibold">Games</div>
                  </div>
                  <p className="text-gray-700 ml-11">Enjoy lightweight, fun, and interactive games</p>
               </div>
               <div className="points mx-5 mt-2">
                  <ul className="flex flex-col gap-2">
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">1</div>
                           <p className="">Play instantly</p>
                        </span>
                     </li>
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">2</div>
                           <p className="">Save your progress</p>
                        </span>
                     </li>
                     <li>
                        <span className="flex gap-2">
                           <div className="bg-gray-200 border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center">3</div>
                           <p className="">Casual & Simple</p>
                        </span>
                     </li>
                  </ul>
               </div>
               <div className="btn mx-5 my-5 flex justify-center">
                  <button onClick={() => {
                     if (login) router.push('/dashboard/apps');
                     else router.push('/auth/login');
                  }} className="bg-purple-800 cursor-pointer text-white w-full py-3 rounded-xl flex items-center justify-center">
                     Play Now
                     <ArrowRight className="ml-1 mt-1" />
                  </button>
               </div>
            </div>
         </div>
         <div className="quick bg-gray-100 rounded border-2 px-5 my-10 py-5 border-gray-200 shadow-xl pb-8">
            <p className="text-center text-xl font-semibold">Quick Start Guide</p>
            <div className="content flex lg:flex-row flex-col mt-5 gap-5 lg:gap-10">
               <div className="signup">
                  <div className="">
                     <div className="icon"></div>
                     <div className="">
                        <div className="flex gap-2 text-purple-900 items-center justify-start mt-1">
                           <div className="p-3 bg-purple-300 rounded border border-purple-400">
                              <UserStar width={30} height={30} />
                           </div>
                           <p className="text-xl font-semibold mt-[-20px]">Create Your Account</p>
                        </div>
                        <div className="text-gray-800 ml-18 mt-[-20px]">
                           Gets started by choosing your prefered login method. You can sign in instantly with your Google account for quick and secure
                           setup, or use email address and verify your account through a simple OTP sent to your inbox. Once you're in, your SkyPanel
                           profile is created automatically, giving you access to all main features without any extra steps.
                        </div>
                     </div>
                  </div>
               </div>
               <div className="signup">
                  <div className="">
                     <div className="icon"></div>
                     <div className="">
                        <div className="flex gap-2 text-purple-900 items-center justify-start mt-1">
                           <div className="p-3 bg-purple-300 rounded border border-purple-400">
                              <Gauge width={30} height={30} />
                           </div>
                           <p className="text-xl font-semibold mt-[-20px]">Explore Your Dashboard</p>
                        </div>
                        <div className="text-gray-800 ml-18 mt-[-20px]">
                           After logging in, you'll land on your dashboard, where every feature is neatly arranged for easy navigation.
                           You can open the AI assistant, check active chat rooms, view recent updates, and browse the available games. The
                           layout is designed to help you find everything quickly, move between sections smoothly, and stay updated with what's
                           happening inside SkyPanel.
                        </div>
                     </div>
                  </div>
               </div>
               <div className="signup">
                  <div className="">
                     <div className="icon"></div>
                     <div className="">
                        <div className="flex gap-2 text-purple-900 items-center justify-start mt-1">
                           <div className="p-3 bg-purple-300 rounded border border-purple-400">
                              <Play width={30} height={30} />
                           </div>
                           <p className="text-xl font-semibold mt-[-20px]">Start Using SkyPanel</p>
                        </div>
                        <div className="text-gray-800 ml-18 mt-[-20px]">
                           Being by using the AI assistant for instant help, explanations, or quick guidance based on what you need. Join live
                           chats to talk with friends or your community, or create your own chat space for private or group conversations. If
                           you enjoy games, open the game section to play, complete, or try new experiences built directly into the platform.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="btn flex items-center justify-center mb-15">
            <button onClick={() => {
                     if (login) router.push('/dashboard/apps');
                     else router.push('/auth/login');
                  }} className="flex items-center gap-1 justify-center text-white bg-purple-800 cursor-pointer w-full md:w-45 py-4 md:py-3 rounded-xl">
               Get Started
               <ArrowRight />
            </button>
         </div>
      </div>
   </>
}

export default Home;
