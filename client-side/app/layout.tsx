'use client'

import "./globals.css";
import { Provider, useSelector } from "react-redux";
import store, { initUser, setLogIn } from "./store/store"
import axios from "axios";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const verifyToken = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/token`, { withCredentials: true });
    
    if (res.data.success) {
      store.dispatch(initUser(res.data.user));
      store.dispatch(setLogIn(true));
    };
  }
  useLayoutEffect(() => {
    verifyToken();
  },[]);



  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
          <title>Sky Panel</title>
          <link rel="icon" href="../logo.png" />
        </head>
        <body>
          {children}
        </body>
      </html>
    </Provider>
  );
}
