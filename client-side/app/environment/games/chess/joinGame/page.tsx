'use client'

import { Swords, X } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addChessTotal, RootState, setColor, setMatchcode, updateUser } from "@/app/store/store";
import chessSocket from "@/app/chessSocket";
import axios from "axios";

const JoinGame = () => {

  const matchCode = useSelector((state: RootState) => state.user.value.matchCode);
  const userId =  useSelector((state: RootState) => state.user.value._id);
  const [teamCode, setTeamCode] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCancel = () => {
    router.push('/environment/games/chess');
  }

  // join match 
  const joinMatch = () => {
    dispatch(setMatchcode(teamCode))
    chessSocket.emit("connectMatch", {
      matchCode: teamCode,
      role: "joiner"
    })
    console.log("joined", teamCode)
  }

  //geting color
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


  // connect to match
  useEffect(() => {
    const handleJoinGame = async() => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/addChess`, { userId })
      dispatch(updateUser(res.data.user));
      router.push('/environment/games/chess/playGame');
    }
    chessSocket.on("game-start", handleJoinGame);

    return () => {
      chessSocket.off("game-start", handleJoinGame);
    }
  }, []);


  // check code validity
  useEffect(() => {
    const handleInvalidCode = () => {
      alert("Enter valid code");
      setTeamCode("")
    }

    chessSocket.on("invalid-code", handleInvalidCode);
    return () => {
      chessSocket.off("invalid-code", handleInvalidCode);
    }
  }, []);

  // check room is full or not
  useEffect(() => {
    const handleRoomFull = () => {
      alert("Room Full!");
    }

    chessSocket.on("room-full", handleRoomFull);
    return () => {
      chessSocket.off("room-full", handleRoomFull);
    }
  }, []);


  return <>
    <div className="bg-[url('/chess-mb.png')] md:bg-[url('/chess-lg.png')] bg-cover ">
      <Header />
      <div className="min-h-[calc(100dvh-112px)] flex flex-col justify-center mt-2">
        <div className="w-[90%] md:w-[95%] mx-auto lg:w-[70%] xl:w-[60%] text-violet-800 bg-gray-100 shadow-xl my-5 rounded-lg p-5">
          <div className="text-2xl font-semibold text-center mt-7 mb-4">Joi<span className="border-b-2">n Ga</span>me</div>
          <div className="px-5 text-center text-gray-700">Enter the code shared by your opponent to start the game</div>
          <div className="text-center mt-10">Enter your Team Code</div>
          {/* code */}
          <div>
            <input className="w-[95%] rounded-lg bg-violet-200 border mx-auto mt-3 border h-20 flex justify-center text-center
          outline-none focus:border-0 shadow-xl items-center text-3xl text-violet-900 font-bold"
              value={teamCode} type="text" onChange={(e) => setTeamCode(e.target.value)} placeholder="98458" />
          </div>
          <div className="flex flex-col gap-3 my-5">
            <div className="flex justify-center items-center">
              <button className="bg-violet-800 text-white flex justify-center items-center rounded
             gap-1 px-3 py-3 w-[90%] md:w-[80%] lg:w-[60%] cursor-pointer" onClick={joinMatch}>
                <Swords />
                Join Match
              </button>
            </div>
            <div className="flex justify-center items-center mb-5">
              <button className="border border-violet-800 shadow flex justify-center items-center rounded
             gap-1 px-3 py-3 w-[90%] md:w-[80%] lg:w-[60%] cursor-pointer" onClick={handleCancel}>
                <X />
                Cancel
              </button>
            </div>
            {/* <div className="flex gap-4 mt-5 justify-center">
              <div className="bg-violet-300 h-15 w-15 rounded-lg flex justify-center items-center">user1</div>
              <div className="flex justify-center items-center h-15">VS</div>
              <div className="bg-violet-300 h-15 w-15 rounded-lg flex justify-center items-center">user1</div>
            </div> */}
          </div>
        </div>
        <p className="w-[88%] md:w-[93%] text-violet-800 mx-auto lg:w-[68%] xl:w-[58%] text-center my-8">Standard tournment rules apply. 10 Rapid time control.
          Rating points will be calculated upon completion
        </p>
      </div>
      <Footer />
    </div>
  </>
}

export default JoinGame;