'use client'

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

  const login = useSelector((state: RootState) => state.user.value.login);

  return <>
   { login && <>
      <div className="bg-gray-200">
        {children}
      </div>
    </>}
  </>
}

export default layout;