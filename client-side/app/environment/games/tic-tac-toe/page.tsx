'use client'

import { useRouter } from "next/navigation";

const TicTacToe =()=>{
 
  const router = useRouter();

  return(
     <>
       <div className="bg-green-600 cursor-pointer rounded-lg mx-2 my-1" onClick={()=> router.push('/environment/games/tic-tac-toe/playGame')}>Tic Tac Toe</div>
     </>
  )
}

export default TicTacToe;