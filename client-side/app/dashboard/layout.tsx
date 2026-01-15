'use client'

import { useSelector } from "react-redux";
import Menu from "./Menu";
import Nav from "./Nav";
import { RootState } from "../store/store";

const layout = ({ children }: Readonly<{
     children: React.ReactNode;
}>) => {

     const login = useSelector((state: RootState) => state.user.value.login);

     return <>
          {login &&
               <>
                    <Nav />
                    <div className="bg-gray-200">
                         {children}
                    </div>
                    <Menu />
               </>
          }
     </>
}

export default layout;