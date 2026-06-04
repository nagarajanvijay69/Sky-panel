'use client'

import "./globals.css";
import { Provider } from "react-redux";
import store, { initUser, initWeather, setLogIn } from "./store/store"
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import outfit from "./font";
import "highlight.js/styles/vs2015.css";

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const verifyToken = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/token`, { withCredentials: true });
    if (res.data.success) {
      store.dispatch(initUser(res.data.user));
      store.dispatch(setLogIn(true));
      const user = store.getState();
      const { data } = (await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/weather/${user.user.value.weatherCity}`)).data;
      store.dispatch(initWeather(`${(Number(data.temp) - 273.15).toFixed(1)}°C`));
    };
  }



  useEffect(() => {
    verifyToken()
  }, []);



  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
          <title>Sky Panel</title>
          <link rel="icon" href="../logo.png" />
        </head>
        <body className={outfit.className}>
          {children}
        </body>
      </html>
    </Provider>
  );
}
