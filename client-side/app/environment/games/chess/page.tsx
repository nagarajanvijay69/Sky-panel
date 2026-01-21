'use client'

import { useRouter } from "next/navigation";


const Chess =()=>{

     const router = useRouter()

     return<>
      <div className="bg-green-800 text-white" onClick={()=> router.push('/environment/games/chess/playchess') }>
             Play Game Online
      </div>
     </>
}

export default Chess;