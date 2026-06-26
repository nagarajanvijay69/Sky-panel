'use client'

import { AlarmClockCheck, Award, ChessQueen, Globe, Share, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChessTotal, RootState, setColor, setMatchcode, updateUser } from "@/app/store/store";
import chessSocket from "@/app/chessSocket"
import axios from "axios";

const InitGame = () => {

  const router = useRouter();
  const [copy, setCopy] = useState(false);
  console.log("copy code", copy)
  const handleCancel = () => {
    router.push('/environment/games/chess');
  }

  const handleCopy = async () => {
     await navigator.clipboard.writeText(matchCode ?? "");
     setCopy(true);
  }

  const dispatch = useDispatch()
  const tempRef = useRef(false);

  const user = useSelector((state: RootState) => state.user.value._id);
  const matchCode = useSelector((state: RootState) => state.user.value.matchCode)



  useEffect(() => {
    if (!tempRef.current && user) {
      const code = String(Math.floor(10000 + (Math.random() * 90000)));
      dispatch(setMatchcode(code));
      console.log("team code", code)
      chessSocket.emit("connectMatch", {
        matchCode: code,
        role: "creator"
      });
      tempRef.current = true
    }
  });


  useEffect(() => {
    const handleRoomExist = () => {
      alert("Room already Exists, Refresh to create new code")
    }
    chessSocket.on("room-exists", handleRoomExist);
    return () => {
      chessSocket.off("room-exists", handleRoomExist);
    }
  }, []);

  useEffect(() => {
    const handleColor = (c: string) => {

      console.log(c as 'black' | 'white');
      dispatch(setColor(c))
    }
    chessSocket.on("player-color", handleColor);
    return () => {
      chessSocket.off("player-color", handleColor);
    }
  }, []);


  useEffect(() => {
    const handleJoinGame = async () => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/addChess`, { userId: user })
      dispatch(updateUser(res.data.user));
      router.push('/environment/games/chess/playGame');
    }
    chessSocket.on("game-start", handleJoinGame);

    return () => {
      chessSocket.off("game-start", handleJoinGame);
    }
  }, []);


  return <>
    <div className="bg-[url('/chess-mb.png')] md:bg-[url('/chess-lg.png')] bg-cover text-violet-800">
      <Header />
      <div className="text-2xl text-violet-800 text-center mt-7">Gam<span className="border-b-2">e L</span>obby</div>
      <div className="w-[90%] md:w-[95%] mx-auto lg:w-[70%] xl:w-[60%] bg-gray-100 shadow-xl mt-5 rounded-lg p-5">
        <div className="text-center">Your invitation code</div>
        {/* code */}
        <div>
          <input className="w-[95%] font-bold shadow border border-violet-800 rounded-lg bg-violet-200 mx-auto mt-5
           h-20 flex justify-center text-center items-center text-3xl outline-none"
            value={matchCode ?? ""} readOnly />
        </div>
        <div className="flex justify-center items-center mt-5 text-lg gap-3">
          <div className="p-2 rounded-full bg-violet-300"><ChessQueen height={25} width={25} /></div>
          <p>Waiting for opponent...</p>
        </div>
        <div className="flex flex-col gap-3 mt-8 mb-5">
          <div className="flex justify-center items-center">
            <button className="bg-violet-900 text-white flex justify-center items-center rounded gap-2 px-3 py-3 w-[90%] md:w-[80%]
             lg:w-[60%] cursor-pointer" onClick={handleCopy}>
              <Share />
             {!copy ? "Copy Code" : "Copied!"}
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button className="border-violet-600 border shadow text-violet-800 font-semibold flex justify-center items-center rounded
             gap-1 px-3 py-3 w-[90%] md:w-[80%] lg:w-[60%] cursor-pointer" onClick={handleCancel}>
              <X />
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto md:w-[95%] lg:w-[70%] xl:w-[60%] py-10 mt-5 rounded-lg
      grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 border-box">
        <div className="bg-gray-100 shadow-xl h-40  flex flex-col items-center justify-center rounded">
          <div className="bg-violet-300 p-2 rounded-full">
            <AlarmClockCheck width={40} height={40} />
          </div>
          <p className="mt-3">Format</p>
          <p className="text-gray-700 ">No time limit</p>
        </div>
        <div className="bg-gray-100 shadow-xl h-40 p-3 flex flex-col items-center justify-center rounded">
          <div className="bg-violet-300 p-2 rounded-full">
            <Award width={40} height={40} />
          </div>
          <p className="mt-3">Ranked</p>
          <p className="text-gray-700">Yes (+10 / -10)</p>
        </div>
        <div className="bg-gray-100 h-40 p-3 shadow-xl flex flex-col items-center justify-center rounded">
          <div className="bg-violet-300 p-2 rounded-full">
            <Globe width={40} height={40} />
          </div>
          <p className="mt-3">Region</p>
          <p className="text-gray-700 ">Global</p>
        </div>
      </div>
      <Footer />
    </div>
  </>
}

export default InitGame;