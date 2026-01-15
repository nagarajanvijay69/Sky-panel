'use client'

import { useState } from "react"
import Link from "next/link";
import Image from "next/image";
import google from "../../../public/google.png"
import axios from "axios";
import { useDispatch } from "react-redux";
import { initUser } from "@/app/store/store";
import { useRouter } from "next/navigation";

const Signup = () => {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("");
     const dispatch = useDispatch();
     const router = useRouter();

     const submit = async(e: React.FormEvent) => {
          e.preventDefault();
          if (!name.trim() || !email.trim() || !password.trim()) return alert("All fields are required");
          console.log(name, email, password);

          try {
               let res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/signup`, {username: name, email, password},{
                    withCredentials: true
               });
               if (res.data.success) {
                    dispatch(initUser(res.data.user));
                    router.push('/dashboard/home');
               } else {
                    return alert(`${res.data.message}`);
               }
          } catch (error) {
               return console.error(error);
          }
     }

     return <>
          <div className="login h-[100dvh] flex items-center justify-center">
               <form className="flex flex-col w-80 rounded-lg p-4 border border-gray-300 border-2 shadow-2xl" onSubmit={submit}>
                    <div className="flex items-center justify-center text-2xl font-bold">Signup</div>
                    <div className="input flex flex-col mt-3">
                         <input type="text" value={name} required placeholder="Enter Your Username" onChange={(e) => setName(e.target.value)}
                              className="my-2 border-2 py-5 border-gray-200 w-full h-9 rounded outline-none px-3" />
                         <input type="email" value={email} required placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}
                              className="my-2 border-2 py-5 border-gray-200 w-full h-9 rounded outline-none px-3" />
                         <input type="password" value={password} required placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)}
                              className="my-1 border-2 py-5 border-gray-200 w-full outline-none rounded h-9 px-3" />
                         <button className="bg-purple-800 text-white rounded cursor-pointer py-2 my-2" type="submit">Signup</button>
                         <div className="my-2 flex justify-center gap-1">
                              Already Have account? <Link href='/auth/login' className="text-purple-800 cursor-pointer">Login</Link>
                         </div>
                    </div>
                    <div className="text-purple-800 py-2 bg-gray-100 items-center justify-center
                     gap-2 border border-gray-300 shadow-lg roundex-xl flex cursor-pointer mb-1">
                         <Image src={google} width={25} height={25} alt="google"></Image>
                         <div className="text-center mr-2 font-semibold">Google</div>
                    </div>
               </form>
          </div>
     </>
}

export default Signup