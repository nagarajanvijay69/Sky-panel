'use client'

import Link from "next/link";
import { useState } from "react";

const forgetPassword = () => {

     const [email, setEmail] = useState("");
     const [otp, setOtp] = useState("");
     const [step, setStep] = useState(1);
     const [pass, setPass] = useState("");
     const [conPass, setConpass] = useState("");

     const submit = (e: React.FormEvent) => {
          e.preventDefault();
          if (!email.trim()) return alert("Enter your Email");
          console.log(email);
          setStep(2);
     }
     const submit2 = (e: React.FormEvent) => {
          e.preventDefault();
          if (!otp) return alert("Enter your OTP");
          console.log(otp);
          setStep(3);
     }
     const submit3 = (e: React.FormEvent) => {
          e.preventDefault();
          if (!pass || !conPass) return alert("All fields are required");
          if (pass !== conPass) return alert("Both passwordmust be same");
          setEmail("");
          setOtp("")
          setPass("");
          setConpass("");
          console.log(pass, conPass);
     }

     return <>
          {
               step == 1 &&
               <>
                    <div className="login h-[100dvh] flex items-center justify-center">
                         <form className="flex flex-col w-80 rounded-lg p-4 border-gray-300 border-2 shadow-2xl" onSubmit={submit}>
                              <div className="flex items-center justify-center text-2xl font-bold">Forgot Password</div>
                              <div className="input flex flex-col mt-3">
                                   <input type="email" required placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}
                                        className="my-2 border-2 py-5 border-gray-200 w-full h-9 rounded outline-none px-3" value={email} />
                                   <button className="bg-purple-800 text-white rounded cursor-pointer py-2 my-1" type="submit">Send OTP</button>
                                   <div className="my-2 flex justify-center gap-1">
                                        Remember Password? <Link href='/auth/login' className="text-purple-800 cursor-pointer">Login</Link>
                                   </div>
                              </div>
                         </form>
                    </div>
               </>
          }{
               step == 2 && <>
                    <div className="login h-[100dvh] flex items-center justify-center">
                         <form className="flex flex-col w-80 rounded-lg p-4 border border-gray-300 border-2 shadow-2xl" onSubmit={submit2}>
                              <div className="flex items-center justify-center text-2xl font-bold">Enter OTP</div>
                              <div className="input flex flex-col mt-3">
                                   <input type="text" required placeholder="Enter Your OTP" onChange={(e) => setOtp(e.target.value)}
                                        className="my-2 border-2 py-5 border-gray-200 w-full h-9 rounded outline-none px-3" value={otp} />
                                   <button className="bg-purple-800 text-white rounded cursor-pointer py-2 my-1" type="submit">Verify</button>
                                   <div className="my-2 flex justify-center gap-1">
                                        Remember Password? <Link href='/auth/login' className="text-purple-800 cursor-pointer">Login</Link>
                                   </div>
                              </div>
                         </form>
                    </div>
               </>
          }{
               step == 3 && <>
                    <div className="login h-[100dvh] flex items-center justify-center">
                         <form className="flex flex-col w-80 rounded-lg p-4 border border-gray-300 border-2 shadow-2xl" onSubmit={submit3}>
                              <div className="flex items-center justify-center text-2xl font-bold">New Password</div>
                              <div className="input flex flex-col mt-3">
                                   <input type="password" required placeholder="Enter New Password" onChange={(e) => setPass(e.target.value)}
                                        className="my-2 border-2 py-5 border-gray-200 w-full h-9 rounded outline-none px-3" value={pass} />
                                   <input type="password" required placeholder="Confirm New Password" onChange={(e) => setConpass(e.target.value)}
                                        className="my-2 border-2 py-5 border-gray-200 w-full h-9 rounded outline-none px-3" value={conPass} />
                                   <button className="bg-purple-800 text-white rounded cursor-pointer py-2 my-1" type="submit">Verify</button>
                                   <div className="my-2 flex justify-center gap-1">
                                        Remember Password? <Link href='/auth/login' className="text-purple-800 cursor-pointer">Login</Link>
                                   </div>
                              </div>
                         </form>
                    </div>
               </>
          }
     </>
}

export default forgetPassword;