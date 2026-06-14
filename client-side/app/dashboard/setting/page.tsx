'use client'

import { RootState } from "@/app/store/store";
import { Info, Pencil, TriangleAlert, UserLock } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const setting = () => {
     const user = useSelector((state: RootState) => state.user.value);
     const [changeName, setChangeName] = useState(false);
     const [changePassword, setChangePassword] = useState(false);
     const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPass, setConfirmPass] = useState("");
     const [updateLoad, setUpdateLoad] = useState(false);
     const [deleteLoad, setDeleteLoad] = useState(false);

     const handleChangeName = () => {
          setChangePassword(false);
          setChangeName(true);
     }

     const handleChangePassword = () => {
          setChangeName(false);
          setChangePassword(true);
     }

     return (
          <div className="w-[90%] mx-auto pb-30">
               <div onClick={() => {
                    setChangeName(false);
                    setChangePassword(false);
               }} className="static z-10">

                    <p className="text-2xl font-bold pt-8">Settings</p>
                    <p className="text-gray-700">Manage your SkyPanel account</p>
                    <div className="w-full mx-auto mt-5 bg-white rounded-lg p-4 shadow-xl">
                         <div>
                              <div className="flex justify-between">
                                   <p className="text-lg font-bold text-gray-900">Account Information</p>
                                   <div className="bg-violet-300 
                              shadow-lg rounded-full p-3 cursor-pointer text-violet-800" onClick={(e) => {
                                             e.stopPropagation();
                                             handleChangeName()
                                        }}>
                                        <Pencil />
                                   </div>
                              </div>
                              <div className="flex flex-col items-center mt-4 py-4">
                                   <div className="h-30 w-30 rounded-full bg-violet-200 flex justify-center items-center 
                              text-4xl font-bold shadow-lg border text-violet-800">{user.username.at(0) ?? "N"}</div>
                                   <p className="text-2xl text-violet-800 mt-3 font-bold">{"Nagarajan Vijay"}</p>
                                   <p className="text-xl">{"nagarajanvijay6380@gmail.com"}</p>
                              </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 w-full mx-auto mt-4 shadow-xl">
                         <p className="text-lg font-bold text-gray-900 mb-3">Security</p>
                         <div className="flex flex-col md:flex-row md:justify-between">
                              <div className="flex items-center gap-3">
                                   <div><UserLock size={30} /></div>
                                   <div>
                                        <p className="text-[16px] font-semibold text-gray-800">Change Password</p>
                                        <p className="text-gray-700">Secure your account with new password</p>
                                   </div>
                              </div>
                              <div>
                                   <button className="flex justify-center items-center cursor-pointer
                               bg-violet-700 h-10 w-40 rounded-lg text-white mt-5"
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             handleChangePassword();
                                        }}>Change Password</button>
                              </div>
                         </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 w-full mx-auto mt-4 shadow-xl">
                         <p className="text-lg font-bold text-gray-900 mb-3">About SkyPanel</p>
                         <div className="flex flex-col md:flex-row md:justify-between">
                              <div className="flex items-center gap-3">
                                   <div><Info size={30} /></div>
                                   <div>
                                        <p className="text-[16px] font-semibold text-gray-800">Version: 1.0.0</p>
                                        <p className="text-gray-700">SkyPanel brings all your tools together in one place</p>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="bg-red-200 rounded-lg border-2 border-red-500 p-4 w-full mx-auto mt-4 shadow-xl">
                         <p className="text-lg font-bold text-red-800 mb-3">About SkyPanel</p>
                         <div className="flex flex-col md:flex-row md:justify-between">
                              <div className="flex items-center gap-3">
                                   <div className="text-red-800"><TriangleAlert size={30} /></div>
                                   <div>
                                        <p className="text-[16px] font-semibold text-gray-900">Delete account</p>
                                        <p className="text-gray-800">This action is permanent and will remove all your data</p>
                                   </div>
                              </div>
                              <div>
                                   <button className="flex justify-center items-center cursor-pointer
                               bg-red-700 h-10 w-36 rounded-lg text-white mt-5">{deleteLoad ? <div className="flex justify-center items-center gap-1 text-white">
                                             <span className="h-3 w-3 rounded-full bg-white animate-pulse"></span>
                                             <span
                                                  className="h-3 w-3 rounded-full bg-white animate-pulse"
                                                  style={{ animationDelay: "0.2s" }}
                                             ></span>
                                             <span
                                                  className="h-3 w-3 rounded-full bg-white animate-pulse"
                                                  style={{ animationDelay: "0.4s" }}
                                             ></span>
                                        </div> : "Delete Account"}</button>
                              </div>
                         </div>
                    </div>
                    {/* change name */}
                    {changeName && (
                         <div className="fixed bg-white p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     border-2 border-gray-300 shadow-xl rounded-lg z-20 w-[90%] md:w-[60%] lg:w-[40%]"
                              onClick={(e) => e.stopPropagation()}>
                              <p className="text-xl font-bold text-center w-full">Update Name</p>
                              <div className="pt-4 px-5">
                                   <input type="text" className="outline-none border-2 h-12
                                    shadow-lg rounded-lg border-violet-900 w-full px-5"
                                        placeholder="Enter your name.." value={name} onChange={(e)=> setName(e.target.value)} />
                                   <button className="w-full bg-gradient-to-r from-violet-800 to-violet-900 text-white
                                   h-10 rounded-lg mt-2 cursor-pointer">{updateLoad ? <div className="flex justify-center items-center gap-1 text-white">
                                             <span className="h-3 w-3 rounded-full bg-white animate-pulse"></span>
                                             <span
                                                  className="h-3 w-3 rounded-full bg-white animate-pulse"
                                                  style={{ animationDelay: "0.2s" }}
                                             ></span>
                                             <span
                                                  className="h-3 w-3 rounded-full bg-white animate-pulse"
                                                  style={{ animationDelay: "0.4s" }}
                                             ></span>
                                        </div> : "Update"}</button>
                              </div>
                         </div>
                    )}
                    {changePassword && (
                         <div className="fixed bg-white p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     border-2 border-gray-300 shadow-xl rounded-lg z-30 w-[90%] md:w-[60%] lg:w-[40%]"
                              onClick={(e) => e.stopPropagation()}>
                              <p className="text-xl font-bold text-center w-full">Update Password</p>
                              <div className="pt-4 px-5">
                                   <input type="password" className="outline-none border-2 h-12
                                    shadow-lg rounded-lg border-violet-900 w-full px-5" value={password}
                                     onChange={(e)=> setPassword(e.target.value)}
                                        placeholder="Password.." />
                                   <input type="password" className="mt-2 outline-none border-2 h-12
                                    shadow-lg rounded-lg border-violet-900 w-full px-5" value={confirmPass}
                                        placeholder="confirm password.." onChange={(e)=> setConfirmPass(e.target.value)} />
                                   <button className="w-full bg-gradient-to-r from-violet-800 to-violet-900 text-white
                                   h-10 rounded-lg mt-2 cursor-pointer">{updateLoad ? <div className="flex items-center justify-center gap-1 text-white">
                                             <span className="h-3 w-3 rounded-full bg-white animate-pulse"></span>
                                             <span
                                                  className="h-3 w-3 rounded-full bg-white animate-pulse"
                                                  style={{ animationDelay: "0.2s" }}
                                             ></span>
                                             <span
                                                  className="h-3 w-3 rounded-full bg-white animate-pulse"
                                                  style={{ animationDelay: "0.4s" }}
                                             ></span>
                                        </div> : "Update"}</button>
                              </div>
                         </div>
                    )}
               </div>
          </div>
     )
}

export default setting;