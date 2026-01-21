import { MessageCircle, Gamepad2, Sun, Activity, BrainCog } from "lucide-react"


const home = () => {
  return <>
    <div className="w-[98%] mx-auto">
      <div className="part-1 py-5 flex flex-col lg:flex-row gap-8 w-[95%] mx-auto">
        <div className="part-1-1 bg-purple-700 text-white h-130 lg:w-[50%] rounded-2xl">
          <BrainCog />
        </div>
        <div className="part-1-2 lg:h-130 w-full lg:w-[50%] rounded-2xl flex flex-col overflow-hidden gap-5 md:gap-10">
          <div className="one grid w-full h-full grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 gap-5">
            <div className="b bg-white rounded-2xl border-2 border-gray-400 h-70 lg:h-auto w-full shadow-lg"><MessageCircle /></div>
            <div className="b bg-white rounded-2xl border-2 border-gray-400 h-70 lg:h-auto w-full shadow-lg"><Gamepad2 /></div>
            <div className="a bg-white rounded-2xl border-2 border-gray-400 h-70 lg:h-auto w-full shadow-lg"><Sun /></div>
            <div className="b bg-white rounded-2xl border-2 border-gray-400 h-70 lg:h-auto w-full shadow-lg"><Activity /></div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default home