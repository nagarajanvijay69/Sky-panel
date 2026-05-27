'use client'

import { useDispatch, useSelector } from "react-redux";
import { initUser, RootState, setLogIn } from "../store/store";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import axios from "axios";

const layout = ({ children }: Readonly<{
     children: React.ReactNode;
}>) => {

     const router = useRouter();
     const dispatch = useDispatch();

     let log = useRef(useSelector((state: RootState) => state.user.value.login));

     const login = () => {
          if (!log.current) {
               verifyToken(navigate);
          }
     }

     const navigate = () => {
          if (!log.current) {
               router.replace('/auth/login');
          }
     }

     useLayoutEffect(() => {
          login();
     }, []);

     const verifyToken = async (callback: Function) => {
          let res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/token`, { withCredentials: true });
          if (res.data.success) {
               dispatch(initUser(res.data.user));
               log.current = true;
               dispatch(setLogIn(true));
          };
          callback();
     }



     return <>
          {log &&
               <>
                    <div className="bg-gray-100">
                         {children}
                    </div>
               </>
          }
     </>
}

export default layout;