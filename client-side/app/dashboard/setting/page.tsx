'use client'

import { RootState } from "@/app/store/store";
import { Info, Pencil, TriangleAlert, UserLock } from "lucide-react";
import { useSelector } from "react-redux";

const setting = () => {
     const user = useSelector((state: RootState) => state.user.value)
     return (
          <div className="w-[90%] mx-auto pb-5">
               <p className="text-2xl font-bold pt-8">Settings</p>
               <p className="text-gray-700">Manage your SkyPanel account</p>
               <div className="w-full mx-auto mt-5 bg-white rounded-lg p-4 shadow-xl">
                    <div>
                         <div className="flex justify-between">
                              <p className="text-lg font-bold text-gray-900">Account Information</p>
                              <div className="bg-gray-200 rounded-full p-3 cursor-pointer text-gray-800">
                                   <Pencil />
                              </div>
                         </div>
                         <div className="flex flex-col items-center mt-4 py-4">
                              <div className="h-30 w-30 rounded-full bg-gray-200 flex justify-center items-center 
                              text-4xl font-bold shadow-lg border">{user.username.at(0) ?? "N"}</div>
                              <p className="text-2xl mt-3 font-bold">{"Nagarajan Vijay"}</p>
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
                               bg-violet-700 h-10 w-40 rounded-lg text-white mt-5">Change Password</button>
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
                               bg-red-700 h-10 w-36 rounded-lg text-white mt-5">Delete Account</button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default setting;